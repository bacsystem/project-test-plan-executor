package com.bacsystem.auth.audit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AuditLogServiceTest {

    @Mock private AuditLogRepository auditLogRepository;

    @Test
    void recordsEntryWithGivenFields() {
        AuditLogService service = new AuditLogService(auditLogRepository);
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
        AuditLogService service = new AuditLogService(auditLogRepository);

        service.record(null, AuditAction.KEY_ROTATION, "SigningKey", "kid-1", "{}");

        ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
        verify(auditLogRepository).save(captor.capture());
        assertThat(captor.getValue().getActorUserId()).isNull();
    }
}
