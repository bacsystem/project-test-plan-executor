# Authentication & Authorization Service — Design Spec

**Date:** 2026-07-23
**Status:** Draft — pending user review

## 1. Goal

A central identity and access control service for a set of first-party applications.
Consuming apps stop owning their own user table and delegate to this service:
authentication, token issuance, and role/permission administration.

**Guiding principle:** the service is agnostic to the domain of the consuming apps. It
administers permissions as opaque strings each app registers; it never interprets what
they mean.

Lives at `authentication/`, self-contained with its own Maven build — the same
"own directory, own build file" shape as the repo's other pilots (`factorial/`,
`subtract/`, `persons/`), on a new stack (Java 21 + Spring Authorization Server +
PostgreSQL).

## 2. Scope

### In scope for MVP

- Multi-tenant data model from the first migration (`tenant_id` on `users` and
  `roles`, composite uniqueness `UNIQUE(tenant_id, email)`).
- Exactly one tenant, created by bootstrap (§7). **No tenant-creation endpoint.**
  Recorded as explicit technical debt — the trigger to build it is "a second tenant
  is needed."
- Full CRUD via API for users, roles, permissions, and role assignments within that
  one tenant.
- Authentication: email + password + mandatory-when-enrolled TOTP MFA. No social
  login.
- Full RBAC: roles carry permissions; users carry roles.
- Per-application permission catalog registration (§9.2).
- Token issuance, refresh rotation with reuse detection, JWKS-based local
  validation, key rotation.
- Self-service password reset via `one_time_tokens` (the table was designed for
  this from the closed data model — including it is not new scope, just using the
  schema for what it was built for).
- Observability (metrics, structured logs, audit log) and rate limiting.
- k6 load/concurrency verification as a CI correctness gate.

### Deferred (explicit technical debt)

| Item | Trigger to build it |
|---|---|
| Tenant-creation endpoint | Second tenant is needed |
| Dynamic OAuth2 client registration | A non-first-party consumer appears |
| Distributed tracing export | A trace collector exists to send spans to |
| Latency thresholds as a blocking CI gate | The scheduled hardware-consistent job accumulates enough history to set a real number |

## 3. Architecture

Spring Authorization Server underneath (OAuth2/OIDC protocol and cryptography are
not hand-rolled), with all business logic — tenancy, RBAC, MFA, audit — layered on
top as regular Spring MVC controllers/services.

- **Model:** Spring MVC (servlet), not WebFlux. Spring Authorization Server is
  servlet-only; this service is not the high-traffic component (it issues and
  occasionally validates a token — the heavy traffic happens between client and
  resource server, downstream). WebFlux would also force R2DBC over JPA, losing the
  optimistic locking §9.4 requires. Virtual threads (`spring.threads.virtual.enabled=true`)
  give the relevant scalability without either cost.
- **Layering** (mirrors `persons-crud`'s Controller → Service → Repository →
  Entity, extended with a security-specific slice):

  ```
  authentication/
    pom.xml
    src/main/java/com/bacsystem/auth/
      AuthApplication.java
      config/
        AuthorizationServerConfig.java   — Spring Authorization Server wiring,
                                            custom password-grant converter (§8.1),
                                            JWKS source, virtual threads config
        SecurityConfig.java              — resource-server filter chain for the
                                            service's own admin API
        RateLimitConfig.java             — bucket4j + Redis wiring
      bootstrap/
        BootstrapRunner.java             — ApplicationRunner, --bootstrap (§7)
      tenancy/
        Tenant.java, TenantRepository.java
      identity/
        User.java, UserRepository.java, UserService.java
        MfaCredential.java, MfaBackupCode.java, MfaService.java
      rbac/
        Role.java, Permission.java, RolePermission.java, UserRole.java
        RoleService.java                 — optimistic-locked permission replace (§9.4)
        PermissionCatalogService.java    — per-app sync (§9.2)
      token/
        RefreshToken.java, RefreshTokenService.java  — rotation + reuse detection
        SigningKeyService.java           — JWKS multi-key rotation (§8.3)
      onetime/
        OneTimeToken.java, OneTimeTokenService.java  — password reset, MFA recovery
      security/
        LoginAttempt.java, LoginAttemptService.java  — lockout, IP burst detection
        BreachedPasswordChecker.java
      audit/
        AuditLog.java, AuditLogService.java
      web/
        controller/ (Users, Roles, Permissions, Mfa, PasswordReset, Applications-readonly)
        ProblemDetailAdvice.java         — RFC 7807 mapping, auth-error genericization (§10.2)
    src/main/resources/
      db/migration/                      — Flyway, versioned
    src/test/java/...                    — mirrors main, + integration/ (Testcontainers)
  ```

