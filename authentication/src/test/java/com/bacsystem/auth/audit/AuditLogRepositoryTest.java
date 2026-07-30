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
        // audit_log is shared across the whole test JVM (singleton container pattern in
        // PostgresRedisTestBase), so a hardcoded literal targetId could collide with rows from
        // other tests/classes and make hasSize(1) flaky. A nanoTime-suffixed value keeps this
        // test's row exclusively its own, which is what makes hasSize(1) below correct.
        String targetId = "role-abc-" + System.nanoTime();
        AuditLog entry = new AuditLog();
        entry.setAction(AuditAction.ROLE_PERMISSIONS_REPLACED);
        entry.setTargetType("Role");
        entry.setTargetId(targetId);
        entry.setDetail("{}");
        entry.setCreatedAt(Instant.now());
        auditLogRepository.saveAndFlush(entry);

        List<AuditLog> found = auditLogRepository.findByTargetTypeAndTargetId("Role", targetId);
        assertThat(found).hasSize(1);
    }
}
