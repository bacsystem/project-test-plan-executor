package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Regression for the TOCTOU race fixed in {@code PasswordChangeChallengeService}: {@code
 * PasswordController#changeRequired} used to validate the ticket with a non-destructive {@code
 * peekChallenge} (plain Redis GET) and only delete it (via {@code consumeChallenge}) once the
 * entire password-change + MFA-check flow finished. Two near-simultaneous requests presenting the
 * same raw ticket could both pass that read, both run the full flow, and both eventually delete the
 * same (already-deleted) key — redeeming a nominally single-use ticket twice. The fix claims the
 * ticket atomically up front (Redis GETDEL, see {@code PasswordChangeChallengeService#claimChallenge}),
 * so of any number of concurrent callers presenting the same ticket, at most one can ever get a
 * token pair back — every other caller must fail exactly as if the ticket never existed.
 *
 * <p>Kept in its own class/file, separate from {@link PasswordChangeRequiredIT}, for the same
 * reason {@code RoleServiceConcurrencyIT}/{@code PermissionCatalogServiceConcurrencyIT} are split
 * out from their non-concurrency counterparts elsewhere in this codebase: a deliberately oversized
 * burst of concurrent requests is exactly the kind of traffic {@code RateLimiter}'s auth bucket (10
 * per minute per IP by default, see {@code PasswordGrantIT#tokenEndpointIsRateLimitedAfterExceedingTheAuthBucketCapacity})
 * exists to reject, which would otherwise contaminate both this test (429s indistinguishable from
 * "the ticket was already claimed") and every other test sharing this class's default-IP bucket.
 * The capacity is raised here, isolated to this class's own Spring context, so every request in the
 * burst is decided by {@code claimChallenge}'s atomicity alone, not by an unrelated rate limit.
 */
class PasswordChangeChallengeConcurrencyIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private TestRestTemplate restTemplate;

    @DynamicPropertySource
    static void raiseAuthRateLimitCapacity(DynamicPropertyRegistry registry) {
        registry.add("auth.rate-limit.auth-capacity-per-minute", () -> "1000");
    }

    private String obtainChallenge(Tenant tenant, String email, String tempPassword) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", email);
        form.add("password", tempPassword);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), Map.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("password_change_required");
        return (String) response.getBody().get("error_description");
    }

    @Test
    void concurrentRedemptionOfTheSameChallengeTicketSucceedsExactlyOnce() throws Exception {
        Tenant tenant = new Tenant();
        tenant.setSlug("pwchange-race-" + System.nanoTime());
        tenant.setName("Password Change Required Concurrency Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "race-attempt@test.com", "TempPassw0rd!123", null);

        String challenge = obtainChallenge(tenant, "race-attempt@test.com", "TempPassw0rd!123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        int callers = 20;
        ExecutorService pool = Executors.newFixedThreadPool(callers);
        AtomicInteger okCount = new AtomicInteger();
        AtomicInteger rejectedCount = new AtomicInteger();
        List<Throwable> unexpected = new CopyOnWriteArrayList<>();

        List<Callable<Void>> tasks = new ArrayList<>();
        for (int i = 0; i < callers; i++) {
            tasks.add(() -> {
                try {
                    ResponseEntity<Map> response = restTemplate.postForEntity("/v1/auth/password/change-required",
                            new HttpEntity<>(Map.of("challenge", challenge, "newPassword", "BrandNewPassw0rd!456"),
                                    headers),
                            Map.class);
                    if (response.getStatusCode() == HttpStatus.OK) {
                        okCount.incrementAndGet();
                    } else if (response.getStatusCode() == HttpStatus.BAD_REQUEST
                            && "authentication_failed".equals(response.getBody().get("code"))) {
                        rejectedCount.incrementAndGet();
                    } else {
                        unexpected.add(new AssertionError("Unexpected response: " + response.getStatusCode()
                                + " " + response.getBody()));
                    }
                } catch (Throwable t) {
                    unexpected.add(t);
                }
                return null;
            });
        }
        List<Future<Void>> futures = pool.invokeAll(tasks);
        for (Future<Void> f : futures) f.get();
        pool.shutdown();

        assertThat(unexpected).isEmpty();
        assertThat(okCount.get()).isEqualTo(1);
        assertThat(rejectedCount.get()).isEqualTo(callers - 1);
    }
}