- **Dependency shape for the parallel-plan-executor:** this is not a thin
  sequential chain like `subtract-api`. `rbac`, `identity`, `token`, and `onetime`
  each depend on `tenancy` and shared entities but are largely independent of each
  other; `web/controller` depends on all of them. Expect real parallelism in the
  eventual plan, unlike the earlier pilots.

## 4. Tech stack (closed, not re-litigated)

Java 21 (LTS) · Spring Boot 3.x + Spring Authorization Server · Spring MVC
(servlet) · virtual threads · Maven · PostgreSQL · Spring Data JPA/Hibernate ·
Flyway (no `ddl-auto`, ever) · Testcontainers (real PostgreSQL, real Redis) · k6 ·
springdoc-openapi (generated from code) · Argon2id (BCrypt cost ≥12 fallback) ·
Redis (rate limiting) · Micrometer + Prometheus + Micrometer Tracing.

Environment check performed for this spec (2026-07-23, this machine): Docker
29.4.1 running, k6 v2.1.0, Maven 3.9.12, JDK 21.0.10 present alongside newer JDKs —
Testcontainers and k6-against-docker-compose are both viable here, not assumed
from the earlier `subtract-api`/`persons-crud` finding (which was about compiled
*binaries*, not JVM processes, and never actually tested Docker).

`java.version` pinned to `21` via the `pom.xml` property (same mechanism
`persons/pom.xml` uses for `17`), relying on the Spring Boot parent to derive
`maven.compiler.release`.

**TOTP library (open, decided here):** `dev.samstevens.totp` — pure-Java, RFC 6238
implementation, no reflection-heavy dependencies, actively maintained, includes
QR-code payload generation. No Spring-specific coupling, so it is easy to unit
test in isolation.

## 5. Multi-tenancy & identity

- A user belongs to exactly one tenant. `UNIQUE(tenant_id, email)` — not global.
- **Login must resolve a tenant.** Even though MVP has exactly one tenant, the API
  contract must not change shape when a second tenant is created (§2 defers only
  the *creation* endpoint, not the model). The login request therefore takes a
  required `tenant` (slug) field from day one, resolved to `tenant_id` server-side.
  This is a direct consequence of the closed composite-uniqueness decision, not a
  new open question.
- Users are **deactivated, not hard-deleted** (`status` field: `ACTIVE` /
  `DEACTIVATED`), to preserve referential integrity in `audit_log`, `user_roles`,
  and `login_attempts` (whose `user_id` is nullable specifically to keep historical
  rows meaningful). `DELETE /v1/users/{id}` deactivates; it does not remove the row.

## 6. Data model

Core: `tenants`, `users`, `applications`, `permissions`, `roles`, `role_permissions`,
`user_roles`.
Security: `mfa_credentials`, `mfa_backup_codes`, `refresh_tokens`, `one_time_tokens`
(discriminated by `proposito`), `login_attempts`, `audit_log`.

Rules carried over from the closed decisions plus this session's answers:

