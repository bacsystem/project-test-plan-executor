package com.bacsystem.auth.identity;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.security.BreachedPasswordChecker;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.web.CursorCodec;
import com.bacsystem.auth.web.CursorPage;
import com.bacsystem.auth.web.InvalidPageSizeException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
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

    // Tenant-scoped per Global Constraints (multi-tenancy): the caller's tenant,
    // read from the JWT by UserController, is passed explicitly here and used
    // to filter the lookup so one tenant can never deactivate another tenant's user.
    @Transactional
    public void deactivateUser(UUID tenantId, UUID userId, UUID actorUserId) {
        User user = userRepository.findByIdAndTenantId(userId, tenantId).orElseThrow(() -> new UserNotFoundException(userId));
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

    // Not tenant-scoped: used only internally by MfaService.adminReset, which
    // has no HTTP-reachable caller today. Any future controller-reachable use
    // must go through the tenant-scoped overload below instead.
    public User getById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    // Tenant-scoped per Global Constraints (multi-tenancy) — the variant
    // UserController uses, so one tenant can never read another tenant's user.
    public User getById(UUID tenantId, UUID userId) {
        return userRepository.findByIdAndTenantId(userId, tenantId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    public Page<User> listByTenant(UUID tenantId, Pageable pageable) {
        return userRepository.findByTenantId(tenantId, pageable);
    }

    // Keyset pagination per spec §10.1 — the offset-based listByTenant above
    // predates that requirement and stays only because nothing else calls it;
    // this is the method UserController actually uses.
    public CursorPage<User> listByTenantCursor(UUID tenantId, String cursor, int size) {
        if (size <= 0) {
            throw new InvalidPageSizeException(size);
        }
        CursorCodec.Decoded decoded = CursorCodec.decode(cursor);
        Instant after = decoded == null ? Instant.EPOCH : decoded.createdAt();

        List<User> page = userRepository.findByTenantIdAndCreatedAtGreaterThanOrderByCreatedAtAsc(
                tenantId, after, PageRequest.of(0, size));

        String nextCursor = page.isEmpty() ? null
                : CursorCodec.encode(page.get(page.size() - 1).getCreatedAt(), page.get(page.size() - 1).getId());
        return new CursorPage<>(page, nextCursor);
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
