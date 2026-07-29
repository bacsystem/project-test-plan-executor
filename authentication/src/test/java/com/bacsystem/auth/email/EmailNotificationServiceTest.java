package com.bacsystem.auth.email;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailNotificationServiceTest {

    @Mock private EmailOutboxRepository emailOutboxRepository;
    @Mock private JavaMailSender javaMailSender;

    private EmailNotificationService newService() {
        return new EmailNotificationService(emailOutboxRepository, javaMailSender);
    }

    @Test
    void queueWritesAPendingRowAndReturnsImmediately() {
        EmailNotificationService service = newService();

        service.queue("user@test.com", "password-reset", "Reset link: https://x/reset?token=abc");

        ArgumentCaptor<EmailOutbox> captor = ArgumentCaptor.forClass(EmailOutbox.class);
        verify(emailOutboxRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(EmailOutboxStatus.PENDING);
        verifyNoInteractions(javaMailSender);
    }

    @Test
    void senderMarksRowSentOnSuccess() {
        EmailOutbox pending = new EmailOutbox();
        pending.setRecipient("user@test.com");
        pending.setTemplateName("password-reset");
        pending.setBody("body");
        pending.setStatus(EmailOutboxStatus.PENDING);
        when(emailOutboxRepository.findByStatus(EmailOutboxStatus.PENDING)).thenReturn(List.of(pending));

        EmailNotificationService service = newService();
        service.sendPending();

        verify(javaMailSender).send(any(SimpleMailMessage.class));
        assertThat(pending.getStatus()).isEqualTo(EmailOutboxStatus.SENT);
    }

    @Test
    void senderIncrementsAttemptsAndKeepsPendingBelowThreeFailures() {
        EmailOutbox pending = new EmailOutbox();
        pending.setRecipient("user@test.com");
        pending.setTemplateName("password-reset");
        pending.setBody("body");
        pending.setStatus(EmailOutboxStatus.PENDING);
        pending.setAttempts(1);
        when(emailOutboxRepository.findByStatus(EmailOutboxStatus.PENDING)).thenReturn(List.of(pending));
        doThrow(new MailSendFailure()).when(javaMailSender).send(any(SimpleMailMessage.class));

        EmailNotificationService service = newService();
        service.sendPending();

        assertThat(pending.getAttempts()).isEqualTo(2);
        assertThat(pending.getStatus()).isEqualTo(EmailOutboxStatus.PENDING);
    }

    @Test
    void senderMarksFailedAfterThirdAttempt() {
        EmailOutbox pending = new EmailOutbox();
        pending.setRecipient("user@test.com");
        pending.setTemplateName("password-reset");
        pending.setBody("body");
        pending.setStatus(EmailOutboxStatus.PENDING);
        pending.setAttempts(2);
        when(emailOutboxRepository.findByStatus(EmailOutboxStatus.PENDING)).thenReturn(List.of(pending));
        doThrow(new MailSendFailure()).when(javaMailSender).send(any(SimpleMailMessage.class));

        EmailNotificationService service = newService();
        service.sendPending();

        assertThat(pending.getAttempts()).isEqualTo(3);
        assertThat(pending.getStatus()).isEqualTo(EmailOutboxStatus.FAILED);
    }

    private static class MailSendFailure extends MailException {
        MailSendFailure() { super("simulated SMTP failure"); }
    }
}
