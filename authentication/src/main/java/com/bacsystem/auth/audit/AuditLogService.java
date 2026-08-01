package com.bacsystem.auth.audit;

import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuditLogService {

    private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);

    private final AuditLogRepository auditLogRepository;
    private final MeterRegistry meterRegistry;

    public AuditLogService(AuditLogRepository auditLogRepository, MeterRegistry meterRegistry) {
        this.auditLogRepository = auditLogRepository;
        this.meterRegistry = meterRegistry;
    }

    /**
     * Persists an audit entry. Callers (e.g. {@code RoleService}, {@code UserService}) do not
     * catch exceptions from this method today, relying on it to propagate a write failure so
     * their own surrounding transaction rolls back rather than silently believing the audit
     * trail succeeded — that contract is preserved here: the failure is logged at ERROR and
     * counted (§16: audit-log write failure is itself a security-relevant alert, distinct from
     * generic ops metrics) before being rethrown unchanged.
     */
    public void record(UUID actorUserId, AuditAction action, String targetType, String targetId, String detail) {
        AuditLog entry = new AuditLog();
        entry.setActorUserId(actorUserId);
        entry.setAction(action);
        entry.setTargetType(targetType);
        entry.setTargetId(targetId);
        entry.setDetail(detail);
        entry.setCreatedAt(Instant.now());
        try {
            auditLogRepository.save(entry);
        } catch (RuntimeException e) {
            log.error("Failed to write audit log entry: action={} targetType={} targetId={} actorUserId={}",
                    action, targetType, targetId, actorUserId, e);
            meterRegistry.counter("audit_log_write_failure", "action", action.name()).increment();
            throw e;
        }
    }
}
