package com.bacsystem.auth.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class EmailNotificationService {

    private static final int MAX_ATTEMPTS = 3;

    private final EmailOutboxRepository emailOutboxRepository;
    private final JavaMailSender javaMailSender;

    public EmailNotificationService(EmailOutboxRepository emailOutboxRepository, JavaMailSender javaMailSender) {
        this.emailOutboxRepository = emailOutboxRepository;
        this.javaMailSender = javaMailSender;
    }

    /**
     * Writes the outbox row and returns — never sends inline (§12). This is
     * the whole answer to "where does the queue live": this table, not an
     * in-memory executor, so a pod restart between issuing a one-time token
     * and the email actually going out loses nothing.
     */
    public void queue(String recipient, String templateName, String body) {
        EmailOutbox outbox = new EmailOutbox();
        outbox.setRecipient(recipient);
        outbox.setTemplateName(templateName);
        outbox.setBody(body);
        outbox.setStatus(EmailOutboxStatus.PENDING);
        outbox.setAttempts(0);
        emailOutboxRepository.save(outbox);
    }

    @Scheduled(fixedDelayString = "${auth.email.send-poll-ms:5000}")
    @Transactional
    public void sendPending() {
        List<EmailOutbox> pending = emailOutboxRepository.findByStatus(EmailOutboxStatus.PENDING);
        for (EmailOutbox outbox : pending) {
            trySend(outbox);
            emailOutboxRepository.save(outbox);
        }
    }

    private void trySend(EmailOutbox outbox) {
        try {
            javaMailSender.send(toMailMessage(outbox));
            outbox.setStatus(EmailOutboxStatus.SENT);
            outbox.setSentAt(Instant.now());
        } catch (Exception e) {
            // never rethrown: a send failure must never surface to whatever
            // originally called queue() — it already returned (§12).
            recordFailure(outbox, e);
        }
    }

    private SimpleMailMessage toMailMessage(EmailOutbox outbox) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(outbox.getRecipient());
        message.setSubject(outbox.getTemplateName());
        message.setText(outbox.getBody());
        return message;
    }

    private void recordFailure(EmailOutbox outbox, Exception e) {
        outbox.setAttempts(outbox.getAttempts() + 1);
        outbox.setLastError(e.getMessage());
        if (outbox.getAttempts() >= MAX_ATTEMPTS) {
            outbox.setStatus(EmailOutboxStatus.FAILED);
        }
    }
}