- `roles.version` — optimistic locking (§9.4).
- `applications` is the single source of truth for registered OAuth2 clients;
  Spring Authorization Server's `RegisteredClientRepository` is a JPA-backed
  implementation over this table. Because dynamic client registration is out of
  scope (first-party only, closed decision), rows are inserted by a Flyway
  migration per known app, not through an API.
- `login_attempts.user_id` nullable + `email_attempted` column, to record attempts
  against nonexistent emails (the probing pattern this table exists to detect).
  Also carries `ip_address` for the IP-level burst signal (§12).
- Everything hashed except the TOTP secret (needs reversible encryption to
  generate codes for verification): passwords, refresh tokens, backup codes,
  one-time tokens.
- `user_roles` records `assigned_by` and `assigned_at`.
- `roles.is_template` boolean distinguishes shared template roles from
  tenant-custom roles — a flag, not an ambiguous null.
- `permissions.deprecated_at` (nullable) — soft-deprecation from catalog sync
  (§9.2); physical delete only when no `role_permissions` row references it.
- `users.must_change_password` boolean — set on bootstrap-created and
  admin-created accounts; checked at login, forces a password-change step before
  a normal token is issued.
- `users.password_changed_at` — informational/audit only; no forced expiration
  policy is derived from it (§12).

## 7. Bootstrap

No UI, no tenant-creation endpoint, and the API requires authentication — so the
first tenant and admin cannot come from an API call.

`BootstrapRunner` (`ApplicationRunner`, active only under a `--bootstrap` flag /
dedicated profile):

- Idempotent: if the tenant already exists, no-op, exits 0.
- Reads the initial admin password from an environment variable — never written
  to logs, migrations, or version control.
- Creates the single tenant and one admin user with `must_change_password = true`.
- Records the creation in `audit_log`.
- The admin is forced to change the password on first login before receiving a
  usable token.

Same pattern reused for admin-created users generally (§5): temporary/assigned
password + `must_change_password`, no separate email-invite flow — that would be
scope beyond what was requested.

## 8. Tokens

### 8.1 Issuance

Password grant is not one of Spring Authorization Server's built-in grant types
(it ships `authorization_code`, `client_credentials`, `refresh_token`,
`device_code`). This service adds a **custom grant**: an
`AuthenticationConverter` + `AuthenticationProvider` registered into
`OAuth2TokenEndpointConfigurer`, which authenticates the email/password (and MFA,
see §8.4) and then delegates to Spring Authorization Server's existing token
generation/signing pipeline. This still means the protocol and cryptography are
not hand-rolled — only the credential-verification step is custom, exactly the
kind of business logic this service is supposed to add on top. Flagged here as an
implementation detail with a real feasibility risk (worth a spike early in
implementation), not a new open design question.

### 8.2 Access token

JWS, asymmetric (ES256 or RS256, never HS256). 15-minute lifetime. Validated
locally by every consuming app via JWKS — no network call to this service on the
critical path. Claims: `sub`, `tenant`, `aud`, `roles`, `exp`. Nothing else — no
personal data, since the token is signed, not encrypted (no JWE), and therefore
readable by anyone holding it. One token per application (`aud` is the specific
app, never a global token valid everywhere).

### 8.3 Refresh token & key rotation

- Refresh token: opaque random string, not a JWT. Stored hashed. Rotates on every
  use; `replaced_by` records the rotation chain. Presenting an already-rotated
  refresh token revokes the entire chain (reuse = compromise, by definition).
- **JWKS multi-key rotation, automatic and periodic** (a scheduled job, not purely
  manual): each key has a `kid`; a new key is added to JWKS and used for new
  signatures immediately, while the JWKS endpoint keeps publishing the retiring
  key for an overlap window.
  - **Overlap window = access-token lifetime + JWKS `Cache-Control` max-age +
    safety margin**, not an arbitrary multiple. With a JWKS cache of 1 hour, the
    minimum overlap is 2 hours. The JWKS endpoint's `Cache-Control` value is the
    parameter that drives this — it must be fixed explicitly in implementation
    (starting value: 1 hour).
  - **Emergency rotation procedure**: a compromised key is pulled from JWKS
    immediately, with no overlap — tokens signed with it are deliberately
    invalidated.
  - Every rotation (scheduled or emergency) is recorded in `audit_log` and emits a
    metric, so that a *missing* rotation is itself detectable by alert (§13).

