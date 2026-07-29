package com.bacsystem.auth.audit;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class AuditLogRepositoryTest extends PostgresRedisTestBase {

    @Autowired private AuditLogRepository auditLogRepository;

    @Test
    void savesEntryWithNullActorForSystemEvents() {
        AuditLog entry = new AuditLog();
        entry.setActorUserId(null);
        entry.setAction(AuditAction.KEY_ROTATION);
        entry.setTargetType("SigningKey");
        entry.setTargetId("key-123");
        entry.setDetail("{\"kid\":\"key-123\"}");
        entry.setCreatedAt(Instant.now());

        AuditLog saved = auditLogRepository.saveAndFlush(entry);
        assertThat(saved.getId()).isNotNull();
    }

    @Test
    void findsByTargetTypeAndTargetId() {
        AuditLog entry = new AuditLog();
        entry.setAction(AuditAction.ROLE_PERMISSIONS_REPLACED);
        entry.setTargetType("Role");
        entry.setTargetId("role-abc");
        entry.setDetail("{}");
        entry.setCreatedAt(Instant.now());
        auditLogRepository.saveAndFlush(entry);

        List<AuditLog> found = auditLogRepository.findByTargetTypeAndTargetId("Role", "role-abc");
        assertThat(found).hasSize(1);
    }
}
