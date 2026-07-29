package com.bacsystem.auth.token;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
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

    public SigningKeyService(SigningKeyRepository signingKeyRepository, AuditLogService auditLogService,
                              @Value("${auth.jwks.overlap-seconds:7200}") long overlapSeconds) {
        this.signingKeyRepository = signingKeyRepository;
        this.auditLogService = auditLogService;
        this.overlapSeconds = overlapSeconds;
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
        SigningKey previousActive = signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE).orElse(null);
        SigningKey newActive = generateAndSaveActiveKey();

        if (previousActive != null) {
            previousActive.setStatus(SigningKeyStatus.RETIRING);
            previousActive.setRetireAt(Instant.now().plusSeconds(overlapSeconds));
            signingKeyRepository.save(previousActive);
        }

        auditLogService.record(null, AuditAction.KEY_ROTATION, "SigningKey", newActive.getKid(), "{}");
    }

    /** Emergency rotation (§8.3): immediate retirement, no overlap — deliberately invalidates its tokens. */
    @Transactional
    public void emergencyRotate(String compromisedKid) {
        SigningKey compromised = signingKeyRepository.findByKid(compromisedKid)
                .orElseThrow(() -> new IllegalArgumentException("Unknown kid: " + compromisedKid));
        compromised.setStatus(SigningKeyStatus.RETIRED);
        compromised.setRetiredAt(Instant.now());
        signingKeyRepository.save(compromised);

        generateAndSaveActiveKey();

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

    private SigningKey generateAndSaveActiveKey() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("EC");
            generator.initialize(new ECGenParameterSpec("secp256r1"));
            KeyPair keyPair = generator.generateKeyPair();

            SigningKey key = new SigningKey();
            key.setKid(UUID.randomUUID().toString());
            key.setAlgorithm("ES256");
            key.setPrivateKeyPem(Base64.getEncoder().encodeToString(keyPair.getPrivate().getEncoded()));
            key.setPublicKeyPem(Base64.getEncoder().encodeToString(keyPair.getPublic().getEncoded()));
            key.setStatus(SigningKeyStatus.ACTIVE);
            return signingKeyRepository.save(key);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to generate EC signing key", e);
        }
    }
}
