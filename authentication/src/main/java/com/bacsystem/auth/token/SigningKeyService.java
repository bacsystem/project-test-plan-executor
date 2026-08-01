package com.bacsystem.auth.token;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.spec.ECGenParameterSpec;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

/**
 * Manages the ES256 signing key lifecycle for JWKS publication (§8.3): a single
 * ACTIVE key signs new tokens, a RETIRING key stays published only long enough for
 * outstanding tokens and cached JWKS responses to expire, then it is RETIRED.
 */
@Service
public class SigningKeyService {

    private final SigningKeyRepository signingKeyRepository;
    private final AuditLogService auditLogService;
    private final long overlapSeconds;
    private final MeterRegistry meterRegistry;

    public SigningKeyService(SigningKeyRepository signingKeyRepository, AuditLogService auditLogService,
                              @Value("${auth.jwks.overlap-seconds:7200}") long overlapSeconds,
                              MeterRegistry meterRegistry) {
        this.signingKeyRepository = signingKeyRepository;
        this.auditLogService = auditLogService;
        this.overlapSeconds = overlapSeconds;
        this.meterRegistry = meterRegistry;
    }

    @Transactional
    public SigningKey currentActiveKey() {
        return signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE)
                .orElseGet(this::generateAndSaveActiveKey);
    }

    public List<SigningKey> publishableKeys() {
        return signingKeyRepository.findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
    }

    /** Scheduled rotation (§8.3): new ACTIVE key, previous ACTIVE becomes RETIRING with an overlap window. */
    @Scheduled(cron = "${auth.jwks.rotation-cron:0 0 3 1 * *}")
    @Transactional
    public void rotate() {
        try {
            SigningKey previousActive = signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE).orElse(null);

            // Flush the previous key's RETIRING status before inserting the new ACTIVE row: the
            // partial unique index on status = 'ACTIVE' (signing_keys_one_active_idx) is checked
            // against this transaction's own writes, so the old row must already be RETIRING on the
            // wire or the insert below would (correctly) see two ACTIVE rows and no-op.
            if (previousActive != null) {
                previousActive.setStatus(SigningKeyStatus.RETIRING);
                previousActive.setRetireAt(Instant.now().plusSeconds(overlapSeconds));
                signingKeyRepository.saveAndFlush(previousActive);
            }

            SigningKey newActive = generateAndSaveActiveKey();

            auditLogService.record(null, AuditAction.KEY_ROTATION, "SigningKey", newActive.getKid(), "{}");
            // §16: a watchdog-style signal, distinct from generic ops metrics — an external
            // dashboard/alert notices the *absence* of rotation via rate() == 0 on this counter,
            // rather than us having to page on a missing event directly.
            meterRegistry.counter("signing_key_rotation_success").increment();
        } catch (RuntimeException e) {
            meterRegistry.counter("signing_key_rotation_failure").increment();
            throw e;
        }
    }

    /** Emergency rotation (§8.3): immediate retirement, no overlap — deliberately invalidates its tokens. */
    @Transactional
    public void emergencyRotate(String compromisedKid) {
        SigningKey compromised = signingKeyRepository.findByKid(compromisedKid)
                .orElseThrow(() -> new IllegalArgumentException("Unknown kid: " + compromisedKid));
        boolean wasActive = compromised.getStatus() == SigningKeyStatus.ACTIVE;
        compromised.setStatus(SigningKeyStatus.RETIRED);
        compromised.setRetiredAt(Instant.now());
        // Flush before generating a replacement so the RETIRED status is visible to the partial
        // unique index check the insert below relies on (see rotate() for the same reasoning).
        signingKeyRepository.saveAndFlush(compromised);

        // Only replace the ACTIVE key if the compromised key was itself ACTIVE — retiring a
        // RETIRING key must not create a second ACTIVE row and break the single-ACTIVE invariant.
        if (wasActive) {
            generateAndSaveActiveKey();
        }

        auditLogService.record(null, AuditAction.KEY_ROTATION_EMERGENCY, "SigningKey", compromisedKid, "{}");
    }

    /** Retires any RETIRING key whose overlap window has elapsed — runs hourly. */
    @Scheduled(fixedRateString = "${auth.jwks.retire-check-ms:3600000}")
    @Transactional
    public void retireExpiredOverlaps() {
        Instant now = Instant.now();
        for (SigningKey key : signingKeyRepository.findByStatusIn(List.of(SigningKeyStatus.RETIRING))) {
            if (key.getRetireAt() != null && key.getRetireAt().isBefore(now)) {
                key.setStatus(SigningKeyStatus.RETIRED);
                key.setRetiredAt(now);
                signingKeyRepository.save(key);
            }
        }
    }

    /**
     * Generates a new ES256 key pair and inserts it as ACTIVE, unless a concurrent caller has
     * already done so first. The insert relies on {@link SigningKeyRepository#insertActiveKeyIfAbsent}
     * (backed by the partial unique index {@code signing_keys_one_active_idx}) rather than a plain
     * SELECT-then-INSERT, which would otherwise let two racing callers both observe no ACTIVE key
     * and both insert one (TOCTOU) — the DB constraint is the actual backstop, this is just how we
     * fail closed against it instead of surfacing a constraint-violation exception to the caller.
     */
    private SigningKey generateAndSaveActiveKey() {
        GeneratedKeyMaterial material = generateKeyMaterial();
        int inserted = signingKeyRepository.insertActiveKeyIfAbsent(
                material.kid(), material.algorithm(), material.privateKeyPem(), material.publicKeyPem());
        if (inserted == 0) {
            return signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE)
                    .orElseThrow(() -> new IllegalStateException(
                            "Expected an ACTIVE signing key after insert conflict on kid " + material.kid()
                                    + " but found none"));
        }
        return signingKeyRepository.findByKid(material.kid())
                .orElseThrow(() -> new IllegalStateException(
                        "Signing key " + material.kid() + " vanished immediately after insert"));
    }

    private GeneratedKeyMaterial generateKeyMaterial() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("EC");
            generator.initialize(new ECGenParameterSpec("secp256r1"));
            KeyPair keyPair = generator.generateKeyPair();

            return new GeneratedKeyMaterial(
                    UUID.randomUUID().toString(),
                    "ES256",
                    Base64.getEncoder().encodeToString(keyPair.getPrivate().getEncoded()),
                    Base64.getEncoder().encodeToString(keyPair.getPublic().getEncoded()));
        } catch (Exception e) {
            throw new IllegalStateException("Failed to generate EC signing key", e);
        }
    }

    private record GeneratedKeyMaterial(String kid, String algorithm, String privateKeyPem, String publicKeyPem) {
    }
}