### 8.4 MFA — enrollment, verification, recovery

- Enrollment: `POST /v1/auth/mfa/enroll` issues a TOTP secret (encrypted at rest)
  and QR payload; `POST /v1/auth/mfa/enroll/confirm` verifies the first code to
  activate it and issues backup codes (hashed, single-use).
- Login with MFA is two-step because a token endpoint cannot cleanly return
  "give me a second factor" and a token in the same shape: the password grant
  returns an `mfa_required` response with a short-lived challenge ticket when the
  user has MFA enrolled; `POST /v1/auth/mfa/verify` exchanges
  `{challenge, totp_code}` for the actual token pair.
- **Recovery (device lost, backup codes exhausted)** — administrative reset, with
  guards against social engineering:
  - Out-of-band identity verification is **required** before an admin executes the
    reset; the concrete method is each tenant's operational responsibility, but the
    endpoint requires the admin to record which method was used, and that value
    goes to `audit_log`.
  - Resetting MFA revokes **all** of the user's refresh tokens — no session
    survives a reset; full reauthentication is forced.
  - The user is notified by email of who reset their MFA and when. The
    notification is not an authentication factor — only an alert, so the user
    finds out if it wasn't them.
  - An admin cannot reset their own MFA. Resetting another admin's MFA emits a
    dedicated security signal in addition to the audit log entry.
  - **Last-admin-standing case**: if no administrator remains capable of executing
    the reset, recovery is performed by the service operator via the same
    bootstrap CLI (never an HTTP endpoint) — documented as a runbook procedure, not
    improvised when it happens.

## 9. Authorization (RBAC)

### 9.1 Token carries roles, not permissions

Each app downloads its role→permission catalog at startup and refreshes it
periodically — a mapping change applies within minutes without reissuing tokens,
and the token stays small. **Consumer-side caching strategy (open item, decided
here):** in-memory cache per app instance, refreshed on a scheduled poll (default
every 5 minutes, configurable) using conditional GET with `ETag`/
`If-None-Match` to avoid re-transferring an unchanged catalog. On fetch failure,
the app keeps its last-known-good cache indefinitely rather than failing closed —
consistent with §14's decision that the ecosystem's availability during an outage
rides entirely on cache TTLs, not on retries succeeding.

### 9.2 Permission catalog registration

`PUT /v1/applications/{app}/permissions` — the app sends its complete permission
list on startup, authenticated with a dedicated `permissions:sync` scope (not the
general admin scope). Idempotent and atomic against concurrent replicas of the
same app (a unique constraint + upsert, not read-then-write). Permissions absent
from the submitted list are marked `deprecated_at` and keep working in roles that
already reference them; physical deletion only happens once no `role_permissions`
row references them. The response reports counts added/deprecated. Every sync is
recorded in `audit_log`.

### 9.3 Roles

`roles.is_template` distinguishes shared template roles from tenant-custom roles.
Full CRUD via API (create, list, get, delete-if-unreferenced).

### 9.4 Concurrency-critical: replacing a role's permission set

`PUT /v1/roles/{id}/permissions` — replacing the full permission set of a role
must be atomic and safe under concurrent writers; two admins editing the same role
at once must never produce a silent union of both sets.

- Optimistic locking on `roles.version`: the request must include the version it
  read; a mismatch is rejected **before** touching `role_permissions`.
- A version conflict is a `409`, not a `5xx` — see §11 for the error envelope.
- Verified by a k6 scenario (§16), not just unit/integration tests — see its
  binary (non-percentage) thresholds there.

