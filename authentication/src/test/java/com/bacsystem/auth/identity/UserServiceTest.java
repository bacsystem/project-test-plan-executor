package com.bacsystem.auth.identity;

import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.security.BreachedPasswordChecker;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private BreachedPasswordChecker breachedPasswordChecker;
    @Mock private AuditLogService auditLogService;

    private final PasswordEncoder passwordEncoder = new PasswordEncoderConfig().passwordEncoder();

    private UserService newService() {
        return new UserService(userRepository, passwordEncoder, breachedPasswordChecker, auditLogService);
    }

    @Test
    void createUserRejectsDuplicateEmailInTenant() {
        UUID tenantId = UUID.randomUUID();
        when(userRepository.findByTenantIdAndEmail(tenantId, "dup@test.com"))
                .thenReturn(Optional.of(new User()));

        UserService service = newService();

        assertThrows(DuplicateEmailException.class,
                () -> service.createUser(tenantId, "dup@test.com", "TempPassw0rd!23", UUID.randomUUID()));
    }

    @Test
    void createUserSetsMustChangePasswordAndHashesWithArgon2() {
        UUID tenantId = UUID.randomUUID();
        when(userRepository.findByTenantIdAndEmail(any(), any())).thenReturn(Optional.empty());
        // Mirrors JPA's @GeneratedValue behavior: a real save() populates the id,
        // which UserService needs to record the audit log entry.
        when(userRepository.save(any())).thenAnswer(inv -> {
            User saved = inv.getArgument(0);
            saved.setId(UUID.randomUUID());
            return saved;
        });

        UserService service = newService();
        User created = service.createUser(tenantId, "new@test.com", "TempPassw0rd!23", UUID.randomUUID());

        assertThat(created.isMustChangePassword()).isTrue();
        assertThat(created.getPasswordHash()).startsWith("{argon2}");
    }

    @Test
    void changePasswordRejectsBreachedPassword() {
        when(breachedPasswordChecker.isBreached("password123456")).thenReturn(true);
        UserService service = newService();

        User user = new User();
        user.setId(UUID.randomUUID());

        assertThrows(WeakPasswordException.class,
                () -> service.changePassword(user, "password123456"));
    }

    @Test
    void changePasswordRejectsBelowMinimumLength() {
        UserService service = newService();
        User user = new User();
        user.setId(UUID.randomUUID());

        assertThrows(WeakPasswordException.class,
                () -> service.changePassword(user, "short1!"));
    }

    @Test
    void changePasswordClearsMustChangeFlag() {
        when(breachedPasswordChecker.isBreached(any())).thenReturn(false);
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        UserService service = newService();
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setMustChangePassword(true);

        service.changePassword(user, "BrandNewPassw0rd!42");

        assertThat(user.isMustChangePassword()).isFalse();
        assertThat(user.getPasswordHash()).startsWith("{argon2}");
    }
}
