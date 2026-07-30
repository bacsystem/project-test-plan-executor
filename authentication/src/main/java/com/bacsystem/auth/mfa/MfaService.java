package com.bacsystem.auth.mfa;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.email.EmailNotificationService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.rbac.Role;
import com.bacsystem.auth.rbac.UserRoleRepository;
import com.bacsystem.auth.token.RefreshTokenService;
import com.bacsystem.auth.token.TokenHasher;
import io.micrometer.core.instrument.MeterRegistry;
import dev.samstevens.totp.code.CodeGenerator;
import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.code.DefaultCodeVerifier;
import dev.samstevens.totp.code.HashingAlgorithm;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.secret.SecretGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * TOTP-based MFA (§8.4): enrollment, login-time verification via a
 * single-use Redis challenge ticket, and administrator-initiated reset.
 *
 * <p>The TOTP secret is the one piece of MFA state that must be reversible
 * (the authenticator app needs the raw secret to compute a code), so it is
 * AES/GCM-encrypted rather than hashed like every other credential in this
 * service (§6).
 */
@Service
public class MfaService {

    private static final Logger log = LoggerFactory.getLogger(MfaService.class);

    private static final int BACKUP_CODE_COUNT = 10;
    private static final int GCM_IV_LENGTH_BYTES = 12;
    private static final int GCM_TAG_LENGTH_BITS = 128;
    private static final Duration CHALLENGE_TTL = Duration.ofMinutes(3);
    private static final String REDIS_KEY_PREFIX = "mfa:challenge:";

    private static final String ADMIN_TARGET_RESET_COUNTER = "admin_mfa_reset_admin_target_total";

    private final MfaCredentialRepository mfaCredentialRepository;
    private final MfaBackupCodeRepository mfaBackupCodeRepository;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final EmailNotificationService emailNotificationService;
    private final AuditLogService auditLogService;
    private final UserRoleRepository userRoleRepository;
    private final MeterRegistry meterRegistry;
    private final StringRedisTemplate redisTemplate;
    private final byte[] encryptionKey;

    private final SecretGenerator secretGenerator = new DefaultSecretGenerator();
    private final CodeGenerator codeGenerator = new DefaultCodeGenerator();
    private final TimeProvider timeProvider = new SystemTimeProvider();
    private final CodeVerifier codeVerifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
    private final QrGenerator qrGenerator = new ZxingPngQrGenerator();

    public MfaService(MfaCredentialRepository mfaCredentialRepository, MfaBackupCodeRepository mfaBackupCodeRepository,
                       UserService userService, RefreshTokenService refreshTokenService,
                       EmailNotificationService emailNotificationService, AuditLogService auditLogService,
                       UserRoleRepository userRoleRepository, MeterRegistry meterRegistry,
                       StringRedisTemplate redisTemplate,
                       @Value("${auth.mfa.secret-encryption-key-base64}") String encryptionKeyBase64) {
        this.mfaCredentialRepository = mfaCredentialRepository;
        this.mfaBackupCodeRepository = mfaBackupCodeRepository;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
        this.emailNotificationService = emailNotificationService;
        this.auditLogService = auditLogService;
        this.userRoleRepository = userRoleRepository;
        this.meterRegistry = meterRegistry;
        this.redisTemplate = redisTemplate;
        this.encryptionKey = Base64.getDecoder().decode(encryptionKeyBase64);
    }

    /** Starts enrollment: a new inactive credential row plus a scannable QR code for the authenticator app. */
    @Transactional
    public MfaEnrollmentResult beginEnrollment(UUID userId) throws QrGenerationException {
        String rawSecret = secretGenerator.generate();

        MfaCredential credential = new MfaCredential();
        credential.setUser(userReference(userId));
        credential.setEncryptedSecret(encrypt(rawSecret));
        credential.setActive(false);
        mfaCredentialRepository.save(credential);

        QrData qrData = new QrData.Builder()
                .label(userId.toString())
                .secret(rawSecret)
                .issuer("bacsystem-auth")
                .algorithm(HashingAlgorithm.SHA1)
                .digits(6)
                .period(30)
                .build();
        byte[] qrPng = qrGenerator.generate(qrData);
        String qrDataUri = "data:image/png;base64," + Base64.getEncoder().encodeToString(qrPng);

        return new MfaEnrollmentResult(rawSecret, qrDataUri);
    }