## 10. API contract

### 10.1 Conventions

- **Versioning:** path-based (`/v1/...`) for this service's own business API.
  Spring Authorization Server's protocol-standard endpoints
  (`/oauth2/token`, `/oauth2/jwks`, `/.well-known/oauth-authorization-server`, …)
  keep their framework-fixed paths, unversioned — they are protocol surface, not
  this service's API surface.
- **Pagination:** cursor-based (opaque cursor), on every list endpoint.
- **Idempotency:** `Idempotency-Key` header is honored when the client sends it,
  never required — the schema's natural constraints (unique email, unique
  permission name, `roles.version`) already turn a retried write into a `409`
  rather than a silent duplicate.
- **Errors:** `application/problem+json` (RFC 7807: `type`, `title`, `status`,
  `detail`, `instance`, plus a domain `code` extension) for validation and
  business errors.

### 10.2 Authentication-error genericization (security rule, not RFC 7807 granularity)

Authentication failures — bad credentials, bad MFA code, invalid/expired token,
**locked account** — all return one single generic `type`/`code`
(`authentication_failed`), regardless of the real cause, and never reveal whether
an email exists or whether the account is locked. The real cause is recorded only
in `audit_log`. The fine-grained RFC 7807 `code` values apply to validation and
business errors (duplicate email, role-version conflict, unknown permission), never
to authentication.

## 11. Endpoint catalog

OAuth2/OIDC protocol surface (Spring Authorization Server, framework paths):

| Endpoint | Purpose |
|---|---|
| `POST /oauth2/token` | Custom password grant (§8.1) + standard `refresh_token` grant |
| `GET /.well-known/jwks.json` | Public signing keys, multi-`kid`, `Cache-Control` per §8.3 |
| `GET /.well-known/oauth-authorization-server` | OIDC/OAuth2 discovery metadata |
| `POST /oauth2/revoke` | Revoke a refresh token chain (logout) |

Business API (`/v1`):

| Method | Path | Purpose | Key errors |
|---|---|---|---|
| POST | `/v1/auth/mfa/verify` | Exchange MFA challenge + TOTP code for a token pair | `authentication_failed` (generic) |
| POST | `/v1/auth/password/change` | Change own password (also clears `must_change_password`) | `authentication_failed`, `validation_error` (breach-list/length) |
| POST | `/v1/auth/password/reset-request` | Request a reset link via email (`one_time_tokens`, `proposito=password_reset`) | always `202` — never reveals whether the email exists |
| POST | `/v1/auth/password/reset-confirm` | Redeem the one-time token, set a new password | `authentication_failed` (invalid/expired token) |
| POST | `/v1/auth/mfa/enroll` | Begin TOTP enrollment (secret + QR payload) | — |
| POST | `/v1/auth/mfa/enroll/confirm` | Confirm first TOTP code, activate MFA, issue backup codes | `validation_error` |
| POST | `/v1/admin/users/{id}/mfa/reset` | Admin-initiated MFA reset (§8.4 guards) | `403` (self-reset, non-admin) |
| POST | `/v1/users` | Create user (temp password, `must_change_password=true`) | `409` duplicate email in tenant |
| GET | `/v1/users/{id}` | Get user | `404` |
| GET | `/v1/users?cursor=&size=` | List users | — |
| PATCH | `/v1/users/{id}` | Update profile fields (not password/MFA — dedicated endpoints) | `400`, `404` |
| DELETE | `/v1/users/{id}` | Deactivate (not hard-delete, §5) | `404` |
| POST | `/v1/roles` | Create role | `409` duplicate name |
| GET | `/v1/roles` / `/v1/roles/{id}` | List/get roles | `404` |
| PUT | `/v1/roles/{id}/permissions` | Replace permission set, optimistic-locked (§9.4) | `409` version conflict |
| DELETE | `/v1/roles/{id}` | Delete role | `409` if referenced by `user_roles` |
| GET | `/v1/permissions` | List the full catalog (admin visibility) | — |
| PUT | `/v1/applications/{app}/permissions` | Sync an app's permission catalog (§9.2) | scope `permissions:sync` required |
| POST | `/v1/users/{id}/roles` | Assign role | `409` already assigned |
| DELETE | `/v1/users/{id}/roles/{roleId}` | Revoke role | `404` |

