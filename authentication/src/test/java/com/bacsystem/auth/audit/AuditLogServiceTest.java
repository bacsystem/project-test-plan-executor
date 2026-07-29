package com.bacsystem.auth.audit;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuditLogServiceTest {

    @Mock private AuditLogRepository auditLogRepository;

    private AuditLogService newService(MeterRegistry meterRegistry) {
        return new AuditLogService(auditLogRepository, meterRegistry);
    }

    @Test
    void recordsEntryWithGivenFields() {
        AuditLogService service = newService(new SimpleMeterRegistry());
        UUID actor = UUID.randomUUID();

        service.record(actor, AuditAction.ROLE_CREATED, "Role", "role-1", "{\"name\":\"editor\"}");

        ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
        verify(auditLogRepository).save(captor.capture());
        AuditLog saved = captor.getValue();
        assertThat(saved.getActorUserId()).isEqualTo(actor);
        assertThat(saved.getAction()).isEqualTo(AuditAction.ROLE_CREATED);
        assertThat(saved.getTargetType()).isEqualTo("Role");
    }

    @Test
    void allowsNullActorForSystemEvents() {
        AuditLogService service = newService(new SimpleMeterRegistry());

        service.record(null, AuditAction.KEY_ROTATION, "SigningKey", "kid-1", "{}");

        ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
        verify(auditLogRepository).save(captor.capture());
        assertThat(captor.getValue().getActorUserId()).isNull();
    }

    @Test
    void aSaveFailureIncrementsTheWriteFailureCounterAndStillPropagatesTheException() {
        // §16: audit-log write failure must itself be observable — and callers (e.g. RoleService,
        // UserService) rely on record() propagating a failure so their own transaction rolls back
        // rather than silently believing the audit trail succeeded.
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        RuntimeException dbFailure = new RuntimeException("connection refused");
        when(auditLogRepository.save(org.mockito.ArgumentMatchers.any())).thenThrow(dbFailure);
        AuditLogService service = newService(meterRegistry);

        RuntimeException thrown = assertThrows(RuntimeException.class,
                () -> service.record(null, AuditAction.KEY_ROTATION, "SigningKey", "kid-1", "{}"));

        assertThat(thrown).isSameAs(dbFailure);
        assertThat(meterRegistry.find("audit_log_write_failure").counter().count()).isEqualTo(1.0);
    }

    @Test
    void aSuccessfulRecordDoesNotIncrementTheWriteFailureCounter() {
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        AuditLogService service = newService(meterRegistry);

        service.record(null, AuditAction.KEY_ROTATION, "SigningKey", "kid-1", "{}");

        assertThat(meterRegistry.find("audit_log_write_failure").counter()).isNull();
    }
}
