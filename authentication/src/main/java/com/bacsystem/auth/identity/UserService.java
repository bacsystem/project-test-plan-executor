package com.bacsystem.auth.identity;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.security.BreachedPasswordChecker;
import com.bacsystem.auth.tenancy.Tenant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private static final int MIN_PASSWORD_LENGTH = 12;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BreachedPasswordChecker breachedPasswordChecker;
    private final AuditLogService auditLogService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                        BreachedPasswordChecker breachedPasswordChecker, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.breachedPasswordChecker = breachedPasswordChecker;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public User createUser(UUID tenantId, String email, String temporaryPassword, UUID actorUserId) {
        if (userRepository.findByTenantIdAndEmail(tenantId, email).isPresent()) {
            throw new DuplicateEmailException(email);
        }
        validatePasswordStrength(temporaryPassword);

        User user = new User();
        Tenant tenantRef = new Tenant();
        tenantRef.setId(tenantId);
        user.setTenant(tenantRef);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(temporaryPassword));
        user.setStatus(UserStatus.ACTIVE);
        user.setMustChangePassword(true);
        User saved = userRepository.save(user);

        auditLogService.record(actorUserId, AuditAction.USER_CREATED, "User", saved.getId().toString(),
                "{\"email\":\"" + email + "\"}");
        return saved;
    }

    @Transactional
    public void deactivateUser(UUID userId, UUID actorUserId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        user.setStatus(UserStatus.DEACTIVATED);
        userRepository.save(user);
        auditLogService.record(actorUserId, AuditAction.USER_DEACTIVATED, "User", userId.toString(), "{}");
    }

    @Transactional
    public void changePassword(User user, String newPassword) {
        validatePasswordStrength(newPassword);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setMustChangePassword(false);
        user.setPasswordChangedAt(Instant.now());
        userRepository.save(user);
        auditLogService.record(user.getId(), AuditAction.USER_PASSWORD_CHANGED, "User",
                user.getId().toString(), "{}");
    }

    public Optional<User> findByTenantAndEmail(UUID tenantId, String email) {
        return userRepository.findByTenantIdAndEmail(tenantId, email);
    }

    public User getById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    public Page<User> listByTenant(UUID tenantId, Pageable pageable) {
        return userRepository.findByTenantId(tenantId, pageable);
    }

    private void validatePasswordStrength(String password) {
        if (password.length() < MIN_PASSWORD_LENGTH) {
            throw new WeakPasswordException("Password must be at least " + MIN_PASSWORD_LENGTH + " characters");
        }
        if (breachedPasswordChecker.isBreached(password)) {
            throw new WeakPasswordException("Password appears in a known breach list");
        }
    }
}
