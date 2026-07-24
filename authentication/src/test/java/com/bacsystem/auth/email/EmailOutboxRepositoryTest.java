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
        EmailOutbox outbox = new EmailOutbox();
        outbox.setRecipient("user@example.test");
        outbox.setTemplateName("password-reset");
        outbox.setBody("Reset link: https://example.test/reset?token=abc");
        outbox.setStatus(EmailOutboxStatus.PENDING);
        outbox.setAttempts(0);
        EmailOutbox saved = emailOutboxRepository.saveAndFlush(outbox);

        assertThat(saved.getId()).isNotNull();

        List<EmailOutbox> pending = emailOutboxRepository.findByStatus(EmailOutboxStatus.PENDING);
        assertThat(pending).hasSize(1);
    }
}