Every mutating endpoint above writes an `audit_log` entry as a side effect
(actor, action, target, timestamp) — not listed per-row to avoid repeating it 20
times.

## 12. Security operations: passwords, lockout, rate limiting

- **Password policy:** minimum length 12, no forced composition rules and no
  forced expiration (NIST 800-63B-aligned) — instead, rejection against
  known-breached passwords (local list or HaveIBeenPwned via k-anonymity).
- **Lockout:** exponential backoff — first lockout at 5 consecutive failures (1
  minute), doubling on each subsequent lockout up to a cap, reset on a successful
  login. Tracked **both** per-account and per-IP (`login_attempts.ip_address`) to
  catch password spraying, which a per-account-only counter misses.
- Locked-account responses are indistinguishable from invalid-credentials
  responses (§10.2) — the real state is in `audit_log` only.
- **Rate limiting:** bucket4j + Redis (shared, consistent across instances, not
  per-process). Stricter thresholds on auth endpoints (`/oauth2/token`,
  `/v1/auth/*`), looser on admin CRUD. Fails **closed** on auth endpoints if Redis
  is unavailable, fails **open** on admin endpoints (favors availability of
  internal tooling over strict enforcement there). Client IP resolved from
  `X-Forwarded-For` only against a configured trusted-proxy list — never trusted
  unvalidated, or the per-IP limit is trivially bypassed with a forged header.
  Thresholds are explicit configuration constants (not hardcoded), because they
  are exactly what the k6 thresholds in §16 assert against.

## 13. Revocation

Three layers, no denylist checked on every request (that would destroy local
validation and reintroduce a per-request dependency on this service):

1. Exposure window bounded by access-token lifetime (15 minutes) — no exceptions,
   no grace period on expiry (§14): expiration is the control that limits the
   blast radius of a leaked token, and cannot have exceptions, least of all ones
   implemented independently in every consuming app.
2. Refresh token revoked immediately in the database — the user cannot renew.
3. Real-time verification only for critical actions (permission changes,
   deletions, other sensitive operations) — everything else validates signature
   only.

## 14. Degradation

If the service is fully down: apps keep operating on the access token they
already hold until it expires (15 minutes) — no logins, no refreshes succeed
during the outage. The role→permission catalog keeps serving from each app's last
cached copy. Availability during an outage is protected entirely by generous TTLs
on the JWKS cache and the catalog cache (§9.1) plus this service's own HA, not by
any grace period on token expiry.

## 15. Observability

- Micrometer metrics exposed via `/actuator/prometheus`: per-endpoint latency,
  error rate, lockouts, key rotations, connection-pool sizing. **Never tagged by
  email or user_id** (unbounded cardinality + personal data in a system designed
  to hold none).
- Structured JSON logs to stdout — no passwords, tokens, TOTP secrets, or personal
  data. Correlating an event to a user uses the internal user id, and only inside
  `audit_log`.
- Micrometer Tracing propagates a W3C `traceparent` into logs (no trace exporter
  yet — the instrumentation is ready to switch on once a collector exists,
  recorded as deferred in §2).
- Security alerts, distinct from generic ops metrics:
  - Refresh-token reuse detected — high severity, immediate (a compromised token
    by definition).
  - Key rotation absent past the expected period.
  - `audit_log` write failure.
  - Login-failure burst by IP (distinct from the per-account counter).
  - Lockout rate and `429` rate.

## 16. Testing strategy

