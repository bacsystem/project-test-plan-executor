package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.mfa.MfaEnrollmentResult;
import com.bacsystem.auth.mfa.MfaService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class MfaVerifyIT extends PostgresRedisTestBase {

    private static final int TOTP_PERIOD_SECONDS = 30;

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private MfaService mfaService;
    @Autowired private TestRestTemplate restTemplate;

    private final DefaultCodeGenerator codeGenerator = new DefaultCodeGenerator();

    /**
     * {@link DefaultCodeGenerator#generate} takes the TOTP time-step counter (epoch seconds / period),
     * not raw epoch seconds — mirrors {@code MfaServiceIT#currentCodeFor}.
     */
    private String currentCodeFor(String rawSecret) throws Exception {
        long timeStepCounter = Math.floorDiv(new SystemTimeProvider().getTime(), TOTP_PERIOD_SECONDS);
        return codeGenerator.generate(rawSecret, timeStepCounter);
    }

    @Test
    void verifyEndpointReturnsATokenPair() throws Exception {
        Tenant tenant = new Tenant();
        tenant.setSlug("mfa-verify-" + System.nanoTime());
        tenant.setName("MFA Verify Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        User user = userService.createUser(tenant.getId(), "verify@test.com", "Passw0rd!12345", null);

        MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
        String firstCode = currentCodeFor(enrollment.rawSecret());
        mfaService.confirmEnrollment(user.getId(), firstCode);

        String challenge = mfaService.issueChallenge(user.getId(), "example-app", Set.of("permissions:sync"));
        String loginCode = currentCodeFor(enrollment.rawSecret());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<java.util.Map> response = restTemplate.postForEntity("/v1/auth/mfa/verify",
                new HttpEntity<>(java.util.Map.of("challenge", challenge, "code", loginCode), headers),
                java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsKeys("access_token", "refresh_token");

        // The scope requested on the original password-grant step must survive the MFA round-trip
        // (Global Constraint: MFA is a second factor, not a scope-stripping step) — decode the access
        // token and check its `scope` claim rather than trusting the grant, since a hardcoded empty
        // scope set would still return HTTP 200.
        String accessToken = (String) response.getBody().get("access_token");
        String payloadJson = new String(java.util.Base64.getUrlDecoder()
                .decode(accessToken.split("\\.")[1]));
        assertThat(payloadJson).contains("permissions:sync");
    }
}
