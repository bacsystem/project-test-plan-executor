package com.bacsystem.auth.audit;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class RetentionJob {

    private static final DateTimeFormatter MONTH_SUFFIX = DateTimeFormatter.ofPattern("yyyy_MM");
    private static final int LOGIN_ATTEMPTS_RETENTION_MONTHS = 3; // ~90 days (§6)
    private static final int AUDIT_LOG_RETENTION_MONTHS = 24; // §6
    private static final int LOOKBACK_MONTHS_FOR_DROP_SCAN = 60; // bounded scan window for this pilot

    private final JdbcTemplate jdbcTemplate;
    private final AuditLogService auditLogService;
    private final MeterRegistry meterRegistry;

    public RetentionJob(JdbcTemplate jdbcTemplate, AuditLogService auditLogService, MeterRegistry meterRegistry) {
        this.jdbcTemplate = jdbcTemplate;
        this.auditLogService = auditLogService;
        this.meterRegistry = meterRegistry;
    }

    @Scheduled(cron = "${auth.retention.cron:0 0 2 1 * *}")
    public void runMonthlyMaintenance() {
        LocalDate currentMonth = LocalDate.now().withDayOfMonth(1);

        createPartitionIfMissing("login_attempts", currentMonth);
        createPartitionIfMissing("login_attempts", currentMonth.plusMonths(1));
        createPartitionIfMissing("audit_log", currentMonth);
        createPartitionIfMissing("audit_log", currentMonth.plusMonths(1));

        int loginAttemptsDropped = dropPartitionsOlderThan("login_attempts", currentMonth, LOGIN_ATTEMPTS_RETENTION_MONTHS);
        int auditLogDropped = dropPartitionsOlderThan("audit_log", currentMonth, AUDIT_LOG_RETENTION_MONTHS);

        meterRegistry.counter("retention_job_partitions_dropped", "table", "login_attempts")
                .increment(loginAttemptsDropped);
        meterRegistry.counter("retention_job_partitions_dropped", "table", "audit_log")
                .increment(auditLogDropped);
        auditLogService.record(null, AuditAction.RETENTION_JOB_RUN, "RetentionJob", currentMonth.toString(),
                "{\"loginAttemptsDropped\":" + loginAttemptsDropped + ",\"auditLogDropped\":" + auditLogDropped + "}");
    }

    private void createPartitionIfMissing(String table, LocalDate month) {
        String partitionName = table + "_" + month.format(MONTH_SUFFIX);
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS " + partitionName + " PARTITION OF " + table +
                " FOR VALUES FROM ('" + month + "') TO ('" + month.plusMonths(1) + "')");
    }

    private int dropPartitionsOlderThan(String table, LocalDate currentMonth, int retentionMonths) {
        LocalDate cutoff = currentMonth.minusMonths(retentionMonths);
        int dropped = 0;
        for (int i = 1; i <= LOOKBACK_MONTHS_FOR_DROP_SCAN; i++) {
            LocalDate candidate = cutoff.minusMonths(i);
            String partitionName = table + "_" + candidate.format(MONTH_SUFFIX);
            Integer exists = jdbcTemplate.queryForObject(
                    "SELECT count(*) FROM pg_tables WHERE tablename = ?", Integer.class, partitionName);
            if (exists != null && exists > 0) {
                jdbcTemplate.execute("DROP TABLE IF EXISTS " + partitionName);
                dropped++;
            }
        }
        return dropped;
    }
}
