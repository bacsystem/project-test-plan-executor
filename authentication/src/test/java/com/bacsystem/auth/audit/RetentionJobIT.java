package com.bacsystem.auth.audit;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class RetentionJobIT extends PostgresRedisTestBase {

    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private RetentionJob retentionJob;

    @Test
    void createsPartitionsForCurrentAndNextMonth() {
        retentionJob.runMonthlyMaintenance();

        String currentMonthTable = "login_attempts_" + LocalDate.now().toString().substring(0, 7).replace("-", "_");
        Integer count = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM pg_tables WHERE tablename = ?", Integer.class, currentMonthTable);
        assertThat(count).isEqualTo(1);
    }

    @Test
    void dropsALoginAttemptsPartitionOlderThanNinetyDays() {
        LocalDate oldMonth = LocalDate.now().minusMonths(6).withDayOfMonth(1);
        String oldTable = "login_attempts_" + oldMonth.toString().substring(0, 7).replace("-", "_");
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS " + oldTable +
                " PARTITION OF login_attempts FOR VALUES FROM ('" + oldMonth + "') TO ('" +
                oldMonth.plusMonths(1) + "')");

        retentionJob.runMonthlyMaintenance();

        Integer count = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM pg_tables WHERE tablename = ?", Integer.class, oldTable);
        assertThat(count).isEqualTo(0);
    }
}
