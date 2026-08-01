package com.bacsystem.auth.email;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class EmailOutboxRepositoryTest extends PostgresRedisTestBase {

    @Autowired private EmailOutboxRepository emailOutboxRepository;

    @Test
    void queuedEmailSurvivesAsARowUntilSent() {
        // The email_outbox table is shared across the whole test JVM (singleton container
        // pattern - see PostgresRedisTestBase), so other test classes exercising real
        // password-reset/notification flows may also leave PENDING rows behind. Use a
        // unique recipient and assert this row is present rather than asserting the whole
        // table has exactly one PENDING row.
        String recipient = "user-" + System.nanoTime() + "@example.test";
        EmailOutbox outbox = new EmailOutbox();
        outbox.setRecipient(recipient);
        outbox.setTemplateName("password-reset");
        outbox.setBody("Reset link: https://example.test/reset?token=abc");
        outbox.setStatus(EmailOutboxStatus.PENDING);
        outbox.setAttempts(0);
        EmailOutbox saved = emailOutboxRepository.saveAndFlush(outbox);

        assertThat(saved.getId()).isNotNull();

        List<EmailOutbox> pending = emailOutboxRepository.findByStatus(EmailOutboxStatus.PENDING);
        assertThat(pending).extracting(EmailOutbox::getRecipient).contains(recipient);
    }
}