    /** Activates the pending credential once the user proves possession, and issues one-time backup codes. */
    @Transactional
    public List<String> confirmEnrollment(UUID userId, String code) {
        MfaCredential pending = mfaCredentialRepository
                .findFirstByUserIdAndActiveFalseOrderByCreatedAtDesc(userId)
                .orElseThrow(MfaVerificationFailedException::new);

        String secret = decrypt(pending.getEncryptedSecret());
        if (!codeVerifier.isValidCode(secret, code)) {
            throw new MfaVerificationFailedException();
        }
        pending.setActive(true);
        mfaCredentialRepository.save(pending);

        List<String> rawCodes = generateBackupCodes(userId);

        auditLogService.record(userId, AuditAction.MFA_ENROLLED, "User", userId.toString(), "{}");
        return rawCodes;
    }

    /** Whether the user has an active MFA credential — gates the password grant's MFA branch (§8.4). */
    public boolean isEnrolled(UUID userId) {
        return mfaCredentialRepository.findByUserIdAndActiveTrue(userId).isPresent();
    }

    /**
     * Issues a single-use challenge ticket after password verification, ahead of the TOTP/backup-code
     * step. Carries the application client id alongside the user id so {@code /v1/auth/mfa/verify}
     * (Task 31) — reached before the caller has any bearer token — knows which {@code RegisteredClient}
     * to issue the eventual token pair for, and carries the scopes requested on the password-grant step
     * so the post-MFA token pair is issued with the same scopes the caller originally asked for, rather
     * than none.
     */
    public String issueChallenge(UUID userId, String applicationClientId, Set<String> scopes) {
        String rawTicket = TokenHasher.generateRawToken();
        redisTemplate.opsForValue().set(REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket),
                new MfaChallengeContext(userId, applicationClientId, scopes).toRedisValue(), CHALLENGE_TTL);
        return rawTicket;
    }

    /** Single-use: the Redis key is deleted only on a successful verification (§8.4). */
    public MfaChallengeContext verifyChallenge(String rawTicket, String code) {
        String redisKey = REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket);
        String value = redisTemplate.opsForValue().get(redisKey);
        if (value == null) {
            throw new MfaChallengeExpiredException();
        }
        MfaChallengeContext context = MfaChallengeContext.fromRedisValue(value);

        if (isValidTotp(context.userId(), code) || consumeBackupCodeIfValid(context.userId(), code)) {
            redisTemplate.delete(redisKey);
            return context;
        }
        throw new MfaVerificationFailedException();
    }

    /**
     * Administrator-initiated reset for a user who lost their device and backup codes (§8.4). Revokes the
     * target's entire refresh-token chain — a reset MFA credential without invalidating existing sessions
     * would leave an attacker who social-engineered the reset still holding a valid session.
     *
     * <p>{@code tenantId} is the caller's tenant (from the access token, per Global Constraints) and is
     * used to look up the target via the tenant-scoped {@link UserService#getById(UUID, UUID)} overload,
     * so an admin in one tenant can never reset — or even confirm the existence of — a user in another
     * tenant (cross-tenant IDOR).
     *
     * <p>Whether the target is an admin is <em>derived here</em>, not caller-supplied (§8.4): a client
     * asserting this would let a caller suppress the dedicated security signal below simply by lying. It
     * is computed from the target's actual role assignments, matching {@code BootstrapRunner}'s use of
     * the shared {@value Role#ADMIN_ROLE_NAME} role name. When the target genuinely holds that role, this
     * emits an elevated-severity log line and increments a dedicated counter in addition to the routine
     * audit log entry below — resetting another admin's MFA is a materially more sensitive event than a
     * routine reset and must be distinguishable from one.
     */
    @Transactional
    public void adminReset(UUID tenantId, UUID actorUserId, UUID targetUserId, String verificationMethod) {
        if (actorUserId.equals(targetUserId)) {
            throw new SelfMfaResetException();
        }

        User target = userService.getById(tenantId, targetUserId);
        boolean targetIsAdmin = userRoleRepository.findRoleNamesByUserId(targetUserId).contains(Role.ADMIN_ROLE_NAME);

        deactivateMfa(targetUserId);
        refreshTokenService.revokeAllForUser(targetUserId);

        emailNotificationService.queue(target.getEmail(), "mfa-admin-reset",
                "Your MFA was reset by an administrator. If this wasn't you, contact support immediately.");

        if (targetIsAdmin) {
            log.warn("admin_mfa_reset_of_admin_target actorUserId={} targetUserId={} tenantId={}",
                    actorUserId, targetUserId, tenantId);
            meterRegistry.counter(ADMIN_TARGET_RESET_COUNTER).increment();
        }

        auditLogService.record(actorUserId, AuditAction.MFA_ADMIN_RESET, "User", targetUserId.toString(),
                "{\"verificationMethod\":\"" + verificationMethod + "\",\"targetIsAdmin\":" + targetIsAdmin + "}");
    }

    private List<String> generateBackupCodes(UUID userId) {
        List<String> rawCodes = new ArrayList<>();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < BACKUP_CODE_COUNT; i++) {
            String raw = String.format("%08d", random.nextInt(100_000_000));
            MfaBackupCode backupCode = new MfaBackupCode();
            backupCode.setUser(userReference(userId));
            backupCode.setCodeHash(TokenHasher.sha256Hex(raw));
            mfaBackupCodeRepository.save(backupCode);
            rawCodes.add(raw);
        }
        return rawCodes;
    }

    private void deactivateMfa(UUID userId) {
        mfaCredentialRepository.findByUserIdAndActiveTrue(userId)
                .ifPresent(credential -> {
                    credential.setActive(false);
                    mfaCredentialRepository.save(credential);
                });
        mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(userId)
                .forEach(backupCode -> {
                    backupCode.setUsedAt(Instant.now());
                    mfaBackupCodeRepository.save(backupCode);
                });
    }

    private boolean isValidTotp(UUID userId, String code) {
        return mfaCredentialRepository.findByUserIdAndActiveTrue(userId)
                .map(credential -> codeVerifier.isValidCode(decrypt(credential.getEncryptedSecret()), code))
                .orElse(false);
    }

    private boolean consumeBackupCodeIfValid(UUID userId, String code) {
        String hash = TokenHasher.sha256Hex(code);
        Optional<MfaBackupCode> match = mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(userId).stream()
                .filter(backupCode -> backupCode.getCodeHash().equals(hash))
                .findFirst();
        match.ifPresent(backupCode -> {
            backupCode.setUsedAt(Instant.now());
            mfaBackupCodeRepository.save(backupCode);
        });
        return match.isPresent();
    }

    private User userReference(UUID userId) {
        User ref = new User();
        ref.setId(userId);
        return ref;
    }

    private String encrypt(String plaintext) {
        try {
            byte[] iv = new byte[GCM_IV_LENGTH_BYTES];
            new SecureRandom().nextBytes(iv);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(encryptionKey, "AES"),
                    new GCMParameterSpec(GCM_TAG_LENGTH_BITS, iv));
            byte[] ciphertext = cipher.doFinal(plaintext.getBytes());
            byte[] combined = new byte[iv.length + ciphertext.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(ciphertext, 0, combined, iv.length, ciphertext.length);
            return Base64.getEncoder().encodeToString(combined);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to encrypt MFA secret", e);
        }
    }

    private String decrypt(String encoded) {
        try {
            byte[] combined = Base64.getDecoder().decode(encoded);
            byte[] iv = Arrays.copyOfRange(combined, 0, GCM_IV_LENGTH_BYTES);
            byte[] ciphertext = Arrays.copyOfRange(combined, GCM_IV_LENGTH_BYTES, combined.length);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(encryptionKey, "AES"),
                    new GCMParameterSpec(GCM_TAG_LENGTH_BITS, iv));
            return new String(cipher.doFinal(ciphertext));
        } catch (Exception e) {
            throw new IllegalStateException("Failed to decrypt MFA secret", e);
        }
    }
}