Both layers are mandatory; neither substitutes for the other.

### 16.1 Unit / integration

- Mockito for service-layer unit tests (mirrors `persons-crud`'s pattern).
- **Testcontainers with real PostgreSQL** for repository/integration tests — an
  in-memory database's locking/concurrency behavior differs from production, and
  §9.4's concurrency requirement would be "verified" against something unlike
  production, i.e., not verified. Confirmed viable in this environment (§4).
- `@WebMvcTest` + MockMvc for controllers, per endpoint/status code in §11.

### 16.2 k6 — correctness gate (blocks CI) vs. latency trend (does not block)

Run against a docker-compose environment (packaged jar, not `mvn spring-boot:run`,
+ real Postgres + real Redis) as a CI job — confirmed viable in this environment
(§4).

**Correctness — deterministic, blocks the pipeline:**

- Role-permission concurrency scenario: ≥20 virtual users replacing the *same*
  role's permissions concurrently from the same starting version.
  - Every response is `200` or `409` — zero `5xx`.
  - The final stored state is exactly one of the submitted sets, never a union.
  - A detected conflict leaves no partial writes in `role_permissions`.
- Lockout threshold holds under concurrent bursts (no race lets it be exceeded).
- Rate limiting returns `429` correctly under load, not `5xx`.

**Latency — measured and reported as a trend every CI run, does not block** (a
shared runner produces false reds that get the whole job disabled, taking the
correctness gate down with it). A separate scheduled job on consistent hardware
is the real latency gate.

- Login: `p95 < argon2id_calibrated_cost + 150ms`. The Argon2id cost parameters
  are calibrated first for ~250–500ms of hashing on the target hardware; the
  login threshold is derived from that number, never the reverse — lowering
  Argon2 cost to hit a latency target is prohibited.
- Refresh / reads (JWKS, catalog): `p95 < 150ms`, `p99 < 400ms`.
- General error rate < 0.5%, explicitly excluding `401`/`409`/`429` — those are
  correct system responses, not failures.
- Sustained load models a realistic mix (mostly refresh/reads, occasional
  logins), starting at 200 VUs, adjustable once real usage is known.
- Load seed has realistic volume (on the order of thousands of users, dozens of
  roles with assignments) so query plans resemble production, not a toy dataset.

## 17. Risks & decisions explicitly discarded

- **Password grant is not built into Spring Authorization Server** — requires a
  custom `AuthenticationConverter`/`AuthenticationProvider` (§8.1). Worth an early
  implementation spike; the risk is scope/complexity of that integration, not the
  protocol/crypto correctness (still delegated to Spring Authorization Server).
- **Grace period on token expiry during an outage** — discarded. Expiration is a
  non-negotiable blast-radius control; a distributed, per-app exception would
  undermine it. Availability is bought with cache TTLs instead (§14).
- **Denylist checked on every request for revocation** — discarded. Would
  reintroduce a hard per-request dependency on this service, defeating local JWKS
  validation.
- **Complexity rules + forced 90-day expiration** — an initial answer during
  design leaned toward this more traditional/enterprise policy; explicitly
  superseded in favor of length + breach-list checking with no forced
  character-class rules and no forced expiration, aligned with NIST 800-63B.
- **k6 latency thresholds as a hard CI gate** — discarded for the default
  pipeline (false-red risk on shared runners); kept as a non-blocking trend plus a
  separate scheduled gate on dedicated hardware.

## 18. Out of scope (explicit YAGNI)

- Tenant-creation endpoint (§2 — deferred, not forgotten).
- Dynamic/third-party OAuth2 client registration; consent screens.
- Social login.
- JWE / encrypted tokens.
- A denylist-based revocation check on the hot path.
- Distributed trace export (instrumentation exists, no collector yet).
- UI of any kind — this is API-only; OpenAPI/springdoc is the integration surface.
- Any interpretation by this service of what a permission string means.
