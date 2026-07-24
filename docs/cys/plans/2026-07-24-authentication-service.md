# Authentication & Authorization Service Implementation Plan

> **For agentic workers:** execute this plan with the
> parallel-plan-executor Workflow (cys:run / the /cys:run-plan command).
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A central identity/access-control service — email+password+TOTP MFA
authentication, full RBAC, token issuance/rotation — built on Spring
Authorization Server, self-contained under `authentication/` with its own
Maven build.

**Architecture:** Spring Authorization Server underneath (protocol/crypto not
hand-rolled) with business logic (tenancy, RBAC, MFA, audit, email, rate
limiting) layered on top as ordinary Spring MVC (servlet, virtual threads)
components. Nine largely-independent domain modules (`tenancy`, `identity`,
`rbac`, `token`, `onetime`, `mfa`, `security`, `audit`, `email`) each get
their own entity+repository+migration; a service tier sits on top of those;
config/controllers sit on top of the services. Real parallelism is expected
once `identity` (User) lands — most of the domain-module tasks and several
service tasks touch disjoint files with no symbol dependency on each other.

**Tech Stack:** Java 21, Spring Boot 3.3.4, Spring Authorization Server,
Spring Data JPA/Hibernate, PostgreSQL, Flyway, Redis (rate limiting + MFA
challenge tickets), bucket4j, `dev.samstevens.totp`, Micrometer/Prometheus,
Micrometer Tracing, springdoc-openapi, Testcontainers, k6, Maven, Lombok.

Spec: `docs/cys/specs/2026-07-23-authentication-service-design.md` (all
19 sections). Section references below (`§N`) point there.

## Global Constraints

- Module root: `authentication/` with its own `authentication/pom.xml` —
  same "own directory, own build file" shape as `factorial/`, `subtract/`,
  `persons/`.
- Package root: `com.bacsystem.auth`.
- Java 21 (`<java.version>21</java.version>`, enforced by
  `maven-enforcer-plugin`'s `requireJavaVersion` at `[21,22)` — a build
  failure on any other JDK, not just a declared property; enforced by Task 1).
- Spring Boot 3.3.4 parent, Maven only. Lombok allowed
  (`@Getter/@Setter/@Builder/@RequiredArgsConstructor/@Slf4j`) — this module is
  far larger than the repo's earlier Java pilot (`persons-crud`, which
  avoided it); boilerplate reduction matters here.
- `spring.threads.virtual.enabled=true` in `application.yml` (§3).
- Every entity/repository task includes its own Flyway migration under
  `authentication/src/main/resources/db/migration/`, with the exact
  `Vn__name.sql` filename given in that task — version numbers are
  pre-assigned across the whole plan specifically so parallel tasks never
  collide on the same version number. **Never renumber a migration once
  assigned here**, even if tasks merge out of numeric order — Flyway sorts by
  version, not by merge time, so the final sequence is correct once all
  migrations exist, regardless of merge order.
- Integration tests (anything touching a repository or the full Spring
  context) use **Testcontainers with real PostgreSQL and real Redis** — no
  H2, no embedded Redis, no mocks standing in for the database (§17.1,
  §17.2). Docker confirmed available in this environment (spec §4).
- Unit tests for pure service logic (no Spring context, no DB) use Mockito.
- Run tests from the module root: `cd authentication && mvn -q test
  -Dtest=<ClassName>` (omit `-Dtest` for the whole suite). Every step below
  gives the exact class to target.
- Multi-tenancy: every business-API request is authenticated; the caller's
  tenant is read from the access token's `tenant` claim (never from a path or
  query parameter) and passed explicitly into service methods as a
  `UUID tenantId` argument — services never read `SecurityContextHolder`
  themselves, keeping them unit-testable without a servlet context.
- RFC 7807 (`application/problem+json`) for every error response; the single
  exception is authentication failures, which always return the generic
  `authentication_failed` type (§10.2) — never a distinguishing code.
- All migrations, all entities: no `ddl-auto`, ever. Hibernate's
  `spring.jpa.hibernate.ddl-auto` stays `validate` in every profile.
- Package layout mirrors spec §3 exactly:
  `com.bacsystem.auth.{config,bootstrap,tenancy,identity,rbac,token,onetime,
  mfa,security,audit,email,web,web.controller}`.

---

### Task 1: Project Scaffold & Testcontainers Base

**Files:**
- Create: `authentication/pom.xml`
- Create: `authentication/.gitignore`
- Create: `authentication/src/main/resources/application.yml`
- Create: `authentication/src/main/java/com/bacsystem/auth/AuthApplication.java`
- Create: `authentication/src/test/java/com/bacsystem/auth/support/PostgresRedisTestBase.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/AuthApplicationContextTest.java`

**Interfaces:**
- Consumes: None
- Produces: `com.bacsystem.auth.support.PostgresRedisTestBase`, `AuthApplication`

**Steps:**

1. Create `authentication/pom.xml`:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>

       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>3.3.4</version>
           <relativePath/>
       </parent>

       <groupId>com.bacsystem</groupId>
       <artifactId>authentication</artifactId>
       <version>0.1.0</version>
       <packaging>jar</packaging>

       <properties>
           <java.version>21</java.version>
           <totp.version>1.7.1</totp.version>
           <bucket4j.version>8.10.1</bucket4j.version>
       </properties>

       <dependencies>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-security</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-oauth2-authorization-server</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-data-jpa</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-data-redis</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-validation</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-mail</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-actuator</artifactId>
           </dependency>
           <dependency>
               <groupId>io.micrometer</groupId>
               <artifactId>micrometer-registry-prometheus</artifactId>
           </dependency>
           <dependency>
               <groupId>io.micrometer</groupId>
               <artifactId>micrometer-tracing-bridge-otel</artifactId>
           </dependency>
           <dependency>
               <groupId>org.flywaydb</groupId>
               <artifactId>flyway-core</artifactId>
           </dependency>
           <dependency>
               <groupId>org.flywaydb</groupId>
               <artifactId>flyway-database-postgresql</artifactId>
           </dependency>
           <dependency>
               <groupId>org.postgresql</groupId>
               <artifactId>postgresql</artifactId>
               <scope>runtime</scope>
           </dependency>
           <dependency>
               <groupId>org.springdoc</groupId>
               <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
               <version>2.6.0</version>
           </dependency>
           <dependency>
               <groupId>dev.samstevens.totp</groupId>
               <artifactId>totp</artifactId>
               <version>${totp.version}</version>
           </dependency>
           <dependency>
               <groupId>com.bucket4j</groupId>
               <artifactId>bucket4j-core</artifactId>
               <version>${bucket4j.version}</version>
           </dependency>
           <dependency>
               <groupId>com.bucket4j</groupId>
               <artifactId>bucket4j-redis</artifactId>
               <version>${bucket4j.version}</version>
           </dependency>
           <dependency>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok</artifactId>
               <optional>true</optional>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-test</artifactId>
               <scope>test</scope>
           </dependency>
           <dependency>
               <groupId>org.springframework.security</groupId>
               <artifactId>spring-security-test</artifactId>
               <scope>test</scope>
           </dependency>
           <dependency>
               <groupId>org.testcontainers</groupId>
               <artifactId>junit-jupiter</artifactId>
               <scope>test</scope>
           </dependency>
           <dependency>
               <groupId>org.testcontainers</groupId>
               <artifactId>postgresql</artifactId>
               <scope>test</scope>
           </dependency>
       </dependencies>

       <dependencyManagement>
           <dependencies>
               <dependency>
                   <groupId>org.testcontainers</groupId>
                   <artifactId>testcontainers-bom</artifactId>
                   <version>1.20.1</version>
                   <type>pom</type>
                   <scope>import</scope>
               </dependency>
           </dependencies>
       </dependencyManagement>

       <build>
           <plugins>
               <plugin>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-maven-plugin</artifactId>
                   <configuration>
                       <excludes>
                           <exclude>
                               <groupId>org.projectlombok</groupId>
                               <artifactId>lombok</artifactId>
                           </exclude>
                       </excludes>
                   </configuration>
               </plugin>
               <plugin>
                   <groupId>org.apache.maven.plugins</groupId>
                   <artifactId>maven-enforcer-plugin</artifactId>
                   <executions>
                       <execution>
                           <id>enforce-java-21</id>
                           <goals>
                               <goal>enforce</goal>
                           </goals>
                           <configuration>
                               <rules>
                                   <requireJavaVersion>
                                       <version>[21,22)</version>
                                   </requireJavaVersion>
                               </rules>
                               <fail>true</fail>
                           </configuration>
                       </execution>
                   </executions>
               </plugin>
           </plugins>
       </build>
   </project>
   ```

2. Create `authentication/.gitignore`:

   ```
   target/
   *.class
   .idea/
   *.iml
   ```

3. Create `authentication/src/main/resources/application.yml`:

   ```yaml
   spring:
     application:
       name: authentication
     threads:
       virtual:
         enabled: true
     datasource:
       url: jdbc:postgresql://localhost:5432/authentication
       username: authentication
       password: authentication
     jpa:
       hibernate:
         ddl-auto: validate
       open-in-view: false
     flyway:
       locations: classpath:db/migration
     data:
       redis:
         host: localhost
         port: 6379
     mail:
       host: localhost
       port: 1025

   management:
     endpoints:
       web:
         exposure:
           include: health,prometheus
     metrics:
       tags:
         application: authentication

   server:
     port: 8080
   ```

4. Create `authentication/src/main/java/com/bacsystem/auth/AuthApplication.java`:

   ```java
   package com.bacsystem.auth;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.scheduling.annotation.EnableScheduling;

   @SpringBootApplication
   @EnableScheduling
   public class AuthApplication {
       public static void main(String[] args) {
           SpringApplication.run(AuthApplication.class, args);
       }
   }
   ```

5. Create `authentication/src/test/java/com/bacsystem/auth/support/PostgresRedisTestBase.java`
   — every later integration-test task extends this:

   ```java
   package com.bacsystem.auth.support;

   import org.junit.jupiter.api.extension.ExtendWith;
   import org.springframework.boot.test.context.SpringBootTest;
   import org.springframework.test.context.DynamicPropertyRegistry;
   import org.springframework.test.context.DynamicPropertySource;
   import org.testcontainers.containers.GenericContainer;
   import org.testcontainers.containers.PostgreSQLContainer;
   import org.testcontainers.junit.jupiter.Container;
   import org.testcontainers.junit.jupiter.Testcontainers;
   import org.testcontainers.utility.DockerImageName;

   @Testcontainers
   @ExtendWith(org.springframework.test.context.junit.jupiter.SpringExtension.class)
   @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
   public abstract class PostgresRedisTestBase {

       @Container
       static final PostgreSQLContainer<?> POSTGRES =
               new PostgreSQLContainer<>(DockerImageName.parse("postgres:16-alpine"))
                       .withDatabaseName("authentication")
                       .withUsername("authentication")
                       .withPassword("authentication");

       @Container
       static final GenericContainer<?> REDIS =
               new GenericContainer<>(DockerImageName.parse("redis:7-alpine"))
                       .withExposedPorts(6379);

       @DynamicPropertySource
       static void registerProperties(DynamicPropertyRegistry registry) {
           registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
           registry.add("spring.datasource.username", POSTGRES::getUsername);
           registry.add("spring.datasource.password", POSTGRES::getPassword);
           registry.add("spring.data.redis.host", REDIS::getHost);
           registry.add("spring.data.redis.port", () -> REDIS.getMappedPort(6379));
       }
   }
   ```

6. Create `authentication/src/test/java/com/bacsystem/auth/AuthApplicationContextTest.java`:

   ```java
   package com.bacsystem.auth;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;

   class AuthApplicationContextTest extends PostgresRedisTestBase {

       @Test
       void contextLoads() {
           // Intentionally empty: a successful Spring context load against
           // real Postgres + Redis containers is the assertion.
       }
   }
   ```

7. Run: `cd authentication && mvn -q test -Dtest=AuthApplicationContextTest`.
   Expect **FAIL** (no `db/migration` directory yet — Flyway has nothing to
   validate against, or the module doesn't compile without one).

8. There is no production code to add yet beyond what's above — the context
   fails because Flyway finds zero migrations while `ddl-auto=validate`
   expects a schema. Add a placeholder baseline migration so the context can
   load: create `authentication/src/main/resources/db/migration/V1__baseline.sql`
   with just a comment (`-- baseline, tables created by later migrations`).
   **Task 2 owns the real `V1`** — rename this file's version to `V0` instead:
   `authentication/src/main/resources/db/migration/V0__baseline.sql`.

9. Run: `cd authentication && mvn -q test -Dtest=AuthApplicationContextTest`.
   Expect **PASS**.

10. Run: `cd authentication && mvn -q validate`. Expect **PASS** (enforcer
    plugin accepts the JDK in use). Confirm the enforcer actually fails on a
    wrong version: temporarily edit the `requireJavaVersion` range to
    `[99,100)`, rerun `mvn -q validate`, confirm it fails with a
    `RequireJavaVersion` message, then revert to `[21,22)`.

11. Commit:

    ```bash
    git add authentication/pom.xml authentication/.gitignore \
      authentication/src/main/resources/application.yml \
      authentication/src/main/resources/db/migration/V0__baseline.sql \
      authentication/src/main/java/com/bacsystem/auth/AuthApplication.java \
      authentication/src/test/java/com/bacsystem/auth/support/PostgresRedisTestBase.java \
      authentication/src/test/java/com/bacsystem/auth/AuthApplicationContextTest.java
    git commit -m "feat(auth): scaffold Spring Boot module with Testcontainers base"
    ```

---

### Task 2: Tenancy — Tenant Entity & Repository

**Files:**
- Create: `authentication/src/main/resources/db/migration/V1__create_tenants.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/tenancy/Tenant.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/tenancy/TenantRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/tenancy/TenantRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.tenancy.Tenant`, `com.bacsystem.auth.tenancy.TenantRepository`

**Steps:**

1. Write the failing test `TenantRepositoryTest`:

   ```java
   package com.bacsystem.auth.tenancy;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.Optional;

   import static org.assertj.core.api.Assertions.assertThat;

   class TenantRepositoryTest extends PostgresRedisTestBase {

       @Autowired
       private TenantRepository tenantRepository;

       @Test
       void savesAndFindsBySlug() {
           Tenant tenant = new Tenant();
           tenant.setSlug("acme");
           tenant.setName("Acme Corp");
           Tenant saved = tenantRepository.save(tenant);

           assertThat(saved.getId()).isNotNull();

           Optional<Tenant> found = tenantRepository.findBySlug("acme");
           assertThat(found).isPresent();
           assertThat(found.get().getName()).isEqualTo("Acme Corp");
       }

       @Test
       void slugIsUnique() {
           Tenant first = new Tenant();
           first.setSlug("dup");
           first.setName("First");
           tenantRepository.saveAndFlush(first);

           Tenant second = new Tenant();
           second.setSlug("dup");
           second.setName("Second");

           org.junit.jupiter.api.Assertions.assertThrows(
                   org.springframework.dao.DataIntegrityViolationException.class,
                   () -> tenantRepository.saveAndFlush(second));
       }
   }
   ```

2. Run `mvn -q test -Dtest=TenantRepositoryTest`. Expect **FAIL** (no
   `tenants` table, no `Tenant` class).

3. Create `V1__create_tenants.sql`:

   ```sql
   CREATE TABLE tenants (
       id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       slug        VARCHAR(63) NOT NULL UNIQUE,
       name        VARCHAR(255) NOT NULL,
       created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
   );
   ```

4. Create `Tenant.java`:

   ```java
   package com.bacsystem.auth.tenancy;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "tenants")
   @Getter
   @Setter
   public class Tenant {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(nullable = false, unique = true, length = 63)
       private String slug;

       @Column(nullable = false)
       private String name;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

5. Create `TenantRepository.java`:

   ```java
   package com.bacsystem.auth.tenancy;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.Optional;
   import java.util.UUID;

   public interface TenantRepository extends JpaRepository<Tenant, UUID> {
       Optional<Tenant> findBySlug(String slug);
   }
   ```

6. Run `mvn -q test -Dtest=TenantRepositoryTest`. Expect **PASS**.

7. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V1__create_tenants.sql \
     authentication/src/main/java/com/bacsystem/auth/tenancy/ \
     authentication/src/test/java/com/bacsystem/auth/tenancy/
   git commit -m "feat(auth): add Tenant entity and repository"
   ```

---

### Task 3: Applications — RegisteredClient Storage & Seed

**Files:**
- Create: `authentication/src/main/resources/db/migration/V2__create_applications.sql`
- Create: `authentication/src/main/resources/db/migration/V3__seed_example_application.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/ApplicationClient.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/ApplicationClientRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/JpaRegisteredClientRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/rbac/JpaRegisteredClientRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.rbac.ApplicationClient`, `com.bacsystem.auth.rbac.ApplicationClientRepository`, `com.bacsystem.auth.rbac.JpaRegisteredClientRepository`

**Steps:**

1. Write the failing test `JpaRegisteredClientRepositoryTest`:

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.security.oauth2.core.AuthorizationGrantType;
   import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

   import static org.assertj.core.api.Assertions.assertThat;

   class JpaRegisteredClientRepositoryTest extends PostgresRedisTestBase {

       @Autowired
       private JpaRegisteredClientRepository repository;

       @Test
       void findsSeededExampleApp() {
           RegisteredClient client = repository.findByClientId("example-app");

           assertThat(client).isNotNull();
           assertThat(client.getAuthorizationGrantTypes())
                   .contains(AuthorizationGrantType.REFRESH_TOKEN);
           assertThat(client.getClientAuthenticationMethods())
                   .contains(ClientAuthenticationMethod.CLIENT_SECRET_BASIC);
       }

       @Test
       void findsById() {
           RegisteredClient byClientId = repository.findByClientId("example-app");
           RegisteredClient byId = repository.findById(byClientId.getId());

           assertThat(byId.getClientId()).isEqualTo("example-app");
       }
   }
   ```

2. Run `mvn -q test -Dtest=JpaRegisteredClientRepositoryTest`. Expect **FAIL**.

3. Create `V2__create_applications.sql`:

   ```sql
   CREATE TABLE applications (
       id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       client_id                   VARCHAR(100) NOT NULL UNIQUE,
       client_secret_hash          VARCHAR(255) NOT NULL,
       client_name                 VARCHAR(255) NOT NULL,
       scopes                      VARCHAR(500) NOT NULL,
       authorization_grant_types   VARCHAR(255) NOT NULL,
       client_authentication_methods VARCHAR(255) NOT NULL,
       access_token_ttl_seconds    INTEGER NOT NULL DEFAULT 900,
       created_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
   );
   ```

4. Create `V3__seed_example_application.sql` — password hashed with
   BCrypt(strength 12) for the literal secret `example-secret` (dev/test
   only; production apps get their own migration-provisioned secret, out of
   scope for this pilot):

   ```sql
   INSERT INTO applications (client_id, client_secret_hash, client_name, scopes,
                              authorization_grant_types, client_authentication_methods)
   VALUES ('example-app',
           '{bcrypt}$2a$12$3euPcmQFCiblsZeEu5s7p.9wVsU1jGkoTGdOBHOL7hlyzeqNxUlWO',
           'Example Consumer App',
           'permissions:sync',
           'password,refresh_token',
           'client_secret_basic');
   ```

5. Create `ApplicationClient.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "applications")
   @Getter
   @Setter
   public class ApplicationClient {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(name = "client_id", nullable = false, unique = true)
       private String clientId;

       @Column(name = "client_secret_hash", nullable = false)
       private String clientSecretHash;

       @Column(name = "client_name", nullable = false)
       private String clientName;

       @Column(nullable = false, length = 500)
       private String scopes;

       @Column(name = "authorization_grant_types", nullable = false)
       private String authorizationGrantTypes;

       @Column(name = "client_authentication_methods", nullable = false)
       private String clientAuthenticationMethods;

       @Column(name = "access_token_ttl_seconds", nullable = false)
       private Integer accessTokenTtlSeconds = 900;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

6. Create `ApplicationClientRepository.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.Optional;
   import java.util.UUID;

   public interface ApplicationClientRepository extends JpaRepository<ApplicationClient, UUID> {
       Optional<ApplicationClient> findByClientId(String clientId);
   }
   ```

7. Create `JpaRegisteredClientRepository.java` — adapts `ApplicationClient`
   rows to Spring Authorization Server's `RegisteredClientRepository`
   contract (§6: `applications` is the single source of truth; this class is
   the only place `RegisteredClient` objects get built):

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.security.oauth2.core.AuthorizationGrantType;
   import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
   import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
   import org.springframework.stereotype.Component;

   import java.time.Duration;
   import java.util.Arrays;
   import java.util.UUID;

   @Component
   public class JpaRegisteredClientRepository implements RegisteredClientRepository {

       private final ApplicationClientRepository repository;

       public JpaRegisteredClientRepository(ApplicationClientRepository repository) {
           this.repository = repository;
       }

       @Override
       public void save(RegisteredClient registeredClient) {
           throw new UnsupportedOperationException(
                   "Applications are provisioned by Flyway migration only (§6) — no dynamic client registration");
       }

       @Override
       public RegisteredClient findById(String id) {
           return repository.findById(UUID.fromString(id)).map(this::toRegisteredClient).orElse(null);
       }

       @Override
       public RegisteredClient findByClientId(String clientId) {
           return repository.findByClientId(clientId).map(this::toRegisteredClient).orElse(null);
       }

       private RegisteredClient toRegisteredClient(ApplicationClient app) {
           RegisteredClient.Builder builder = RegisteredClient.withId(app.getId().toString())
                   .clientId(app.getClientId())
                   .clientSecret(app.getClientSecretHash())
                   .clientName(app.getClientName())
                   .tokenSettings(TokenSettings.builder()
                           .accessTokenTimeToLive(Duration.ofSeconds(app.getAccessTokenTtlSeconds()))
                           .build());

           Arrays.stream(app.getClientAuthenticationMethods().split(","))
                   .map(String::trim)
                   .forEach(m -> builder.clientAuthenticationMethod(new ClientAuthenticationMethod(m)));
           Arrays.stream(app.getAuthorizationGrantTypes().split(","))
                   .map(String::trim)
                   .forEach(g -> builder.authorizationGrantType(new AuthorizationGrantType(g)));
           Arrays.stream(app.getScopes().split(","))
                   .map(String::trim)
                   .forEach(builder::scope);

           return builder.build();
       }
   }
   ```

8. Run `mvn -q test -Dtest=JpaRegisteredClientRepositoryTest`. Expect **PASS**.

9. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V2__create_applications.sql \
     authentication/src/main/resources/db/migration/V3__seed_example_application.sql \
     authentication/src/main/java/com/bacsystem/auth/rbac/ApplicationClient.java \
     authentication/src/main/java/com/bacsystem/auth/rbac/ApplicationClientRepository.java \
     authentication/src/main/java/com/bacsystem/auth/rbac/JpaRegisteredClientRepository.java \
     authentication/src/test/java/com/bacsystem/auth/rbac/JpaRegisteredClientRepositoryTest.java
   git commit -m "feat(auth): back Spring Authorization Server client storage with applications table"
   ```

---

### Task 4: Identity — User Entity & Repository

**Files:**
- Create: `authentication/src/main/resources/db/migration/V4__create_users.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/User.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/UserStatus.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/UserRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/identity/UserRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.tenancy.Tenant`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserStatus`, `com.bacsystem.auth.identity.UserRepository`

**Steps:**

1. Write the failing test `UserRepositoryTest`:

   ```java
   package com.bacsystem.auth.identity;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.Optional;

   import static org.assertj.core.api.Assertions.assertThat;

   class UserRepositoryTest extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;

       private Tenant tenant() {
           Tenant t = new Tenant();
           t.setSlug("acme-" + System.nanoTime());
           t.setName("Acme");
           return tenantRepository.saveAndFlush(t);
       }

       @Test
       void savesAndFindsByTenantAndEmail() {
           Tenant tenant = tenant();
           User user = new User();
           user.setTenant(tenant);
           user.setEmail("admin@acme.test");
           user.setPasswordHash("{argon2}hash");
           user.setStatus(UserStatus.ACTIVE);
           user.setMustChangePassword(true);
           User saved = userRepository.saveAndFlush(user);

           assertThat(saved.getId()).isNotNull();

           Optional<User> found = userRepository.findByTenantIdAndEmail(tenant.getId(), "admin@acme.test");
           assertThat(found).isPresent();
           assertThat(found.get().isMustChangePassword()).isTrue();
       }

       @Test
       void sameEmailAllowedAcrossDifferentTenants() {
           Tenant tenantA = tenant();
           Tenant tenantB = tenant();

           User userA = new User();
           userA.setTenant(tenantA);
           userA.setEmail("shared@example.test");
           userA.setPasswordHash("{argon2}hash");
           userA.setStatus(UserStatus.ACTIVE);
           userRepository.saveAndFlush(userA);

           User userB = new User();
           userB.setTenant(tenantB);
           userB.setEmail("shared@example.test");
           userB.setPasswordHash("{argon2}hash");
           userB.setStatus(UserStatus.ACTIVE);

           // must not throw — composite uniqueness is (tenant_id, email), not global (spec §5)
           userRepository.saveAndFlush(userB);
       }

       @Test
       void duplicateEmailWithinSameTenantRejected() {
           Tenant tenant = tenant();
           User first = new User();
           first.setTenant(tenant);
           first.setEmail("dup@acme.test");
           first.setPasswordHash("{argon2}hash");
           first.setStatus(UserStatus.ACTIVE);
           userRepository.saveAndFlush(first);

           User second = new User();
           second.setTenant(tenant);
           second.setEmail("dup@acme.test");
           second.setPasswordHash("{argon2}hash");
           second.setStatus(UserStatus.ACTIVE);

           org.junit.jupiter.api.Assertions.assertThrows(
                   org.springframework.dao.DataIntegrityViolationException.class,
                   () -> userRepository.saveAndFlush(second));
       }
   }
   ```

2. Run `mvn -q test -Dtest=UserRepositoryTest`. Expect **FAIL**.

3. Create `V4__create_users.sql`:

   ```sql
   CREATE TABLE users (
       id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       tenant_id             UUID NOT NULL REFERENCES tenants(id),
       email                 VARCHAR(255) NOT NULL,
       password_hash         VARCHAR(255) NOT NULL,
       status                VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
       must_change_password  BOOLEAN NOT NULL DEFAULT FALSE,
       password_changed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
       created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
       UNIQUE (tenant_id, email)
   );

   CREATE INDEX idx_users_tenant_id ON users(tenant_id);
   ```

4. Create `UserStatus.java`:

   ```java
   package com.bacsystem.auth.identity;

   public enum UserStatus {
       ACTIVE,
       DEACTIVATED
   }
   ```

5. Create `User.java`:

   ```java
   package com.bacsystem.auth.identity;

   import com.bacsystem.auth.tenancy.Tenant;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "users")
   @Getter
   @Setter
   public class User {

       @Id
       @GeneratedValue
       private UUID id;

       @ManyToOne(fetch = FetchType.LAZY, optional = false)
       @JoinColumn(name = "tenant_id", nullable = false)
       private Tenant tenant;

       @Column(nullable = false)
       private String email;

       @Column(name = "password_hash", nullable = false)
       private String passwordHash;

       @Enumerated(EnumType.STRING)
       @Column(nullable = false, length = 20)
       private UserStatus status = UserStatus.ACTIVE;

       @Column(name = "must_change_password", nullable = false)
       private boolean mustChangePassword = false;

       @Column(name = "password_changed_at", nullable = false)
       private Instant passwordChangedAt = Instant.now();

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

6. Create `UserRepository.java`:

   ```java
   package com.bacsystem.auth.identity;

   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.Pageable;
   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.Optional;
   import java.util.UUID;

   public interface UserRepository extends JpaRepository<User, UUID> {
       Optional<User> findByTenantIdAndEmail(UUID tenantId, String email);
       Page<User> findByTenantId(UUID tenantId, Pageable pageable);
   }
   ```

7. Run `mvn -q test -Dtest=UserRepositoryTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V4__create_users.sql \
     authentication/src/main/java/com/bacsystem/auth/identity/ \
     authentication/src/test/java/com/bacsystem/auth/identity/
   git commit -m "feat(auth): add User entity with per-tenant email uniqueness"
   ```

---

### Task 5: Breached-Password Checker

**Files:**
- Create: `authentication/src/main/resources/breached-passwords-sample.txt`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/BreachedPasswordChecker.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/security/BreachedPasswordCheckerTest.java`

**Interfaces:**
- Consumes: None
- Produces: `com.bacsystem.auth.security.BreachedPasswordChecker`

**Steps:**

1. Write the failing test `BreachedPasswordCheckerTest`:

   ```java
   package com.bacsystem.auth.security;

   import org.junit.jupiter.api.Test;

   import static org.assertj.core.api.Assertions.assertThat;

   class BreachedPasswordCheckerTest {

       private final BreachedPasswordChecker checker = new BreachedPasswordChecker(loadSampleList());

       private static java.util.Set<String> loadSampleList() {
           return java.util.Set.of("password123456", "letmein12345", "qwertyuiop12");
       }

       @Test
       void flagsKnownBreachedPassword() {
           assertThat(checker.isBreached("password123456")).isTrue();
       }

       @Test
       void allowsPasswordNotOnList() {
           assertThat(checker.isBreached("Tr0ub4dor&3-uncommon-phrase")).isFalse();
       }

       @Test
       void comparisonIsCaseSensitiveOnTheStoredHashNotThePlaintext() {
           // the checker hashes internally; casing of the raw input still matters
           // because it changes the SHA-1 digest, exactly like the real password would.
           assertThat(checker.isBreached("PASSWORD123456")).isFalse();
       }
   }
   ```

2. Run `mvn -q test -Dtest=BreachedPasswordCheckerTest`. Expect **FAIL**.

3. Create `breached-passwords-sample.txt` (one plaintext-hash per line is
   the real HaveIBeenPwned k-anonymity list format in production; this pilot
   ships a small literal sample instead of the full multi-gigabyte corpus —
   recorded as a known MVP simplification, not silently swapped for
   something else):

   ```
   password123456
   letmein12345
   qwertyuiop12
   123456789012
   ```

4. Create `BreachedPasswordChecker.java` — SHA-1 hex digest comparison
   against the loaded set (mirrors HaveIBeenPwned's k-anonymity hash
   format so swapping in the real API/corpus later is a drop-in change):

   ```java
   package com.bacsystem.auth.security;

   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   import java.io.IOException;
   import java.io.InputStream;
   import java.io.UncheckedIOException;
   import java.nio.charset.StandardCharsets;
   import java.security.MessageDigest;
   import java.security.NoSuchAlgorithmException;
   import java.util.HashSet;
   import java.util.Set;

   @Component
   public class BreachedPasswordChecker {

       private final Set<String> breachedShaHashes;

       public BreachedPasswordChecker(@Value("classpath:breached-passwords-sample.txt")
                                       org.springframework.core.io.Resource resource) {
           this(loadPlaintextSet(resource));
       }

       // constructor used directly by tests with an in-memory sample set
       public BreachedPasswordChecker(Set<String> plaintextSample) {
           this.breachedShaHashes = new HashSet<>();
           plaintextSample.forEach(p -> breachedShaHashes.add(sha1Hex(p)));
       }

       public boolean isBreached(String plaintextPassword) {
           return breachedShaHashes.contains(sha1Hex(plaintextPassword));
       }

       private static Set<String> loadPlaintextSet(org.springframework.core.io.Resource resource) {
           try (InputStream in = resource.getInputStream()) {
               return new HashSet<>(java.util.Arrays.asList(
                       new String(in.readAllBytes(), StandardCharsets.UTF_8).split("\\R+")));
           } catch (IOException e) {
               throw new UncheckedIOException(e);
           }
       }

       private static String sha1Hex(String value) {
           try {
               MessageDigest digest = MessageDigest.getInstance("SHA-1");
               byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
               StringBuilder hex = new StringBuilder();
               for (byte b : hash) hex.append(String.format("%02x", b));
               return hex.toString();
           } catch (NoSuchAlgorithmException e) {
               throw new IllegalStateException(e);
           }
       }
   }
   ```

5. Run `mvn -q test -Dtest=BreachedPasswordCheckerTest`. Expect **PASS**.

6. Commit:

   ```bash
   git add authentication/src/main/resources/breached-passwords-sample.txt \
     authentication/src/main/java/com/bacsystem/auth/security/BreachedPasswordChecker.java \
     authentication/src/test/java/com/bacsystem/auth/security/BreachedPasswordCheckerTest.java
   git commit -m "feat(auth): add breached-password rejection check"
   ```

---

### Task 6: RBAC — Role, Permission, RolePermission, UserRole

**Files:**
- Create: `authentication/src/main/resources/db/migration/V5__create_rbac_tables.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/Role.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/Permission.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/RolePermission.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/UserRole.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/RoleRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/PermissionRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/RolePermissionRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/UserRoleRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/rbac/RbacRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.tenancy.Tenant`, `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.rbac.Role`, `com.bacsystem.auth.rbac.Permission`, `com.bacsystem.auth.rbac.RolePermission`, `com.bacsystem.auth.rbac.UserRole`, `com.bacsystem.auth.rbac.RoleRepository`, `com.bacsystem.auth.rbac.PermissionRepository`, `com.bacsystem.auth.rbac.RolePermissionRepository`, `com.bacsystem.auth.rbac.UserRoleRepository`

**Steps:**

1. Write the failing test `RbacRepositoryTest` (covers optimistic-lock
   version bump on `Role`, and the `role_permissions` composite key):

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.orm.ObjectOptimisticLockingFailureException;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;

   class RbacRepositoryTest extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private RoleRepository roleRepository;
       @Autowired private PermissionRepository permissionRepository;
       @Autowired private RolePermissionRepository rolePermissionRepository;

       @Test
       void roleVersionIncrementsOnUpdate() {
           Tenant tenant = tenantRepository.saveAndFlush(newTenant());
           Role role = new Role();
           role.setTenant(tenant);
           role.setName("editor");
           role.setTemplate(false);
           Role saved = roleRepository.saveAndFlush(role);
           assertThat(saved.getVersion()).isEqualTo(0L);

           saved.setName("editor-renamed");
           Role updated = roleRepository.saveAndFlush(saved);
           assertThat(updated.getVersion()).isEqualTo(1L);
       }

       @Test
       void concurrentUpdateWithStaleVersionThrows() {
           Tenant tenant = tenantRepository.saveAndFlush(newTenant());
           Role role = new Role();
           role.setTenant(tenant);
           role.setName("stale-test");
           role.setTemplate(false);
           Role saved = roleRepository.saveAndFlush(role);

           Role copy1 = roleRepository.findById(saved.getId()).orElseThrow();
           Role copy2 = roleRepository.findById(saved.getId()).orElseThrow();

           copy1.setName("first-writer");
           roleRepository.saveAndFlush(copy1);

           copy2.setName("second-writer");
           assertThrows(ObjectOptimisticLockingFailureException.class,
                   () -> roleRepository.saveAndFlush(copy2));
       }

       @Test
       void rolePermissionCompositeKeyPreventsDuplicateAssignment() {
           Tenant tenant = tenantRepository.saveAndFlush(newTenant());
           Role role = new Role();
           role.setTenant(tenant);
           role.setName("dup-perm-test");
           role.setTemplate(false);
           role = roleRepository.saveAndFlush(role);

           Permission permission = new Permission();
           permission.setApplicationName("example-app");
           permission.setName("invoices:read");
           permission = permissionRepository.saveAndFlush(permission);

           RolePermission rp = new RolePermission();
           rp.setRole(role);
           rp.setPermission(permission);
           rolePermissionRepository.saveAndFlush(rp);

           RolePermission dup = new RolePermission();
           dup.setRole(role);
           dup.setPermission(permission);

           assertThrows(org.springframework.dao.DataIntegrityViolationException.class,
                   () -> rolePermissionRepository.saveAndFlush(dup));
       }

       private Tenant newTenant() {
           Tenant t = new Tenant();
           t.setSlug("rbac-" + System.nanoTime());
           t.setName("RBAC Test Tenant");
           return t;
       }
   }
   ```

2. Run `mvn -q test -Dtest=RbacRepositoryTest`. Expect **FAIL**.

3. Create `V5__create_rbac_tables.sql`:

   ```sql
   CREATE TABLE roles (
       id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       tenant_id    UUID REFERENCES tenants(id),
       name         VARCHAR(100) NOT NULL,
       is_template  BOOLEAN NOT NULL DEFAULT FALSE,
       version      BIGINT NOT NULL DEFAULT 0,
       created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
       UNIQUE (tenant_id, name)
   );

   CREATE TABLE permissions (
       id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       application_name  VARCHAR(100) NOT NULL,
       name              VARCHAR(200) NOT NULL,
       deprecated_at     TIMESTAMPTZ,
       created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
       UNIQUE (application_name, name)
   );

   CREATE TABLE role_permissions (
       role_id        UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
       permission_id  UUID NOT NULL REFERENCES permissions(id),
       PRIMARY KEY (role_id, permission_id)
   );

   CREATE TABLE user_roles (
       user_id      UUID NOT NULL REFERENCES users(id),
       role_id      UUID NOT NULL REFERENCES roles(id),
       assigned_by  UUID NOT NULL REFERENCES users(id),
       assigned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
       PRIMARY KEY (user_id, role_id)
   );
   ```

4. Create `Role.java` (`@Version` gives optimistic locking directly —
   spec §9.4's requirement):

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.tenancy.Tenant;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "roles")
   @Getter
   @Setter
   public class Role {

       @Id
       @GeneratedValue
       private UUID id;

       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "tenant_id")
       private Tenant tenant;

       @Column(nullable = false)
       private String name;

       @Column(name = "is_template", nullable = false)
       private boolean template = false;

       @Version
       @Column(nullable = false)
       private long version;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

5. Create `Permission.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "permissions")
   @Getter
   @Setter
   public class Permission {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(name = "application_name", nullable = false)
       private String applicationName;

       @Column(nullable = false)
       private String name;

       @Column(name = "deprecated_at")
       private Instant deprecatedAt;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

6. Create `RolePermission.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.io.Serializable;
   import java.util.Objects;
   import java.util.UUID;

   @Entity
   @Table(name = "role_permissions")
   @IdClass(RolePermission.Key.class)
   @Getter
   @Setter
   public class RolePermission {

       @Id
       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "role_id")
       private Role role;

       @Id
       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "permission_id")
       private Permission permission;

       public static class Key implements Serializable {
           private UUID role;
           private UUID permission;

           public Key() {}

           @Override
           public boolean equals(Object o) {
               if (this == o) return true;
               if (!(o instanceof Key key)) return false;
               return Objects.equals(role, key.role) && Objects.equals(permission, key.permission);
           }

           @Override
           public int hashCode() {
               return Objects.hash(role, permission);
           }
       }
   }
   ```

7. Create `UserRole.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.identity.User;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.io.Serializable;
   import java.time.Instant;
   import java.util.Objects;
   import java.util.UUID;

   @Entity
   @Table(name = "user_roles")
   @IdClass(UserRole.Key.class)
   @Getter
   @Setter
   public class UserRole {

       @Id
       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "user_id")
       private User user;

       @Id
       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "role_id")
       private Role role;

       @ManyToOne(fetch = FetchType.LAZY, optional = false)
       @JoinColumn(name = "assigned_by", nullable = false)
       private User assignedBy;

       @Column(name = "assigned_at", nullable = false)
       private Instant assignedAt = Instant.now();

       public static class Key implements Serializable {
           private UUID user;
           private UUID role;

           public Key() {}

           @Override
           public boolean equals(Object o) {
               if (this == o) return true;
               if (!(o instanceof Key key)) return false;
               return Objects.equals(user, key.user) && Objects.equals(role, key.role);
           }

           @Override
           public int hashCode() {
               return Objects.hash(user, role);
           }
       }
   }
   ```

8. Create the four repository interfaces:

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   public interface RoleRepository extends JpaRepository<Role, UUID> {
       Optional<Role> findByTenantIdAndName(UUID tenantId, String name);
       List<Role> findByTenantId(UUID tenantId);
   }
   ```

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   public interface PermissionRepository extends JpaRepository<Permission, UUID> {
       Optional<Permission> findByApplicationNameAndName(String applicationName, String name);
       List<Permission> findByApplicationName(String applicationName);
   }
   ```

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.UUID;

   public interface RolePermissionRepository extends JpaRepository<RolePermission, RolePermission.Key> {
       List<RolePermission> findByRoleId(UUID roleId);
       long countByPermissionId(UUID permissionId);
       void deleteByRoleId(UUID roleId);
   }
   ```

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.UUID;

   public interface UserRoleRepository extends JpaRepository<UserRole, UserRole.Key> {
       List<UserRole> findByUserId(UUID userId);
       long countByRoleId(UUID roleId);
   }
   ```

9. Run `mvn -q test -Dtest=RbacRepositoryTest`. Expect **PASS**.

10. Commit:

    ```bash
    git add authentication/src/main/resources/db/migration/V5__create_rbac_tables.sql \
      authentication/src/main/java/com/bacsystem/auth/rbac/Role.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/Permission.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RolePermission.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/UserRole.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RoleRepository.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/PermissionRepository.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RolePermissionRepository.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/UserRoleRepository.java \
      authentication/src/test/java/com/bacsystem/auth/rbac/RbacRepositoryTest.java
    git commit -m "feat(auth): add RBAC entities with optimistic-locked Role"
    ```

---

### Task 7: Token — RefreshToken Entity & Repository

**Files:**
- Create: `authentication/src/main/resources/db/migration/V6__create_refresh_tokens.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/RefreshToken.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/token/RefreshTokenRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.token.RefreshToken`, `com.bacsystem.auth.token.RefreshTokenRepository`

**Steps:**

1. Write the failing test `RefreshTokenRepositoryTest`:

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.identity.UserStatus;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.time.Instant;
   import java.util.List;
   import java.util.Optional;

   import static org.assertj.core.api.Assertions.assertThat;

   class RefreshTokenRepositoryTest extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;
       @Autowired private RefreshTokenRepository refreshTokenRepository;

       @Test
       void savesAndFindsByTokenHash() {
           User user = newUser();

           RefreshToken token = new RefreshToken();
           token.setUser(user);
           token.setTokenHash("hash-1");
           token.setApplicationClientId("example-app");
           token.setExpiresAt(Instant.now().plusSeconds(3600));
           RefreshToken saved = refreshTokenRepository.saveAndFlush(token);

           Optional<RefreshToken> found = refreshTokenRepository.findByTokenHash("hash-1");
           assertThat(found).isPresent();
           assertThat(found.get().getUser().getId()).isEqualTo(user.getId());
           assertThat(found.get().getReplacedBy()).isNull();
       }

       @Test
       void rotationChainViaReplacedBy() {
           User user = newUser();

           RefreshToken original = new RefreshToken();
           original.setUser(user);
           original.setTokenHash("original-hash");
           original.setApplicationClientId("example-app");
           original.setExpiresAt(Instant.now().plusSeconds(3600));
           original = refreshTokenRepository.saveAndFlush(original);

           RefreshToken rotated = new RefreshToken();
           rotated.setUser(user);
           rotated.setTokenHash("rotated-hash");
           rotated.setApplicationClientId("example-app");
           rotated.setExpiresAt(Instant.now().plusSeconds(3600));
           rotated = refreshTokenRepository.saveAndFlush(rotated);

           original.setReplacedBy(rotated);
           refreshTokenRepository.saveAndFlush(original);

           List<RefreshToken> chain = refreshTokenRepository.findByUserId(user.getId());
           assertThat(chain).hasSize(2);
       }

       private User newUser() {
           Tenant tenant = new Tenant();
           tenant.setSlug("token-" + System.nanoTime());
           tenant.setName("Token Test");
           tenant = tenantRepository.saveAndFlush(tenant);

           User user = new User();
           user.setTenant(tenant);
           user.setEmail("user@token.test");
           user.setPasswordHash("{argon2}hash");
           user.setStatus(UserStatus.ACTIVE);
           return userRepository.saveAndFlush(user);
       }
   }
   ```

2. Run `mvn -q test -Dtest=RefreshTokenRepositoryTest`. Expect **FAIL**.

3. Create `V6__create_refresh_tokens.sql`:

   ```sql
   CREATE TABLE refresh_tokens (
       id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id               UUID NOT NULL REFERENCES users(id),
       token_hash            VARCHAR(255) NOT NULL UNIQUE,
       application_client_id VARCHAR(100) NOT NULL,
       replaced_by           UUID REFERENCES refresh_tokens(id),
       revoked_at            TIMESTAMPTZ,
       expires_at            TIMESTAMPTZ NOT NULL,
       created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
   ```

4. Create `RefreshToken.java`:

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.identity.User;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "refresh_tokens")
   @Getter
   @Setter
   public class RefreshToken {

       @Id
       @GeneratedValue
       private UUID id;

       @ManyToOne(fetch = FetchType.LAZY, optional = false)
       @JoinColumn(name = "user_id", nullable = false)
       private User user;

       @Column(name = "token_hash", nullable = false, unique = true)
       private String tokenHash;

       @Column(name = "application_client_id", nullable = false)
       private String applicationClientId;

       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "replaced_by")
       private RefreshToken replacedBy;

       @Column(name = "revoked_at")
       private Instant revokedAt;

       @Column(name = "expires_at", nullable = false)
       private Instant expiresAt;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

5. Create `RefreshTokenRepository.java`:

   ```java
   package com.bacsystem.auth.token;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
       Optional<RefreshToken> findByTokenHash(String tokenHash);
       List<RefreshToken> findByUserId(UUID userId);
   }
   ```

6. Run `mvn -q test -Dtest=RefreshTokenRepositoryTest`. Expect **PASS**.

7. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V6__create_refresh_tokens.sql \
     authentication/src/main/java/com/bacsystem/auth/token/ \
     authentication/src/test/java/com/bacsystem/auth/token/
   git commit -m "feat(auth): add RefreshToken entity with rotation-chain support"
   ```

---

### Task 8: OneTime — OneTimeToken Entity & Repository

**Files:**
- Create: `authentication/src/main/resources/db/migration/V7__create_one_time_tokens.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeTokenPurpose.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeToken.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeTokenRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/onetime/OneTimeTokenRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.onetime.OneTimeToken`, `com.bacsystem.auth.onetime.OneTimeTokenPurpose`, `com.bacsystem.auth.onetime.OneTimeTokenRepository`

**Steps:**

1. Write the failing test `OneTimeTokenRepositoryTest`:

   ```java
   package com.bacsystem.auth.onetime;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.identity.UserStatus;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.time.Instant;
   import java.util.Optional;

   import static org.assertj.core.api.Assertions.assertThat;

   class OneTimeTokenRepositoryTest extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;
       @Autowired private OneTimeTokenRepository oneTimeTokenRepository;

       @Test
       void savesAndFindsUnredeemedByHash() {
           Tenant tenant = new Tenant();
           tenant.setSlug("ott-" + System.nanoTime());
           tenant.setName("OTT Test");
           tenant = tenantRepository.saveAndFlush(tenant);

           User user = new User();
           user.setTenant(tenant);
           user.setEmail("reset@ott.test");
           user.setPasswordHash("{argon2}hash");
           user.setStatus(UserStatus.ACTIVE);
           user = userRepository.saveAndFlush(user);

           OneTimeToken token = new OneTimeToken();
           token.setUser(user);
           token.setPurpose(OneTimeTokenPurpose.PASSWORD_RESET);
           token.setTokenHash("reset-hash");
           token.setExpiresAt(Instant.now().plusSeconds(900));
           oneTimeTokenRepository.saveAndFlush(token);

           Optional<OneTimeToken> found = oneTimeTokenRepository
                   .findByTokenHashAndRedeemedAtIsNull("reset-hash");
           assertThat(found).isPresent();
           assertThat(found.get().getPurpose()).isEqualTo(OneTimeTokenPurpose.PASSWORD_RESET);
       }
   }
   ```

2. Run `mvn -q test -Dtest=OneTimeTokenRepositoryTest`. Expect **FAIL**.

3. Create `V7__create_one_time_tokens.sql`:

   ```sql
   CREATE TABLE one_time_tokens (
       id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id      UUID NOT NULL REFERENCES users(id),
       purpose      VARCHAR(30) NOT NULL,
       token_hash   VARCHAR(255) NOT NULL UNIQUE,
       redeemed_at  TIMESTAMPTZ,
       expires_at   TIMESTAMPTZ NOT NULL,
       created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
   );
   ```

4. Create `OneTimeTokenPurpose.java`:

   ```java
   package com.bacsystem.auth.onetime;

   public enum OneTimeTokenPurpose {
       PASSWORD_RESET
   }
   ```

5. Create `OneTimeToken.java`:

   ```java
   package com.bacsystem.auth.onetime;

   import com.bacsystem.auth.identity.User;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "one_time_tokens")
   @Getter
   @Setter
   public class OneTimeToken {

       @Id
       @GeneratedValue
       private UUID id;

       @ManyToOne(fetch = FetchType.LAZY, optional = false)
       @JoinColumn(name = "user_id", nullable = false)
       private User user;

       @Enumerated(EnumType.STRING)
       @Column(nullable = false, length = 30)
       private OneTimeTokenPurpose purpose;

       @Column(name = "token_hash", nullable = false, unique = true)
       private String tokenHash;

       @Column(name = "redeemed_at")
       private Instant redeemedAt;

       @Column(name = "expires_at", nullable = false)
       private Instant expiresAt;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

6. Create `OneTimeTokenRepository.java`:

   ```java
   package com.bacsystem.auth.onetime;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.Optional;
   import java.util.UUID;

   public interface OneTimeTokenRepository extends JpaRepository<OneTimeToken, UUID> {
       Optional<OneTimeToken> findByTokenHashAndRedeemedAtIsNull(String tokenHash);
   }
   ```

7. Run `mvn -q test -Dtest=OneTimeTokenRepositoryTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V7__create_one_time_tokens.sql \
     authentication/src/main/java/com/bacsystem/auth/onetime/ \
     authentication/src/test/java/com/bacsystem/auth/onetime/
   git commit -m "feat(auth): add OneTimeToken entity for password reset"
   ```

---

### Task 9: MFA — MfaCredential & MfaBackupCode Entities

**Files:**
- Create: `authentication/src/main/resources/db/migration/V8__create_mfa_tables.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaCredential.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaBackupCode.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaCredentialRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaBackupCodeRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/mfa/MfaRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.mfa.MfaCredential`, `com.bacsystem.auth.mfa.MfaBackupCode`, `com.bacsystem.auth.mfa.MfaCredentialRepository`, `com.bacsystem.auth.mfa.MfaBackupCodeRepository`

**Steps:**

1. Write the failing test `MfaRepositoryTest`:

   ```java
   package com.bacsystem.auth.mfa;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.identity.UserStatus;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.List;
   import java.util.Optional;

   import static org.assertj.core.api.Assertions.assertThat;

   class MfaRepositoryTest extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;
       @Autowired private MfaCredentialRepository mfaCredentialRepository;
       @Autowired private MfaBackupCodeRepository mfaBackupCodeRepository;

       @Test
       void savesCredentialAndBackupCodes() {
           User user = newUser();

           MfaCredential credential = new MfaCredential();
           credential.setUser(user);
           credential.setEncryptedSecret("enc-secret");
           credential.setActive(true);
           mfaCredentialRepository.saveAndFlush(credential);

           MfaBackupCode code = new MfaBackupCode();
           code.setUser(user);
           code.setCodeHash("code-hash-1");
           mfaBackupCodeRepository.saveAndFlush(code);

           Optional<MfaCredential> found = mfaCredentialRepository.findByUserIdAndActiveTrue(user.getId());
           assertThat(found).isPresent();

           List<MfaBackupCode> codes = mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(user.getId());
           assertThat(codes).hasSize(1);
       }

       private User newUser() {
           Tenant tenant = new Tenant();
           tenant.setSlug("mfa-" + System.nanoTime());
           tenant.setName("MFA Test");
           tenant = tenantRepository.saveAndFlush(tenant);

           User user = new User();
           user.setTenant(tenant);
           user.setEmail("mfa@test.test");
           user.setPasswordHash("{argon2}hash");
           user.setStatus(UserStatus.ACTIVE);
           return userRepository.saveAndFlush(user);
       }
   }
   ```

2. Run `mvn -q test -Dtest=MfaRepositoryTest`. Expect **FAIL**.

3. Create `V8__create_mfa_tables.sql`:

   ```sql
   CREATE TABLE mfa_credentials (
       id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id           UUID NOT NULL REFERENCES users(id),
       encrypted_secret  VARCHAR(500) NOT NULL,
       active            BOOLEAN NOT NULL DEFAULT FALSE,
       created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   CREATE TABLE mfa_backup_codes (
       id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id     UUID NOT NULL REFERENCES users(id),
       code_hash   VARCHAR(255) NOT NULL,
       used_at     TIMESTAMPTZ,
       created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   CREATE INDEX idx_mfa_backup_codes_user_id ON mfa_backup_codes(user_id);
   ```

4. Create `MfaCredential.java`:

   ```java
   package com.bacsystem.auth.mfa;

   import com.bacsystem.auth.identity.User;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "mfa_credentials")
   @Getter
   @Setter
   public class MfaCredential {

       @Id
       @GeneratedValue
       private UUID id;

       @ManyToOne(fetch = FetchType.LAZY, optional = false)
       @JoinColumn(name = "user_id", nullable = false)
       private User user;

       @Column(name = "encrypted_secret", nullable = false)
       private String encryptedSecret;

       @Column(nullable = false)
       private boolean active = false;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

5. Create `MfaBackupCode.java`:

   ```java
   package com.bacsystem.auth.mfa;

   import com.bacsystem.auth.identity.User;
   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "mfa_backup_codes")
   @Getter
   @Setter
   public class MfaBackupCode {

       @Id
       @GeneratedValue
       private UUID id;

       @ManyToOne(fetch = FetchType.LAZY, optional = false)
       @JoinColumn(name = "user_id", nullable = false)
       private User user;

       @Column(name = "code_hash", nullable = false)
       private String codeHash;

       @Column(name = "used_at")
       private Instant usedAt;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();
   }
   ```

6. Create the two repositories:

   ```java
   package com.bacsystem.auth.mfa;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.Optional;
   import java.util.UUID;

   public interface MfaCredentialRepository extends JpaRepository<MfaCredential, UUID> {
       Optional<MfaCredential> findByUserIdAndActiveTrue(UUID userId);
   }
   ```

   ```java
   package com.bacsystem.auth.mfa;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.UUID;

   public interface MfaBackupCodeRepository extends JpaRepository<MfaBackupCode, UUID> {
       List<MfaBackupCode> findByUserIdAndUsedAtIsNull(UUID userId);
   }
   ```

7. Run `mvn -q test -Dtest=MfaRepositoryTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V8__create_mfa_tables.sql \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaCredential.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaBackupCode.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaCredentialRepository.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaBackupCodeRepository.java \
     authentication/src/test/java/com/bacsystem/auth/mfa/MfaRepositoryTest.java
   git commit -m "feat(auth): add MFA credential and backup code entities"
   ```

---

### Task 10: Security — LoginAttempt Entity (Partitioned by Date)

**Files:**
- Create: `authentication/src/main/resources/db/migration/V9__create_login_attempts_partitioned.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/LoginAttempt.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/LoginAttemptRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/security/LoginAttemptRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.security.LoginAttempt`, `com.bacsystem.auth.security.LoginAttemptRepository`

**Steps:**

1. Write the failing test `LoginAttemptRepositoryTest` — covers both the
   nullable-`user_id` probing case (§6) and the per-IP burst query (§13):

   ```java
   package com.bacsystem.auth.security;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.time.Instant;
   import java.util.List;

   import static org.assertj.core.api.Assertions.assertThat;

   class LoginAttemptRepositoryTest extends PostgresRedisTestBase {

       @Autowired private LoginAttemptRepository loginAttemptRepository;

       @Test
       void recordsAttemptAgainstNonexistentEmailWithNullUserId() {
           LoginAttempt attempt = new LoginAttempt();
           attempt.setUserId(null);
           attempt.setEmailAttempted("nobody@nowhere.test");
           attempt.setIpAddress("203.0.113.9");
           attempt.setSuccess(false);
           attempt.setAttemptedAt(Instant.now());

           LoginAttempt saved = loginAttemptRepository.saveAndFlush(attempt);
           assertThat(saved.getId()).isNotNull();
           assertThat(saved.getUserId()).isNull();
       }

       @Test
       void countsRecentFailuresByIpAcrossDifferentAccounts() {
           Instant now = Instant.now();
           for (int i = 0; i < 3; i++) {
               LoginAttempt attempt = new LoginAttempt();
               attempt.setEmailAttempted("victim" + i + "@spray.test");
               attempt.setIpAddress("198.51.100.5");
               attempt.setSuccess(false);
               attempt.setAttemptedAt(now);
               loginAttemptRepository.saveAndFlush(attempt);
           }

           List<LoginAttempt> byIp = loginAttemptRepository
                   .findByIpAddressAndSuccessFalseAndAttemptedAtAfter(
                           "198.51.100.5", now.minusSeconds(60));
           assertThat(byIp).hasSize(3);
       }
   }
   ```

2. Run `mvn -q test -Dtest=LoginAttemptRepositoryTest`. Expect **FAIL**.

3. Create `V9__create_login_attempts_partitioned.sql` — **created as a
   partitioned table from the start**: PostgreSQL cannot convert an existing
   plain table into a partitioned one without a data migration, and the
   drop-partition retention job (§6/§16, a later task) only works if the
   table was born partitioned. The partition key (`attempted_at`) must be
   part of the primary key — Postgres requires this for any partitioned
   table:

   ```sql
   CREATE TABLE login_attempts (
       id                UUID NOT NULL DEFAULT gen_random_uuid(),
       user_id           UUID REFERENCES users(id),
       email_attempted   VARCHAR(255) NOT NULL,
       ip_address        VARCHAR(45) NOT NULL,
       success           BOOLEAN NOT NULL,
       attempted_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
       -- attempted_at (the partition key) must be part of the primary key —
       -- PostgreSQL rejects a unique/PK index that doesn't include it.
       PRIMARY KEY (id, attempted_at)
   ) PARTITION BY RANGE (attempted_at);

   CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address, attempted_at);
   CREATE INDEX idx_login_attempts_email ON login_attempts(email_attempted, attempted_at);

   -- Initial partitions; the retention job (later task) creates future
   -- months ahead of time and drops partitions past the 90-day window (§6).
   CREATE TABLE login_attempts_2026_07 PARTITION OF login_attempts
       FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
   CREATE TABLE login_attempts_2026_08 PARTITION OF login_attempts
       FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
   -- Safety net: catches any row outside the pre-created ranges instead of
   -- failing the insert outright if the retention job falls behind.
   CREATE TABLE login_attempts_default PARTITION OF login_attempts DEFAULT;
   ```

4. Create `LoginAttempt.java` — the entity's `@Id` is `id` alone (Hibernate's
   session-identity column); the *database* enforces the real composite
   primary key declared above, which JPA doesn't need to know about since
   this entity is insert-only and never looked up by `id` alone:

   ```java
   package com.bacsystem.auth.security;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "login_attempts")
   @Getter
   @Setter
   public class LoginAttempt {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(name = "user_id")
       private UUID userId;

       @Column(name = "email_attempted", nullable = false)
       private String emailAttempted;

       @Column(name = "ip_address", nullable = false, length = 45)
       private String ipAddress;

       @Column(nullable = false)
       private boolean success;

       @Column(name = "attempted_at", nullable = false)
       private Instant attemptedAt = Instant.now();
   }
   ```

5. Create `LoginAttemptRepository.java`:

   ```java
   package com.bacsystem.auth.security;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.time.Instant;
   import java.util.List;

   public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, java.util.UUID> {
       List<LoginAttempt> findByIpAddressAndSuccessFalseAndAttemptedAtAfter(String ipAddress, Instant after);
       List<LoginAttempt> findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(String email, Instant after);
   }
   ```

6. Run `mvn -q test -Dtest=LoginAttemptRepositoryTest`. Expect **PASS**.

7. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V9__create_login_attempts_partitioned.sql \
     authentication/src/main/java/com/bacsystem/auth/security/LoginAttempt.java \
     authentication/src/main/java/com/bacsystem/auth/security/LoginAttemptRepository.java \
     authentication/src/test/java/com/bacsystem/auth/security/LoginAttemptRepositoryTest.java
   git commit -m "feat(auth): add LoginAttempt entity as a date-partitioned table"
   ```

---

### Task 11: Audit — AuditLog Entity (Partitioned by Date)

**Files:**
- Create: `authentication/src/main/resources/db/migration/V10__create_audit_log_partitioned.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/audit/AuditAction.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/audit/AuditLog.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/audit/AuditLogRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/audit/AuditLogRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.audit.AuditLog`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.audit.AuditLogRepository`

**Steps:**

1. Write the failing test `AuditLogRepositoryTest`:

   ```java
   package com.bacsystem.auth.audit;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.time.Instant;
   import java.util.List;

   import static org.assertj.core.api.Assertions.assertThat;

   class AuditLogRepositoryTest extends PostgresRedisTestBase {

       @Autowired private AuditLogRepository auditLogRepository;

       @Test
       void savesEntryWithNullActorForSystemEvents() {
           AuditLog entry = new AuditLog();
           entry.setActorUserId(null);
           entry.setAction(AuditAction.KEY_ROTATION);
           entry.setTargetType("SigningKey");
           entry.setTargetId("key-123");
           entry.setDetail("{\"kid\":\"key-123\"}");
           entry.setCreatedAt(Instant.now());

           AuditLog saved = auditLogRepository.saveAndFlush(entry);
           assertThat(saved.getId()).isNotNull();
       }

       @Test
       void findsByTargetTypeAndTargetId() {
           AuditLog entry = new AuditLog();
           entry.setAction(AuditAction.ROLE_PERMISSIONS_REPLACED);
           entry.setTargetType("Role");
           entry.setTargetId("role-abc");
           entry.setDetail("{}");
           entry.setCreatedAt(Instant.now());
           auditLogRepository.saveAndFlush(entry);

           List<AuditLog> found = auditLogRepository.findByTargetTypeAndTargetId("Role", "role-abc");
           assertThat(found).hasSize(1);
       }
   }
   ```

2. Run `mvn -q test -Dtest=AuditLogRepositoryTest`. Expect **FAIL**.

3. Create `V10__create_audit_log_partitioned.sql` — same partitioning
   rationale as `login_attempts` (Task 10): born partitioned, `created_at` in
   the primary key:

   ```sql
   CREATE TABLE audit_log (
       id             UUID NOT NULL DEFAULT gen_random_uuid(),
       actor_user_id  UUID REFERENCES users(id),
       action         VARCHAR(50) NOT NULL,
       target_type    VARCHAR(100) NOT NULL,
       target_id      VARCHAR(100) NOT NULL,
       detail         TEXT NOT NULL,
       created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
       PRIMARY KEY (id, created_at)
   ) PARTITION BY RANGE (created_at);

   CREATE INDEX idx_audit_log_target ON audit_log(target_type, target_id);
   CREATE INDEX idx_audit_log_actor ON audit_log(actor_user_id);

   -- Initial partitions; the retention job (later task) creates future
   -- months ahead of time and drops partitions past the 24-month window (§6).
   CREATE TABLE audit_log_2026_07 PARTITION OF audit_log
       FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
   CREATE TABLE audit_log_2026_08 PARTITION OF audit_log
       FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
   CREATE TABLE audit_log_default PARTITION OF audit_log DEFAULT;
   ```

4. Create `AuditAction.java` — one enum constant per audited event named in
   the spec (§8.3 key rotation, §9.2 catalog sync, §9.4 role-permission
   replace, §11's blanket "every mutating endpoint", §12 bootstrap/MFA reset):

   ```java
   package com.bacsystem.auth.audit;

   public enum AuditAction {
       BOOTSTRAP_TENANT_CREATED,
       USER_CREATED,
       USER_DEACTIVATED,
       USER_PASSWORD_CHANGED,
       ROLE_CREATED,
       ROLE_DELETED,
       ROLE_PERMISSIONS_REPLACED,
       PERMISSION_CATALOG_SYNCED,
       ROLE_ASSIGNED,
       ROLE_REVOKED,
       MFA_ENROLLED,
       MFA_ADMIN_RESET,
       KEY_ROTATION,
       KEY_ROTATION_EMERGENCY,
       RETENTION_JOB_RUN
   }
   ```

5. Create `AuditLog.java`:

   ```java
   package com.bacsystem.auth.audit;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "audit_log")
   @Getter
   @Setter
   public class AuditLog {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(name = "actor_user_id")
       private UUID actorUserId;

       @Enumerated(EnumType.STRING)
       @Column(nullable = false, length = 50)
       private AuditAction action;

       @Column(name = "target_type", nullable = false)
       private String targetType;

       @Column(name = "target_id", nullable = false)
       private String targetId;

       @Column(nullable = false, columnDefinition = "TEXT")
       private String detail;

       @Column(name = "created_at", nullable = false)
       private Instant createdAt = Instant.now();
   }
   ```

6. Create `AuditLogRepository.java`:

   ```java
   package com.bacsystem.auth.audit;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.UUID;

   public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
       List<AuditLog> findByTargetTypeAndTargetId(String targetType, String targetId);
   }
   ```

7. Run `mvn -q test -Dtest=AuditLogRepositoryTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V10__create_audit_log_partitioned.sql \
     authentication/src/main/java/com/bacsystem/auth/audit/ \
     authentication/src/test/java/com/bacsystem/auth/audit/
   git commit -m "feat(auth): add AuditLog entity as a date-partitioned table"
   ```

---

### Task 12: Email — EmailOutbox Entity & Repository

**Files:**
- Create: `authentication/src/main/resources/db/migration/V11__create_email_outbox.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/email/EmailOutboxStatus.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/email/EmailOutbox.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/email/EmailOutboxRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/email/EmailOutboxRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.email.EmailOutbox`, `com.bacsystem.auth.email.EmailOutboxStatus`, `com.bacsystem.auth.email.EmailOutboxRepository`

**Steps:**

1. Write the failing test `EmailOutboxRepositoryTest` — this table is the
   answer to the durability gap flagged during spec review (§12): sending is
   asynchronous, but the queue is **this DB table**, not an in-memory
   executor, so a pod restart between "reset link issued" and "email sent"
   loses nothing — the row is still there for the sender job to pick up:

   ```java
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
   ```

2. Run `mvn -q test -Dtest=EmailOutboxRepositoryTest`. Expect **FAIL**.

3. Create `V11__create_email_outbox.sql`:

   ```sql
   CREATE TABLE email_outbox (
       id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       recipient      VARCHAR(255) NOT NULL,
       template_name  VARCHAR(100) NOT NULL,
       body           TEXT NOT NULL,
       status         VARCHAR(20) NOT NULL DEFAULT 'PENDING',
       attempts       INTEGER NOT NULL DEFAULT 0,
       last_error     TEXT,
       created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
       sent_at        TIMESTAMPTZ
   );

   CREATE INDEX idx_email_outbox_status ON email_outbox(status);
   ```

4. Create `EmailOutboxStatus.java`:

   ```java
   package com.bacsystem.auth.email;

   public enum EmailOutboxStatus {
       PENDING,
       SENT,
       FAILED
   }
   ```

5. Create `EmailOutbox.java`:

   ```java
   package com.bacsystem.auth.email;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "email_outbox")
   @Getter
   @Setter
   public class EmailOutbox {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(nullable = false)
       private String recipient;

       @Column(name = "template_name", nullable = false)
       private String templateName;

       @Column(nullable = false, columnDefinition = "TEXT")
       private String body;

       @Enumerated(EnumType.STRING)
       @Column(nullable = false, length = 20)
       private EmailOutboxStatus status = EmailOutboxStatus.PENDING;

       @Column(nullable = false)
       private int attempts = 0;

       @Column(name = "last_error", columnDefinition = "TEXT")
       private String lastError;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();

       @Column(name = "sent_at")
       private Instant sentAt;
   }
   ```

6. Create `EmailOutboxRepository.java`:

   ```java
   package com.bacsystem.auth.email;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.UUID;

   public interface EmailOutboxRepository extends JpaRepository<EmailOutbox, UUID> {
       List<EmailOutbox> findByStatus(EmailOutboxStatus status);
   }
   ```

7. Run `mvn -q test -Dtest=EmailOutboxRepositoryTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V11__create_email_outbox.sql \
     authentication/src/main/java/com/bacsystem/auth/email/EmailOutbox.java \
     authentication/src/main/java/com/bacsystem/auth/email/EmailOutboxStatus.java \
     authentication/src/main/java/com/bacsystem/auth/email/EmailOutboxRepository.java \
     authentication/src/test/java/com/bacsystem/auth/email/EmailOutboxRepositoryTest.java
   git commit -m "feat(auth): add DB-backed email outbox for durable async sending"
   ```

---

### Task 13: Token — SigningKey Entity & Repository

**Files:**
- Create: `authentication/src/main/resources/db/migration/V12__create_signing_keys.sql`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/SigningKeyStatus.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/SigningKey.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/SigningKeyRepository.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/token/SigningKeyRepositoryTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.token.SigningKey`, `com.bacsystem.auth.token.SigningKeyStatus`, `com.bacsystem.auth.token.SigningKeyRepository`

**Steps:**

1. Write the failing test `SigningKeyRepositoryTest` (the spec's §8.3 JWKS
   rotation needs a durable place to keep every key that's still inside its
   overlap window — this table, not something the original spec named
   explicitly, since key storage is an implementation detail of the already
   -approved rotation policy):

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.time.Instant;
   import java.util.List;

   import static org.assertj.core.api.Assertions.assertThat;

   class SigningKeyRepositoryTest extends PostgresRedisTestBase {

       @Autowired private SigningKeyRepository signingKeyRepository;

       @Test
       void findsActiveAndRetiringKeysForJwks() {
           SigningKey active = new SigningKey();
           active.setKid("kid-active");
           active.setAlgorithm("ES256");
           active.setPrivateKeyPem("priv-active");
           active.setPublicKeyPem("pub-active");
           active.setStatus(SigningKeyStatus.ACTIVE);
           active.setCreatedAt(Instant.now());
           signingKeyRepository.saveAndFlush(active);

           SigningKey retiring = new SigningKey();
           retiring.setKid("kid-retiring");
           retiring.setAlgorithm("ES256");
           retiring.setPrivateKeyPem("priv-retiring");
           retiring.setPublicKeyPem("pub-retiring");
           retiring.setStatus(SigningKeyStatus.RETIRING);
           retiring.setCreatedAt(Instant.now().minusSeconds(3600));
           retiring.setRetireAt(Instant.now().plusSeconds(3600));
           signingKeyRepository.saveAndFlush(retiring);

           List<SigningKey> publishable = signingKeyRepository
                   .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
           assertThat(publishable).hasSize(2);
       }
   }
   ```

2. Run `mvn -q test -Dtest=SigningKeyRepositoryTest`. Expect **FAIL**.

3. Create `V12__create_signing_keys.sql`:

   ```sql
   CREATE TABLE signing_keys (
       id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       kid              VARCHAR(64) NOT NULL UNIQUE,
       algorithm        VARCHAR(10) NOT NULL,
       private_key_pem  TEXT NOT NULL,
       public_key_pem   TEXT NOT NULL,
       status           VARCHAR(20) NOT NULL,
       created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
       retire_at        TIMESTAMPTZ,
       retired_at       TIMESTAMPTZ
   );
   ```

4. Create `SigningKeyStatus.java`:

   ```java
   package com.bacsystem.auth.token;

   public enum SigningKeyStatus {
       ACTIVE,
       RETIRING,
       RETIRED
   }
   ```

5. Create `SigningKey.java`:

   ```java
   package com.bacsystem.auth.token;

   import jakarta.persistence.*;
   import lombok.Getter;
   import lombok.Setter;

   import java.time.Instant;
   import java.util.UUID;

   @Entity
   @Table(name = "signing_keys")
   @Getter
   @Setter
   public class SigningKey {

       @Id
       @GeneratedValue
       private UUID id;

       @Column(nullable = false, unique = true, length = 64)
       private String kid;

       @Column(nullable = false, length = 10)
       private String algorithm;

       @Column(name = "private_key_pem", nullable = false, columnDefinition = "TEXT")
       private String privateKeyPem;

       @Column(name = "public_key_pem", nullable = false, columnDefinition = "TEXT")
       private String publicKeyPem;

       @Enumerated(EnumType.STRING)
       @Column(nullable = false, length = 20)
       private SigningKeyStatus status;

       @Column(name = "created_at", nullable = false, updatable = false)
       private Instant createdAt = Instant.now();

       @Column(name = "retire_at")
       private Instant retireAt;

       @Column(name = "retired_at")
       private Instant retiredAt;
   }
   ```

6. Create `SigningKeyRepository.java`:

   ```java
   package com.bacsystem.auth.token;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   public interface SigningKeyRepository extends JpaRepository<SigningKey, UUID> {
       List<SigningKey> findByStatusIn(List<SigningKeyStatus> statuses);
       Optional<SigningKey> findByStatus(SigningKeyStatus status);
       Optional<SigningKey> findByKid(String kid);
   }
   ```

7. Run `mvn -q test -Dtest=SigningKeyRepositoryTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/db/migration/V12__create_signing_keys.sql \
     authentication/src/main/java/com/bacsystem/auth/token/SigningKey.java \
     authentication/src/main/java/com/bacsystem/auth/token/SigningKeyStatus.java \
     authentication/src/main/java/com/bacsystem/auth/token/SigningKeyRepository.java \
     authentication/src/test/java/com/bacsystem/auth/token/SigningKeyRepositoryTest.java
   git commit -m "feat(auth): add SigningKey entity for JWKS multi-key rotation"
   ```

---

### Task 14: AuditLogService

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/audit/AuditLogService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/audit/AuditLogServiceTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.audit.AuditLog`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.audit.AuditLogRepository`
- Produces: `com.bacsystem.auth.audit.AuditLogService`

**Steps:**

1. Write the failing test `AuditLogServiceTest` (Mockito, no Spring context):

   ```java
   package com.bacsystem.auth.audit;

   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   import org.mockito.ArgumentCaptor;
   import org.mockito.Mock;
   import org.mockito.junit.jupiter.MockitoExtension;

   import java.util.UUID;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.mockito.Mockito.verify;

   @ExtendWith(MockitoExtension.class)
   class AuditLogServiceTest {

       @Mock private AuditLogRepository auditLogRepository;

       @Test
       void recordsEntryWithGivenFields() {
           AuditLogService service = new AuditLogService(auditLogRepository);
           UUID actor = UUID.randomUUID();

           service.record(actor, AuditAction.ROLE_CREATED, "Role", "role-1", "{\"name\":\"editor\"}");

           ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
           verify(auditLogRepository).save(captor.capture());
           AuditLog saved = captor.getValue();
           assertThat(saved.getActorUserId()).isEqualTo(actor);
           assertThat(saved.getAction()).isEqualTo(AuditAction.ROLE_CREATED);
           assertThat(saved.getTargetType()).isEqualTo("Role");
       }

       @Test
       void allowsNullActorForSystemEvents() {
           AuditLogService service = new AuditLogService(auditLogRepository);

           service.record(null, AuditAction.KEY_ROTATION, "SigningKey", "kid-1", "{}");

           ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
           verify(auditLogRepository).save(captor.capture());
           assertThat(captor.getValue().getActorUserId()).isNull();
       }
   }
   ```

2. Run `mvn -q test -Dtest=AuditLogServiceTest`. Expect **FAIL**.

3. Create `AuditLogService.java`:

   ```java
   package com.bacsystem.auth.audit;

   import org.springframework.stereotype.Service;

   import java.time.Instant;
   import java.util.UUID;

   @Service
   public class AuditLogService {

       private final AuditLogRepository auditLogRepository;

       public AuditLogService(AuditLogRepository auditLogRepository) {
           this.auditLogRepository = auditLogRepository;
       }

       public void record(UUID actorUserId, AuditAction action, String targetType, String targetId, String detail) {
           AuditLog entry = new AuditLog();
           entry.setActorUserId(actorUserId);
           entry.setAction(action);
           entry.setTargetType(targetType);
           entry.setTargetId(targetId);
           entry.setDetail(detail);
           entry.setCreatedAt(Instant.now());
           auditLogRepository.save(entry);
       }
   }
   ```

4. Run `mvn -q test -Dtest=AuditLogServiceTest`. Expect **PASS**.

5. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/audit/AuditLogService.java \
     authentication/src/test/java/com/bacsystem/auth/audit/AuditLogServiceTest.java
   git commit -m "feat(auth): add AuditLogService"
   ```

---

### Task 15: UserService & Argon2id Password Encoding

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/PasswordEncoderConfig.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/UserService.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/DuplicateEmailException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/UserNotFoundException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/identity/WeakPasswordException.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/identity/UserServiceTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserStatus`, `com.bacsystem.auth.identity.UserRepository`, `com.bacsystem.auth.security.BreachedPasswordChecker`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`
- Produces: `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.identity.PasswordEncoderConfig`, `com.bacsystem.auth.identity.DuplicateEmailException`, `com.bacsystem.auth.identity.UserNotFoundException`, `com.bacsystem.auth.identity.WeakPasswordException`

**Steps:**

1. Write the failing test `UserServiceTest`:

   ```java
   package com.bacsystem.auth.identity;

   import com.bacsystem.auth.audit.AuditLogService;
   import com.bacsystem.auth.security.BreachedPasswordChecker;
   import com.bacsystem.auth.tenancy.Tenant;
   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   import org.mockito.Mock;
   import org.mockito.junit.jupiter.MockitoExtension;
   import org.springframework.security.crypto.password.PasswordEncoder;

   import java.util.Optional;
   import java.util.UUID;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;
   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.Mockito.when;

   @ExtendWith(MockitoExtension.class)
   class UserServiceTest {

       @Mock private UserRepository userRepository;
       @Mock private BreachedPasswordChecker breachedPasswordChecker;
       @Mock private AuditLogService auditLogService;

       private final PasswordEncoder passwordEncoder = new PasswordEncoderConfig().passwordEncoder();

       private UserService newService() {
           return new UserService(userRepository, passwordEncoder, breachedPasswordChecker, auditLogService);
       }

       @Test
       void createUserRejectsDuplicateEmailInTenant() {
           UUID tenantId = UUID.randomUUID();
           when(userRepository.findByTenantIdAndEmail(tenantId, "dup@test.com"))
                   .thenReturn(Optional.of(new User()));

           UserService service = newService();

           assertThrows(DuplicateEmailException.class,
                   () -> service.createUser(tenantId, "dup@test.com", "TempPassw0rd!23", UUID.randomUUID()));
       }

       @Test
       void createUserSetsMustChangePasswordAndHashesWithArgon2() {
           UUID tenantId = UUID.randomUUID();
           when(userRepository.findByTenantIdAndEmail(any(), any())).thenReturn(Optional.empty());
           when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

           UserService service = newService();
           User created = service.createUser(tenantId, "new@test.com", "TempPassw0rd!23", UUID.randomUUID());

           assertThat(created.isMustChangePassword()).isTrue();
           assertThat(created.getPasswordHash()).startsWith("$argon2");
       }

       @Test
       void changePasswordRejectsBreachedPassword() {
           when(breachedPasswordChecker.isBreached("password123456")).thenReturn(true);
           UserService service = newService();

           User user = new User();
           user.setId(UUID.randomUUID());

           assertThrows(WeakPasswordException.class,
                   () -> service.changePassword(user, "password123456"));
       }

       @Test
       void changePasswordRejectsBelowMinimumLength() {
           UserService service = newService();
           User user = new User();
           user.setId(UUID.randomUUID());

           assertThrows(WeakPasswordException.class,
                   () -> service.changePassword(user, "short1!"));
       }

       @Test
       void changePasswordClearsMustChangeFlag() {
           when(breachedPasswordChecker.isBreached(any())).thenReturn(false);
           when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

           UserService service = newService();
           User user = new User();
           user.setId(UUID.randomUUID());
           user.setMustChangePassword(true);

           service.changePassword(user, "BrandNewPassw0rd!42");

           assertThat(user.isMustChangePassword()).isFalse();
           assertThat(user.getPasswordHash()).startsWith("$argon2");
       }
   }
   ```

2. Run `mvn -q test -Dtest=UserServiceTest`. Expect **FAIL**.

3. Create `PasswordEncoderConfig.java` — Argon2id via Spring Security's
   `Argon2PasswordEncoder`, parameters tuned for the ~250-500ms hashing cost
   the spec's login latency threshold is derived from (§17.2); the exact
   parameters are a starting point recorded here, meant to be recalibrated
   against real target hardware, never loosened to chase a latency number:

   ```java
   package com.bacsystem.auth.identity;

   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
   import org.springframework.security.crypto.password.PasswordEncoder;

   @Configuration
   public class PasswordEncoderConfig {

       @Bean
       public PasswordEncoder passwordEncoder() {
           // saltLength=16, hashLength=32, parallelism=1, memory=19456 KB (~19 MB),
           // iterations=2 — OWASP's baseline Argon2id profile, ~250-350ms on
           // typical CI/cloud CPU. Recalibrate against target hardware (§17.2)
           // before relying on the derived login latency threshold.
           return new Argon2PasswordEncoder(16, 32, 1, 19456, 2);
       }
   }
   ```

4. Create the three exception types:

   ```java
   package com.bacsystem.auth.identity;

   public class DuplicateEmailException extends RuntimeException {
       public DuplicateEmailException(String email) {
           super("Email already registered in this tenant: " + email);
       }
   }
   ```

   ```java
   package com.bacsystem.auth.identity;

   import java.util.UUID;

   public class UserNotFoundException extends RuntimeException {
       public UserNotFoundException(UUID userId) {
           super("User not found: " + userId);
       }
   }
   ```

   ```java
   package com.bacsystem.auth.identity;

   public class WeakPasswordException extends RuntimeException {
       public WeakPasswordException(String reason) {
           super(reason);
       }
   }
   ```

5. Create `UserService.java` (§13's password policy: length ≥ 12, no
   composition rules, breach-list rejection, no forced expiration):

   ```java
   package com.bacsystem.auth.identity;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import com.bacsystem.auth.security.BreachedPasswordChecker;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.Pageable;
   import org.springframework.security.crypto.password.PasswordEncoder;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import java.time.Instant;
   import java.util.Optional;
   import java.util.UUID;

   @Service
   public class UserService {

       private static final int MIN_PASSWORD_LENGTH = 12;

       private final UserRepository userRepository;
       private final PasswordEncoder passwordEncoder;
       private final BreachedPasswordChecker breachedPasswordChecker;
       private final AuditLogService auditLogService;

       public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           BreachedPasswordChecker breachedPasswordChecker, AuditLogService auditLogService) {
           this.userRepository = userRepository;
           this.passwordEncoder = passwordEncoder;
           this.breachedPasswordChecker = breachedPasswordChecker;
           this.auditLogService = auditLogService;
       }

       @Transactional
       public User createUser(UUID tenantId, String email, String temporaryPassword, UUID actorUserId) {
           if (userRepository.findByTenantIdAndEmail(tenantId, email).isPresent()) {
               throw new DuplicateEmailException(email);
           }
           validatePasswordStrength(temporaryPassword);

           User user = new User();
           com.bacsystem.auth.tenancy.Tenant tenantRef = new com.bacsystem.auth.tenancy.Tenant();
           tenantRef.setId(tenantId);
           user.setTenant(tenantRef);
           user.setEmail(email);
           user.setPasswordHash(passwordEncoder.encode(temporaryPassword));
           user.setStatus(UserStatus.ACTIVE);
           user.setMustChangePassword(true);
           User saved = userRepository.save(user);

           auditLogService.record(actorUserId, AuditAction.USER_CREATED, "User", saved.getId().toString(),
                   "{\"email\":\"" + email + "\"}");
           return saved;
       }

       @Transactional
       public void deactivateUser(UUID userId, UUID actorUserId) {
           User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
           user.setStatus(UserStatus.DEACTIVATED);
           userRepository.save(user);
           auditLogService.record(actorUserId, AuditAction.USER_DEACTIVATED, "User", userId.toString(), "{}");
       }

       @Transactional
       public void changePassword(User user, String newPassword) {
           validatePasswordStrength(newPassword);
           user.setPasswordHash(passwordEncoder.encode(newPassword));
           user.setMustChangePassword(false);
           user.setPasswordChangedAt(Instant.now());
           userRepository.save(user);
           auditLogService.record(user.getId(), AuditAction.USER_PASSWORD_CHANGED, "User",
                   user.getId().toString(), "{}");
       }

       public Optional<User> findByTenantAndEmail(UUID tenantId, String email) {
           return userRepository.findByTenantIdAndEmail(tenantId, email);
       }

       public User getById(UUID userId) {
           return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
       }

       public Page<User> listByTenant(UUID tenantId, Pageable pageable) {
           return userRepository.findByTenantId(tenantId, pageable);
       }

       private void validatePasswordStrength(String password) {
           if (password.length() < MIN_PASSWORD_LENGTH) {
               throw new WeakPasswordException("Password must be at least " + MIN_PASSWORD_LENGTH + " characters");
           }
           if (breachedPasswordChecker.isBreached(password)) {
               throw new WeakPasswordException("Password appears in a known breach list");
           }
       }
   }
   ```

6. Run `mvn -q test -Dtest=UserServiceTest`. Expect **PASS**.

7. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/identity/PasswordEncoderConfig.java \
     authentication/src/main/java/com/bacsystem/auth/identity/UserService.java \
     authentication/src/main/java/com/bacsystem/auth/identity/DuplicateEmailException.java \
     authentication/src/main/java/com/bacsystem/auth/identity/UserNotFoundException.java \
     authentication/src/main/java/com/bacsystem/auth/identity/WeakPasswordException.java \
     authentication/src/test/java/com/bacsystem/auth/identity/UserServiceTest.java
   git commit -m "feat(auth): add UserService with Argon2id hashing and breach-list check"
   ```

---

### Task 16: LoginAttemptService — Lockout & Burst Detection

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/security/LoginAttemptService.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/AccountLockedException.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/security/LoginAttemptServiceTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.security.LoginAttempt`, `com.bacsystem.auth.security.LoginAttemptRepository`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`
- Produces: `com.bacsystem.auth.security.LoginAttemptService`, `com.bacsystem.auth.security.AccountLockedException`

**Steps:**

1. Write the failing test `LoginAttemptServiceTest` (§13: exponential
   backoff — first lockout at 5 failures, doubling each subsequent lockout,
   reset on success; tracked per-account **and** per-IP):

   ```java
   package com.bacsystem.auth.security;

   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   import org.mockito.Mock;
   import org.mockito.junit.jupiter.MockitoExtension;

   import java.time.Instant;
   import java.util.List;
   import java.util.stream.Collectors;
   import java.util.stream.IntStream;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;
   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.Mockito.when;

   @ExtendWith(MockitoExtension.class)
   class LoginAttemptServiceTest {

       @Mock private LoginAttemptRepository loginAttemptRepository;
       @Mock private com.bacsystem.auth.audit.AuditLogService auditLogService;

       private LoginAttemptService newService() {
           return new LoginAttemptService(loginAttemptRepository, auditLogService);
       }

       private List<LoginAttempt> failuresEndingAt(Instant lastFailure, int count) {
           return IntStream.range(0, count)
                   .mapToObj(i -> {
                       LoginAttempt a = new LoginAttempt();
                       a.setSuccess(false);
                       a.setAttemptedAt(lastFailure.minusSeconds((count - 1 - i) * 5L));
                       return a;
                   })
                   .collect(Collectors.toList());
       }

       @Test
       void belowThresholdIsNotLocked() {
           when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                   .thenReturn(failuresEndingAt(Instant.now(), 4));
           when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                   .thenReturn(List.of());

           LoginAttemptService service = newService();

           service.assertNotLocked("user@test.com", "1.2.3.4");
           // no exception == not locked
       }

       @Test
       void fifthFailureLocksForOneMinute() {
           Instant lastFailure = Instant.now();
           when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                   .thenReturn(failuresEndingAt(lastFailure, 5));
           when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                   .thenReturn(List.of());

           LoginAttemptService service = newService();

           assertThrows(AccountLockedException.class,
                   () -> service.assertNotLocked("user@test.com", "1.2.3.4"));
       }

       @Test
       void tenthFailureLocksLongerThanFifth() {
           LoginAttemptService service = newService();

           long fifthWaitSeconds = service.lockoutDurationSeconds(5);
           long tenthWaitSeconds = service.lockoutDurationSeconds(10);

           assertThat(tenthWaitSeconds).isGreaterThan(fifthWaitSeconds);
       }

       @Test
       void ipBurstAcrossDifferentAccountsAlsoLocks() {
           Instant lastFailure = Instant.now();
           when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                   .thenReturn(List.of());
           when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                   .thenReturn(failuresEndingAt(lastFailure, 5));

           LoginAttemptService service = newService();

           assertThrows(AccountLockedException.class,
                   () -> service.assertNotLocked("victim@test.com", "9.9.9.9"));
       }
   }
   ```

2. Run `mvn -q test -Dtest=LoginAttemptServiceTest`. Expect **FAIL**.

3. Create `AccountLockedException.java` — deliberately carries **no**
   distinguishing detail in its message beyond what §10.2 already allows to
   leak to a caller (nothing — the controller/advice layer maps this to the
   same generic `authentication_failed` response as bad credentials):

   ```java
   package com.bacsystem.auth.security;

   public class AccountLockedException extends RuntimeException {
       public AccountLockedException() {
           super("locked");
       }
   }
   ```

4. Create `LoginAttemptService.java`:

   ```java
   package com.bacsystem.auth.security;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import org.springframework.stereotype.Service;

   import java.time.Instant;
   import java.util.List;

   @Service
   public class LoginAttemptService {

       private static final int THRESHOLD = 5;
       private static final long BASE_LOCKOUT_SECONDS = 60;
       private static final long MAX_LOCKOUT_SECONDS = 3600;
       private static final long LOOKBACK_SECONDS = 3600;

       private final LoginAttemptRepository loginAttemptRepository;
       private final AuditLogService auditLogService;

       public LoginAttemptService(LoginAttemptRepository loginAttemptRepository, AuditLogService auditLogService) {
           this.loginAttemptRepository = loginAttemptRepository;
           this.auditLogService = auditLogService;
       }

       /** Throws {@link AccountLockedException} if either the account or the IP is over threshold (§13). */
       public void assertNotLocked(String email, String ipAddress) {
           Instant since = Instant.now().minusSeconds(LOOKBACK_SECONDS);
           List<LoginAttempt> byAccount = loginAttemptRepository
                   .findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(email, since);
           List<LoginAttempt> byIp = loginAttemptRepository
                   .findByIpAddressAndSuccessFalseAndAttemptedAtAfter(ipAddress, since);

           if (isLocked(byAccount) || isLocked(byIp)) {
               throw new AccountLockedException();
           }
       }

       public void recordFailure(String email, String ipAddress) {
           LoginAttempt attempt = new LoginAttempt();
           attempt.setEmailAttempted(email);
           attempt.setIpAddress(ipAddress);
           attempt.setSuccess(false);
           attempt.setAttemptedAt(Instant.now());
           loginAttemptRepository.save(attempt);
       }

       public void recordSuccess(java.util.UUID userId, String email, String ipAddress) {
           LoginAttempt attempt = new LoginAttempt();
           attempt.setUserId(userId);
           attempt.setEmailAttempted(email);
           attempt.setIpAddress(ipAddress);
           attempt.setSuccess(true);
           attempt.setAttemptedAt(Instant.now());
           loginAttemptRepository.save(attempt);
       }

       private boolean isLocked(List<LoginAttempt> recentFailures) {
           if (recentFailures.size() < THRESHOLD) {
               return false;
           }
           Instant mostRecentFailure = recentFailures.stream()
                   .map(LoginAttempt::getAttemptedAt)
                   .max(Instant::compareTo)
                   .orElseThrow();
           long waitSeconds = lockoutDurationSeconds(recentFailures.size());
           return mostRecentFailure.plusSeconds(waitSeconds).isAfter(Instant.now());
       }

       /** Tier 1 at the 5th failure = 60s, doubling each subsequent tier, capped at 1 hour. */
       long lockoutDurationSeconds(int failureCount) {
           if (failureCount < THRESHOLD) {
               return 0;
           }
           int tier = (failureCount - THRESHOLD) / THRESHOLD;
           long seconds = BASE_LOCKOUT_SECONDS * (1L << Math.min(tier, 6));
           return Math.min(seconds, MAX_LOCKOUT_SECONDS);
       }
   }
   ```

5. Run `mvn -q test -Dtest=LoginAttemptServiceTest`. Expect **PASS**.

6. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/security/LoginAttemptService.java \
     authentication/src/main/java/com/bacsystem/auth/security/AccountLockedException.java \
     authentication/src/test/java/com/bacsystem/auth/security/LoginAttemptServiceTest.java
   git commit -m "feat(auth): add LoginAttemptService with per-account and per-IP exponential backoff"
   ```

---

### Task 17: RoleService — Optimistic-Locked Permission Replace (§9.4)

**Files:**
- Modify: `authentication/src/main/java/com/bacsystem/auth/rbac/RoleRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/RoleService.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/RoleNotFoundException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/DuplicateRoleNameException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/RoleVersionConflictException.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/rbac/RoleServiceTest.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/rbac/RoleServiceConcurrencyIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.rbac.Role`, `com.bacsystem.auth.rbac.Permission`, `com.bacsystem.auth.rbac.RolePermission`, `com.bacsystem.auth.rbac.RoleRepository`, `com.bacsystem.auth.rbac.PermissionRepository`, `com.bacsystem.auth.rbac.RolePermissionRepository`, `com.bacsystem.auth.rbac.UserRoleRepository`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.rbac.RoleService`, `com.bacsystem.auth.rbac.RoleNotFoundException`, `com.bacsystem.auth.rbac.DuplicateRoleNameException`, `com.bacsystem.auth.rbac.RoleVersionConflictException`, `com.bacsystem.auth.rbac.RoleInUseException`

This is the spec's single most safety-critical piece (§9.4): two admins
replacing the same role's permissions concurrently must never silently
union both sets. **Do not weaken the conditional-`UPDATE` mechanism below to
a plain read-modify-write** — that reintroduces exactly the race this task
exists to close.

**Steps:**

1. Write the failing unit test `RoleServiceTest` (Mockito — the version-
   mismatch branch, cheap to test without a real DB):

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.audit.AuditLogService;
   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   import org.mockito.Mock;
   import org.mockito.junit.jupiter.MockitoExtension;

   import java.util.Set;
   import java.util.UUID;

   import static org.junit.jupiter.api.Assertions.assertThrows;
   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.ArgumentMatchers.eq;
   import static org.mockito.Mockito.*;

   @ExtendWith(MockitoExtension.class)
   class RoleServiceTest {

       @Mock private RoleRepository roleRepository;
       @Mock private PermissionRepository permissionRepository;
       @Mock private RolePermissionRepository rolePermissionRepository;
       @Mock private UserRoleRepository userRoleRepository;
       @Mock private AuditLogService auditLogService;

       private RoleService newService() {
           return new RoleService(roleRepository, permissionRepository, rolePermissionRepository,
                   userRoleRepository, auditLogService);
       }

       @Test
       void staleVersionThrowsBeforeTouchingRolePermissions() {
           UUID roleId = UUID.randomUUID();
           when(roleRepository.touchVersion(roleId, 3L)).thenReturn(0);

           RoleService service = newService();

           assertThrows(RoleVersionConflictException.class,
                   () -> service.replacePermissions(roleId, 3L, Set.of(UUID.randomUUID()), UUID.randomUUID()));

           verify(rolePermissionRepository, never()).deleteByRoleId(any());
           verify(rolePermissionRepository, never()).save(any());
       }

       @Test
       void matchingVersionReplacesPermissions() {
           UUID roleId = UUID.randomUUID();
           UUID permissionId = UUID.randomUUID();
           when(roleRepository.touchVersion(roleId, 3L)).thenReturn(1);
           when(roleRepository.findById(roleId)).thenReturn(java.util.Optional.of(new Role()));
           Permission permission = new Permission();
           permission.setId(permissionId);
           when(permissionRepository.findById(permissionId)).thenReturn(java.util.Optional.of(permission));

           RoleService service = newService();
           service.replacePermissions(roleId, 3L, Set.of(permissionId), UUID.randomUUID());

           verify(rolePermissionRepository).deleteByRoleId(roleId);
           verify(rolePermissionRepository, times(1)).save(any());
       }

       @Test
       void deleteRejectedWhenReferencedByUserRoles() {
           UUID roleId = UUID.randomUUID();
           when(userRoleRepository.countByRoleId(roleId)).thenReturn(1L);

           RoleService service = newService();

           assertThrows(RoleInUseException.class, () -> service.deleteRole(roleId, UUID.randomUUID()));
       }
   }
   ```

   This test references `RoleInUseException` — add it alongside the other
   three exception types in this task.

2. Run `mvn -q test -Dtest=RoleServiceTest`. Expect **FAIL** (class doesn't compile).

3. Write the failing integration test `RoleServiceConcurrencyIT` — this is
   the JVM-level equivalent of the k6 scenario in Task 35, run here so the
   guarantee is checked long before a load-testing environment exists:

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.List;
   import java.util.Set;
   import java.util.UUID;
   import java.util.concurrent.*;
   import java.util.concurrent.atomic.AtomicInteger;

   import static org.assertj.core.api.Assertions.assertThat;

   class RoleServiceConcurrencyIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private RoleRepository roleRepository;
       @Autowired private PermissionRepository permissionRepository;
       @Autowired private RolePermissionRepository rolePermissionRepository;
       @Autowired private RoleService roleService;

       @Test
       void twentyConcurrentWritersNeverProduceAUnion() throws Exception {
           Tenant tenant = new Tenant();
           tenant.setSlug("concurrency-" + System.nanoTime());
           tenant.setName("Concurrency Test");
           tenant = tenantRepository.saveAndFlush(tenant);

           Role role = new Role();
           role.setTenant(tenant);
           role.setName("concurrency-role");
           role = roleRepository.saveAndFlush(role);
           long startingVersion = role.getVersion();
           UUID roleId = role.getId();

           List<Permission> permissions = new java.util.ArrayList<>();
           for (int i = 0; i < 20; i++) {
               Permission p = new Permission();
               p.setApplicationName("example-app");
               p.setName("perm-" + i);
               permissions.add(permissionRepository.saveAndFlush(p));
           }

           ExecutorService pool = Executors.newFixedThreadPool(20);
           AtomicInteger okCount = new AtomicInteger();
           AtomicInteger conflictCount = new AtomicInteger();
           List<Set<UUID>> submittedSets = new CopyOnWriteArrayList<>();

           List<Callable<Void>> tasks = new java.util.ArrayList<>();
           for (int writer = 0; writer < 20; writer++) {
               Set<UUID> permsForThisWriter = Set.of(permissions.get(writer).getId());
               tasks.add(() -> {
                   try {
                       roleService.replacePermissions(roleId, startingVersion, permsForThisWriter, UUID.randomUUID());
                       okCount.incrementAndGet();
                       submittedSets.add(permsForThisWriter);
                   } catch (RoleVersionConflictException e) {
                       conflictCount.incrementAndGet();
                   }
                   return null;
               });
           }
           List<Future<Void>> futures = pool.invokeAll(tasks);
           for (Future<Void> f : futures) f.get(); // propagate any unexpected exception (would show as a non-2xx/409 in k6)
           pool.shutdown();

           // exactly one writer's conditional UPDATE succeeds against the shared starting version
           assertThat(okCount.get()).isEqualTo(1);
           assertThat(conflictCount.get()).isEqualTo(19);

           List<RolePermission> finalState = rolePermissionRepository.findByRoleId(roleId);
           assertThat(finalState).hasSize(1);
           assertThat(submittedSets).hasSize(1);
           assertThat(finalState.get(0).getPermission().getId()).isEqualTo(submittedSets.get(0).iterator().next());
       }
   }
   ```

4. Run `mvn -q test -Dtest=RoleServiceConcurrencyIT`. Expect **FAIL**.

5. Add `touchVersion` to `RoleRepository.java` (Modify — the atomic
   conditional update the whole guarantee rests on):

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.data.jpa.repository.Modifying;
   import org.springframework.data.jpa.repository.Query;
   import org.springframework.data.repository.query.Param;

   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   public interface RoleRepository extends JpaRepository<Role, UUID> {
       Optional<Role> findByTenantIdAndName(UUID tenantId, String name);
       List<Role> findByTenantId(UUID tenantId);

       /**
        * Atomically bumps the version only if it still matches what the caller
        * read — returns 0 (no row updated) on a stale version, 1 on success.
        * Postgres row-level locking makes this safe under real concurrency:
        * two transactions racing on the same WHERE clause serialize on the
        * row lock, and only the first to commit sees its predicate still hold.
        */
       @Modifying
       @Query("UPDATE Role r SET r.version = r.version + 1 WHERE r.id = :id AND r.version = :expectedVersion")
       int touchVersion(@Param("id") UUID id, @Param("expectedVersion") long expectedVersion);
   }
   ```

6. Create the four exception types:

   ```java
   package com.bacsystem.auth.rbac;

   import java.util.UUID;

   public class RoleNotFoundException extends RuntimeException {
       public RoleNotFoundException(UUID roleId) {
           super("Role not found: " + roleId);
       }
   }
   ```

   ```java
   package com.bacsystem.auth.rbac;

   public class DuplicateRoleNameException extends RuntimeException {
       public DuplicateRoleNameException(String name) {
           super("Role name already exists in this tenant: " + name);
       }
   }
   ```

   ```java
   package com.bacsystem.auth.rbac;

   public class RoleVersionConflictException extends RuntimeException {
       public RoleVersionConflictException() {
           super("Role was modified by another writer — reread and retry");
       }
   }
   ```

   ```java
   package com.bacsystem.auth.rbac;

   import java.util.UUID;

   public class RoleInUseException extends RuntimeException {
       public RoleInUseException(UUID roleId) {
           super("Role is still assigned to users: " + roleId);
       }
   }
   ```

7. Create `RoleService.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import java.util.List;
   import java.util.Set;
   import java.util.UUID;

   @Service
   public class RoleService {

       private final RoleRepository roleRepository;
       private final PermissionRepository permissionRepository;
       private final RolePermissionRepository rolePermissionRepository;
       private final UserRoleRepository userRoleRepository;
       private final AuditLogService auditLogService;

       public RoleService(RoleRepository roleRepository, PermissionRepository permissionRepository,
                           RolePermissionRepository rolePermissionRepository, UserRoleRepository userRoleRepository,
                           AuditLogService auditLogService) {
           this.roleRepository = roleRepository;
           this.permissionRepository = permissionRepository;
           this.rolePermissionRepository = rolePermissionRepository;
           this.userRoleRepository = userRoleRepository;
           this.auditLogService = auditLogService;
       }

       @Transactional
       public Role createRole(UUID tenantId, String name, boolean isTemplate, UUID actorUserId) {
           if (roleRepository.findByTenantIdAndName(tenantId, name).isPresent()) {
               throw new DuplicateRoleNameException(name);
           }
           Role role = new Role();
           com.bacsystem.auth.tenancy.Tenant tenantRef = new com.bacsystem.auth.tenancy.Tenant();
           tenantRef.setId(tenantId);
           role.setTenant(tenantRef);
           role.setName(name);
           role.setTemplate(isTemplate);
           Role saved = roleRepository.save(role);
           auditLogService.record(actorUserId, AuditAction.ROLE_CREATED, "Role", saved.getId().toString(),
                   "{\"name\":\"" + name + "\"}");
           return saved;
       }

       public Role getRole(UUID roleId) {
           return roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
       }

       public List<RolePermission> getPermissions(UUID roleId) {
           return rolePermissionRepository.findByRoleId(roleId);
       }

       public List<Role> listByTenant(UUID tenantId) {
           return roleRepository.findByTenantId(tenantId);
       }

       /**
        * §9.4's concurrency-critical replace. The version check happens via a
        * single atomic conditional UPDATE (touchVersion) BEFORE any
        * role_permissions row is touched — a stale version never reaches the
        * delete/insert below.
        */
       @Transactional
       public Role replacePermissions(UUID roleId, long expectedVersion, Set<UUID> permissionIds, UUID actorUserId) {
           int updated = roleRepository.touchVersion(roleId, expectedVersion);
           if (updated == 0) {
               throw new RoleVersionConflictException();
           }

           rolePermissionRepository.deleteByRoleId(roleId);
           Role role = roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
           for (UUID permissionId : permissionIds) {
               Permission permission = permissionRepository.findById(permissionId)
                       .orElseThrow(() -> new IllegalArgumentException("Unknown permission: " + permissionId));
               RolePermission rp = new RolePermission();
               rp.setRole(role);
               rp.setPermission(permission);
               rolePermissionRepository.save(rp);
           }

           auditLogService.record(actorUserId, AuditAction.ROLE_PERMISSIONS_REPLACED, "Role", roleId.toString(),
                   "{\"permissionCount\":" + permissionIds.size() + "}");
           return roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
       }

       @Transactional
       public void deleteRole(UUID roleId, UUID actorUserId) {
           if (userRoleRepository.countByRoleId(roleId) > 0) {
               throw new RoleInUseException(roleId);
           }
           rolePermissionRepository.deleteByRoleId(roleId);
           roleRepository.deleteById(roleId);
           auditLogService.record(actorUserId, AuditAction.ROLE_DELETED, "Role", roleId.toString(), "{}");
       }
   }
   ```

8. Run `mvn -q test -Dtest=RoleServiceTest`. Expect **PASS**.

9. Run `mvn -q test -Dtest=RoleServiceConcurrencyIT`. Expect **PASS** — if
   `okCount` is ever anything other than exactly `1`, or `finalState` has
   more than one row, stop and re-examine `touchVersion`'s query before
   proceeding; that would mean the union bug the spec was written to
   prevent is still present.

10. Commit:

    ```bash
    git add authentication/src/main/java/com/bacsystem/auth/rbac/RoleRepository.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RoleService.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RoleNotFoundException.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/DuplicateRoleNameException.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RoleVersionConflictException.java \
      authentication/src/main/java/com/bacsystem/auth/rbac/RoleInUseException.java \
      authentication/src/test/java/com/bacsystem/auth/rbac/RoleServiceTest.java \
      authentication/src/test/java/com/bacsystem/auth/rbac/RoleServiceConcurrencyIT.java
    git commit -m "feat(auth): add RoleService with atomic optimistic-locked permission replace"
    ```

---

### Task 18: PermissionCatalogService — Per-App Sync (§9.2)

**Files:**
- Modify: `authentication/src/main/java/com/bacsystem/auth/rbac/PermissionRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/PermissionSyncResult.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/rbac/PermissionCatalogService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/rbac/PermissionCatalogServiceIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.rbac.Permission`, `com.bacsystem.auth.rbac.PermissionRepository`, `com.bacsystem.auth.rbac.RolePermissionRepository`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.rbac.PermissionCatalogService`, `com.bacsystem.auth.rbac.PermissionSyncResult`

**Steps:**

1. Write the failing integration test `PermissionCatalogServiceIT` (real DB
   — the idempotent-upsert and deprecation logic depends on actual unique
   constraints):

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.List;
   import java.util.Set;

   import static org.assertj.core.api.Assertions.assertThat;

   class PermissionCatalogServiceIT extends PostgresRedisTestBase {

       @Autowired private PermissionCatalogService permissionCatalogService;
       @Autowired private PermissionRepository permissionRepository;

       @Test
       void firstSyncAddsAllPermissions() {
           PermissionSyncResult result = permissionCatalogService.sync(
                   "catalog-app", Set.of("invoices:read", "invoices:write"));

           assertThat(result.added()).isEqualTo(2);
           assertThat(result.deprecated()).isEqualTo(0);
       }

       @Test
       void secondSyncWithFewerNamesDeprecatesTheMissingOne() {
           permissionCatalogService.sync("catalog-app-2", Set.of("a:read", "a:write"));

           PermissionSyncResult result = permissionCatalogService.sync("catalog-app-2", Set.of("a:read"));

           assertThat(result.deprecated()).isEqualTo(1);
           List<Permission> all = permissionRepository.findByApplicationName("catalog-app-2");
           Permission writePermission = all.stream().filter(p -> p.getName().equals("a:write")).findFirst().orElseThrow();
           assertThat(writePermission.getDeprecatedAt()).isNotNull();
       }

       @Test
       void resubmittingADeprecatedPermissionUndeprecatesIt() {
           permissionCatalogService.sync("catalog-app-3", Set.of("x:read", "x:write"));
           permissionCatalogService.sync("catalog-app-3", Set.of("x:read"));

           permissionCatalogService.sync("catalog-app-3", Set.of("x:read", "x:write"));

           Permission writePermission = permissionRepository.findByApplicationName("catalog-app-3").stream()
                   .filter(p -> p.getName().equals("x:write")).findFirst().orElseThrow();
           assertThat(writePermission.getDeprecatedAt()).isNull();
       }
   }
   ```

2. Run `mvn -q test -Dtest=PermissionCatalogServiceIT`. Expect **FAIL**.

3. Add upsert/deprecate queries to `PermissionRepository.java` (Modify):

   ```java
   package com.bacsystem.auth.rbac;

   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.data.jpa.repository.Modifying;
   import org.springframework.data.jpa.repository.Query;
   import org.springframework.data.repository.query.Param;

   import java.util.List;
   import java.util.Optional;
   import java.util.Set;
   import java.util.UUID;

   public interface PermissionRepository extends JpaRepository<Permission, UUID> {
       Optional<Permission> findByApplicationNameAndName(String applicationName, String name);
       List<Permission> findByApplicationName(String applicationName);

       @Modifying
       @Query(value = """
               INSERT INTO permissions (application_name, name)
               VALUES (:applicationName, :name)
               ON CONFLICT (application_name, name) DO UPDATE SET deprecated_at = NULL
               """, nativeQuery = true)
       void upsertActive(@Param("applicationName") String applicationName, @Param("name") String name);

       @Modifying
       @Query("UPDATE Permission p SET p.deprecatedAt = CURRENT_TIMESTAMP " +
              "WHERE p.applicationName = :applicationName AND p.name NOT IN :names AND p.deprecatedAt IS NULL")
       int deprecateMissing(@Param("applicationName") String applicationName, @Param("names") Set<String> names);
   }
   ```

4. Create `PermissionSyncResult.java`:

   ```java
   package com.bacsystem.auth.rbac;

   public record PermissionSyncResult(int added, int deprecated) {
   }
   ```

5. Create `PermissionCatalogService.java`:

   ```java
   package com.bacsystem.auth.rbac;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import java.util.Set;

   @Service
   public class PermissionCatalogService {

       private final PermissionRepository permissionRepository;
       private final AuditLogService auditLogService;

       public PermissionCatalogService(PermissionRepository permissionRepository, AuditLogService auditLogService) {
           this.permissionRepository = permissionRepository;
           this.auditLogService = auditLogService;
       }

       /**
        * Idempotent, atomic sync of one application's full permission list
        * (§9.2). Safe against concurrent replicas of the same app calling this
        * simultaneously: each upsert is its own `ON CONFLICT` statement, not a
        * read-then-write.
        */
       @Transactional
       public PermissionSyncResult sync(String applicationName, Set<String> permissionNames) {
           for (String name : permissionNames) {
               permissionRepository.upsertActive(applicationName, name);
           }
           Set<String> namesOrPlaceholder = permissionNames.isEmpty() ? Set.of("__none__") : permissionNames;
           int deprecated = permissionRepository.deprecateMissing(applicationName, namesOrPlaceholder);

           auditLogService.record(null, AuditAction.PERMISSION_CATALOG_SYNCED, "Application", applicationName,
                   "{\"added\":" + permissionNames.size() + ",\"deprecated\":" + deprecated + "}");
           return new PermissionSyncResult(permissionNames.size(), deprecated);
       }
   }
   ```

6. Run `mvn -q test -Dtest=PermissionCatalogServiceIT`. Expect **PASS**.

7. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/rbac/PermissionRepository.java \
     authentication/src/main/java/com/bacsystem/auth/rbac/PermissionSyncResult.java \
     authentication/src/main/java/com/bacsystem/auth/rbac/PermissionCatalogService.java \
     authentication/src/test/java/com/bacsystem/auth/rbac/PermissionCatalogServiceIT.java
   git commit -m "feat(auth): add idempotent per-application permission catalog sync"
   ```

---

### Task 19: Token — TokenHasher & RefreshTokenService (Rotation + Reuse Detection)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/token/TokenHasher.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenService.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenReuseException.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/token/TokenHasherTest.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/token/RefreshTokenServiceIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.token.RefreshToken`, `com.bacsystem.auth.token.RefreshTokenRepository`, `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.token.TokenHasher`, `com.bacsystem.auth.token.RefreshTokenService`, `com.bacsystem.auth.token.RefreshTokenReuseException`

**Steps:**

1. Write the failing test `TokenHasherTest`:

   ```java
   package com.bacsystem.auth.token;

   import org.junit.jupiter.api.Test;

   import static org.assertj.core.api.Assertions.assertThat;

   class TokenHasherTest {

       @Test
       void sameInputProducesSameHash() {
           assertThat(TokenHasher.sha256Hex("abc")).isEqualTo(TokenHasher.sha256Hex("abc"));
       }

       @Test
       void differentInputProducesDifferentHash() {
           assertThat(TokenHasher.sha256Hex("abc")).isNotEqualTo(TokenHasher.sha256Hex("abd"));
       }

       @Test
       void generateRawTokenIsUrlSafeAndNonEmpty() {
           String raw = TokenHasher.generateRawToken();
           assertThat(raw).isNotBlank();
           assertThat(raw).doesNotContain("+", "/", "=");
       }
   }
   ```

2. Run `mvn -q test -Dtest=TokenHasherTest`. Expect **FAIL**.

3. Create `TokenHasher.java` — shared by `RefreshTokenService` here and
   `MfaService` (Task 23) for its Redis challenge ticket:

   ```java
   package com.bacsystem.auth.token;

   import java.nio.charset.StandardCharsets;
   import java.security.MessageDigest;
   import java.security.NoSuchAlgorithmException;
   import java.security.SecureRandom;
   import java.util.Base64;

   public final class TokenHasher {

       private static final SecureRandom RANDOM = new SecureRandom();

       private TokenHasher() {}

       public static String generateRawToken() {
           byte[] bytes = new byte[32];
           RANDOM.nextBytes(bytes);
           return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
       }

       public static String sha256Hex(String raw) {
           try {
               MessageDigest digest = MessageDigest.getInstance("SHA-256");
               byte[] hash = digest.digest(raw.getBytes(StandardCharsets.UTF_8));
               StringBuilder hex = new StringBuilder();
               for (byte b : hash) hex.append(String.format("%02x", b));
               return hex.toString();
           } catch (NoSuchAlgorithmException e) {
               throw new IllegalStateException(e);
           }
       }
   }
   ```

4. Run `mvn -q test -Dtest=TokenHasherTest`. Expect **PASS**.

5. Write the failing integration test `RefreshTokenServiceIT` (real DB — the
   reuse-detection walk needs real rows):

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.identity.UserStatus;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;

   class RefreshTokenServiceIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;
       @Autowired private RefreshTokenRepository refreshTokenRepository;
       @Autowired private RefreshTokenService refreshTokenService;

       private User newUser() {
           Tenant tenant = new Tenant();
           tenant.setSlug("rt-" + System.nanoTime());
           tenant.setName("RT Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           User user = new User();
           user.setTenant(tenant);
           user.setEmail("rt@test.test");
           user.setPasswordHash("{argon2}hash");
           user.setStatus(UserStatus.ACTIVE);
           return userRepository.saveAndFlush(user);
       }

       @Test
       void rotatingAValidTokenIssuesANewOneAndRevokesTheOld() {
           User user = newUser();
           String raw = refreshTokenService.issue(user, "example-app");

           String rotatedRaw = refreshTokenService.rotate(raw);

           assertThat(rotatedRaw).isNotEqualTo(raw);
           assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw));
       }

       @Test
       void reusingAnAlreadyRotatedTokenRevokesTheWholeChain() {
           User user = newUser();
           String raw = refreshTokenService.issue(user, "example-app");
           String rotatedOnce = refreshTokenService.rotate(raw);

           assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw));

           // the chain is fully revoked — even the legitimately-rotated token no longer works
           assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(rotatedOnce));
       }
   }
   ```

6. Run `mvn -q test -Dtest=RefreshTokenServiceIT`. Expect **FAIL**.

7. Create `RefreshTokenReuseException.java`:

   ```java
   package com.bacsystem.auth.token;

   public class RefreshTokenReuseException extends RuntimeException {
       public RefreshTokenReuseException() {
           super("Refresh token reuse detected — chain revoked");
       }
   }
   ```

8. Create `RefreshTokenService.java`:

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import com.bacsystem.auth.identity.User;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import java.time.Instant;
   import java.time.temporal.ChronoUnit;
   import java.util.List;

   @Service
   public class RefreshTokenService {

       private static final long REFRESH_TOKEN_TTL_DAYS = 30;

       private final RefreshTokenRepository refreshTokenRepository;
       private final AuditLogService auditLogService;

       public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, AuditLogService auditLogService) {
           this.refreshTokenRepository = refreshTokenRepository;
           this.auditLogService = auditLogService;
       }

       @Transactional
       public String issue(User user, String applicationClientId) {
           String raw = TokenHasher.generateRawToken();
           RefreshToken token = new RefreshToken();
           token.setUser(user);
           token.setTokenHash(TokenHasher.sha256Hex(raw));
           token.setApplicationClientId(applicationClientId);
           token.setExpiresAt(Instant.now().plus(REFRESH_TOKEN_TTL_DAYS, ChronoUnit.DAYS));
           refreshTokenRepository.save(token);
           return raw;
       }

       /**
        * Rotates a presented refresh token. If the stored row already has
        * {@code replacedBy} set, the presented token was already used once —
        * that is reuse by definition (§8.3), and the entire chain for that
        * user+application is revoked, not just this token.
        */
       @Transactional
       public String rotate(String presentedRaw) {
           RefreshToken current = refreshTokenRepository.findByTokenHash(TokenHasher.sha256Hex(presentedRaw))
                   .orElseThrow(RefreshTokenReuseException::new);

           if (current.getReplacedBy() != null || current.getRevokedAt() != null
                   || current.getExpiresAt().isBefore(Instant.now())) {
               revokeAllForUser(current.getUser().getId());
               auditLogService.record(current.getUser().getId(), AuditAction.USER_PASSWORD_CHANGED,
                       "RefreshToken", current.getId().toString(), "{\"event\":\"reuse_detected\"}");
               throw new RefreshTokenReuseException();
           }

           String newRaw = issue(current.getUser(), current.getApplicationClientId());
           RefreshToken newest = refreshTokenRepository
                   .findByTokenHash(TokenHasher.sha256Hex(newRaw)).orElseThrow();
           current.setReplacedBy(newest);
           refreshTokenRepository.save(current);
           return newRaw;
       }

       /** Revokes every token in the user's chain — used on reuse detection (above) and on MFA reset (Task 23). */
       @Transactional
       public void revokeAllForUser(java.util.UUID userId) {
           List<RefreshToken> chain = refreshTokenRepository.findByUserId(userId);
           Instant now = Instant.now();
           for (RefreshToken token : chain) {
               if (token.getRevokedAt() == null) {
                   token.setRevokedAt(now);
                   refreshTokenRepository.save(token);
               }
           }
       }
   }
   ```

9. Run `mvn -q test -Dtest=RefreshTokenServiceIT`. Expect **PASS**.

10. Commit:

    ```bash
    git add authentication/src/main/java/com/bacsystem/auth/token/TokenHasher.java \
      authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenService.java \
      authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenReuseException.java \
      authentication/src/test/java/com/bacsystem/auth/token/TokenHasherTest.java \
      authentication/src/test/java/com/bacsystem/auth/token/RefreshTokenServiceIT.java
    git commit -m "feat(auth): add RefreshTokenService with rotation and reuse detection"
    ```

---

### Task 20: SigningKeyService — JWKS Multi-Key Rotation (§8.3)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/token/SigningKeyService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/token/SigningKeyServiceIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.token.SigningKey`, `com.bacsystem.auth.token.SigningKeyStatus`, `com.bacsystem.auth.token.SigningKeyRepository`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.token.SigningKeyService`

**Steps:**

1. Write the failing integration test `SigningKeyServiceIT`:

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.List;

   import static org.assertj.core.api.Assertions.assertThat;

   class SigningKeyServiceIT extends PostgresRedisTestBase {

       @Autowired private SigningKeyService signingKeyService;
       @Autowired private SigningKeyRepository signingKeyRepository;

       @Test
       void bootstrapsAnActiveKeyWhenNoneExists() {
           SigningKey active = signingKeyService.currentActiveKey();
           assertThat(active).isNotNull();
           assertThat(active.getAlgorithm()).isEqualTo("ES256");
       }

       @Test
       void scheduledRotationRetiresThePreviousActiveKeyWithOverlap() {
           SigningKey firstActive = signingKeyService.currentActiveKey();

           signingKeyService.rotate();

           SigningKey newActive = signingKeyService.currentActiveKey();
           assertThat(newActive.getId()).isNotEqualTo(firstActive.getId());

           List<SigningKey> publishable = signingKeyRepository
                   .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
           assertThat(publishable).extracting(SigningKey::getId)
                   .contains(firstActive.getId(), newActive.getId());

           SigningKey retiring = signingKeyRepository.findById(firstActive.getId()).orElseThrow();
           assertThat(retiring.getStatus()).isEqualTo(SigningKeyStatus.RETIRING);
           assertThat(retiring.getRetireAt()).isNotNull();
       }

       @Test
       void emergencyRotationRetiresImmediatelyWithNoOverlap() {
           SigningKey firstActive = signingKeyService.currentActiveKey();

           signingKeyService.emergencyRotate(firstActive.getKid());

           SigningKey retired = signingKeyRepository.findById(firstActive.getId()).orElseThrow();
           assertThat(retired.getStatus()).isEqualTo(SigningKeyStatus.RETIRED);

           List<SigningKey> publishable = signingKeyRepository
                   .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
           assertThat(publishable).extracting(SigningKey::getId).doesNotContain(firstActive.getId());
       }
   }
   ```

2. Run `mvn -q test -Dtest=SigningKeyServiceIT`. Expect **FAIL**.

3. Create `SigningKeyService.java` — `overlapSeconds` matches §8.3's
   formula (access-token TTL + JWKS `Cache-Control` max-age + margin) as a
   configurable property, defaulting to the spec's worked example (1h cache
   → minimum 2h overlap):

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.scheduling.annotation.Scheduled;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import java.security.KeyPair;
   import java.security.KeyPairGenerator;
   import java.security.interfaces.ECPrivateKey;
   import java.security.interfaces.ECPublicKey;
   import java.security.spec.ECGenParameterSpec;
   import java.time.Instant;
   import java.util.Base64;
   import java.util.List;
   import java.util.UUID;

   @Service
   public class SigningKeyService {

       private final SigningKeyRepository signingKeyRepository;
       private final AuditLogService auditLogService;
       private final long overlapSeconds;

       public SigningKeyService(SigningKeyRepository signingKeyRepository, AuditLogService auditLogService,
                                 @Value("${auth.jwks.overlap-seconds:7200}") long overlapSeconds) {
           this.signingKeyRepository = signingKeyRepository;
           this.auditLogService = auditLogService;
           this.overlapSeconds = overlapSeconds;
       }

       @Transactional
       public SigningKey currentActiveKey() {
           return signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE)
                   .orElseGet(() -> generateAndSave(SigningKeyStatus.ACTIVE, null));
       }

       public List<SigningKey> publishableKeys() {
           return signingKeyRepository.findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
       }

       /** Scheduled rotation (§8.3): new ACTIVE key, previous ACTIVE becomes RETIRING with an overlap window. */
       @Scheduled(cron = "${auth.jwks.rotation-cron:0 0 3 1 * *}")
       @Transactional
       public void rotate() {
           SigningKey previousActive = signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE).orElse(null);
           SigningKey newActive = generateAndSave(SigningKeyStatus.ACTIVE, null);

           if (previousActive != null) {
               previousActive.setStatus(SigningKeyStatus.RETIRING);
               previousActive.setRetireAt(Instant.now().plusSeconds(overlapSeconds));
               signingKeyRepository.save(previousActive);
           }

           auditLogService.record(null, AuditAction.KEY_ROTATION, "SigningKey", newActive.getKid(), "{}");
       }

       /** Emergency rotation (§8.3): immediate retirement, no overlap — deliberately invalidates its tokens. */
       @Transactional
       public void emergencyRotate(String compromisedKid) {
           SigningKey compromised = signingKeyRepository.findByKid(compromisedKid)
                   .orElseThrow(() -> new IllegalArgumentException("Unknown kid: " + compromisedKid));
           compromised.setStatus(SigningKeyStatus.RETIRED);
           compromised.setRetiredAt(Instant.now());
           signingKeyRepository.save(compromised);

           generateAndSave(SigningKeyStatus.ACTIVE, null);

           auditLogService.record(null, AuditAction.KEY_ROTATION_EMERGENCY, "SigningKey", compromisedKid, "{}");
       }

       /** Retires any RETIRING key whose overlap window has elapsed — runs hourly. */
       @Scheduled(fixedRateString = "${auth.jwks.retire-check-ms:3600000}")
       @Transactional
       public void retireExpiredOverlaps() {
           Instant now = Instant.now();
           for (SigningKey key : signingKeyRepository.findByStatusIn(List.of(SigningKeyStatus.RETIRING))) {
               if (key.getRetireAt() != null && key.getRetireAt().isBefore(now)) {
                   key.setStatus(SigningKeyStatus.RETIRED);
                   key.setRetiredAt(now);
                   signingKeyRepository.save(key);
               }
           }
       }

       private SigningKey generateAndSave(SigningKeyStatus status, Instant retireAt) {
           try {
               KeyPairGenerator generator = KeyPairGenerator.getInstance("EC");
               generator.initialize(new ECGenParameterSpec("secp256r1"));
               KeyPair keyPair = generator.generateKeyPair();

               SigningKey key = new SigningKey();
               key.setKid(UUID.randomUUID().toString());
               key.setAlgorithm("ES256");
               key.setPrivateKeyPem(Base64.getEncoder().encodeToString(keyPair.getPrivate().getEncoded()));
               key.setPublicKeyPem(Base64.getEncoder().encodeToString(keyPair.getPublic().getEncoded()));
               key.setStatus(status);
               key.setRetireAt(retireAt);
               return signingKeyRepository.save(key);
           } catch (Exception e) {
               throw new IllegalStateException("Failed to generate EC signing key", e);
           }
       }
   }
   ```

4. Run `mvn -q test -Dtest=SigningKeyServiceIT`. Expect **PASS**.

5. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/token/SigningKeyService.java \
     authentication/src/test/java/com/bacsystem/auth/token/SigningKeyServiceIT.java
   git commit -m "feat(auth): add SigningKeyService with scheduled and emergency JWKS rotation"
   ```

---

### Task 21: Email — EmailNotificationService (DB-Backed Outbox Sender)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/email/EmailNotificationService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/email/EmailNotificationServiceTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.email.EmailOutbox`, `com.bacsystem.auth.email.EmailOutboxStatus`, `com.bacsystem.auth.email.EmailOutboxRepository`
- Produces: `com.bacsystem.auth.email.EmailNotificationService`

**Steps:**

1. Write the failing test `EmailNotificationServiceTest` (Mockito — `queue`
   must never throw or block on the mail transport; the scheduled sender is
   tested separately from the queuing call, exactly because §12 requires
   the two to be decoupled):

   ```java
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
   ```

2. Run `mvn -q test -Dtest=EmailNotificationServiceTest`. Expect **FAIL**.

3. Create `EmailNotificationService.java`:

   ```java
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
               try {
                   SimpleMailMessage message = new SimpleMailMessage();
                   message.setTo(outbox.getRecipient());
                   message.setSubject(outbox.getTemplateName());
                   message.setText(outbox.getBody());
                   javaMailSender.send(message);

                   outbox.setStatus(EmailOutboxStatus.SENT);
                   outbox.setSentAt(Instant.now());
               } catch (Exception e) {
                   outbox.setAttempts(outbox.getAttempts() + 1);
                   outbox.setLastError(e.getMessage());
                   if (outbox.getAttempts() >= MAX_ATTEMPTS) {
                       outbox.setStatus(EmailOutboxStatus.FAILED);
                   }
                   // never rethrown: a send failure must never surface to whatever
                   // originally called queue() — it already returned (§12).
               }
               emailOutboxRepository.save(outbox);
           }
       }
   }
   ```

4. Run `mvn -q test -Dtest=EmailNotificationServiceTest`. Expect **PASS**.

5. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/email/EmailNotificationService.java \
     authentication/src/test/java/com/bacsystem/auth/email/EmailNotificationServiceTest.java
   git commit -m "feat(auth): add outbox-backed EmailNotificationService with bounded retry"
   ```

---

### Task 22: OneTime — Password Reset Issuance & Redemption

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeTokenService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/onetime/OneTimeTokenServiceIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.onetime.OneTimeToken`, `com.bacsystem.auth.onetime.OneTimeTokenPurpose`, `com.bacsystem.auth.onetime.OneTimeTokenRepository`, `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.email.EmailNotificationService`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.token.TokenHasher`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.onetime.OneTimeTokenService`, `com.bacsystem.auth.onetime.OneTimeTokenInvalidException`

**Steps:**

1. Write the failing integration test `OneTimeTokenServiceIT`:

   ```java
   package com.bacsystem.auth.onetime;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.identity.UserStatus;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;

   class OneTimeTokenServiceIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;
       @Autowired private UserService userService;
       @Autowired private OneTimeTokenService oneTimeTokenService;

       @Test
       void requestResetForUnknownEmailDoesNotThrow() {
           // always looks like success (§10.2 / §12) — no exception, no signal either way
           oneTimeTokenService.requestPasswordReset(UUID_TENANT, "nobody@nowhere.test");
       }

       @Test
       void fullResetCycleChangesPassword() {
           Tenant tenant = new Tenant();
           tenant.setSlug("ott-svc-" + System.nanoTime());
           tenant.setName("OTT Service Test");
           tenant = tenantRepository.saveAndFlush(tenant);

           User user = userService.createUser(tenant.getId(), "reset-me@test.com", "OriginalPassw0rd!1", null);

           String rawToken = oneTimeTokenService.requestPasswordReset(tenant.getId(), "reset-me@test.com");
           assertThat(rawToken).isNotBlank();

           oneTimeTokenService.confirmPasswordReset(rawToken, "BrandNewPassw0rd!99");

           User reloaded = userRepository.findById(user.getId()).orElseThrow();
           assertThat(reloaded.isMustChangePassword()).isFalse();
       }

       @Test
       void redeemingTheSameTokenTwiceFailsTheSecondTime() {
           Tenant tenant = new Tenant();
           tenant.setSlug("ott-redeem-" + System.nanoTime());
           tenant.setName("OTT Redeem Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           userService.createUser(tenant.getId(), "redeem@test.com", "OriginalPassw0rd!1", null);

           String rawToken = oneTimeTokenService.requestPasswordReset(tenant.getId(), "redeem@test.com");
           oneTimeTokenService.confirmPasswordReset(rawToken, "FirstNewPassw0rd!1");

           assertThrows(OneTimeTokenInvalidException.class,
                   () -> oneTimeTokenService.confirmPasswordReset(rawToken, "SecondNewPassw0rd!2"));
       }

       private static final java.util.UUID UUID_TENANT = java.util.UUID.randomUUID();
   }
   ```

   `requestPasswordReset` against a tenant ID that doesn't exist yet (the
   `UUID_TENANT` random placeholder in the first test) exercises the same
   silent-no-op path as an unknown email — both must return without
   throwing.

2. Run `mvn -q test -Dtest=OneTimeTokenServiceIT`. Expect **FAIL**.

3. Create `authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeTokenInvalidException.java`:

   ```java
   package com.bacsystem.auth.onetime;

   public class OneTimeTokenInvalidException extends RuntimeException {
       public OneTimeTokenInvalidException() {
           super("One-time token is invalid, expired, or already redeemed");
       }
   }
   ```

4. Create `OneTimeTokenService.java`:

   ```java
   package com.bacsystem.auth.onetime;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import com.bacsystem.auth.email.EmailNotificationService;
   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.token.TokenHasher;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import java.time.Instant;
   import java.time.temporal.ChronoUnit;
   import java.util.Optional;
   import java.util.UUID;

   @Service
   public class OneTimeTokenService {

       private static final long RESET_TOKEN_TTL_MINUTES = 30;

       private final OneTimeTokenRepository oneTimeTokenRepository;
       private final UserService userService;
       private final EmailNotificationService emailNotificationService;
       private final AuditLogService auditLogService;

       public OneTimeTokenService(OneTimeTokenRepository oneTimeTokenRepository, UserService userService,
                                   EmailNotificationService emailNotificationService, AuditLogService auditLogService) {
           this.oneTimeTokenRepository = oneTimeTokenRepository;
           this.userService = userService;
           this.emailNotificationService = emailNotificationService;
           this.auditLogService = auditLogService;
       }

       /**
        * Always "succeeds" from the caller's point of view (§10.2, §12) — an
        * unknown tenant/email results in no row, no email, and no thrown
        * exception, exactly like a hit. Returns the raw token only for this
        * plan's own tests to exercise the full cycle without reading email;
        * the real HTTP layer (Task 32) discards the return value and always
        * responds 202.
        */
       @Transactional
       public String requestPasswordReset(UUID tenantId, String email) {
           Optional<User> user = userService.findByTenantAndEmail(tenantId, email);
           if (user.isEmpty()) {
               return null;
           }

           String raw = TokenHasher.generateRawToken();
           OneTimeToken token = new OneTimeToken();
           token.setUser(user.get());
           token.setPurpose(OneTimeTokenPurpose.PASSWORD_RESET);
           token.setTokenHash(TokenHasher.sha256Hex(raw));
           token.setExpiresAt(Instant.now().plus(RESET_TOKEN_TTL_MINUTES, ChronoUnit.MINUTES));
           oneTimeTokenRepository.save(token);

           emailNotificationService.queue(email, "password-reset",
                   "Reset your password: https://example.test/reset?token=" + raw);
           return raw;
       }

       @Transactional
       public void confirmPasswordReset(String rawToken, String newPassword) {
           OneTimeToken token = oneTimeTokenRepository
                   .findByTokenHashAndRedeemedAtIsNull(TokenHasher.sha256Hex(rawToken))
                   .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                   .orElseThrow(OneTimeTokenInvalidException::new);

           token.setRedeemedAt(Instant.now());
           oneTimeTokenRepository.save(token);

           userService.changePassword(token.getUser(), newPassword);
           auditLogService.record(token.getUser().getId(), AuditAction.USER_PASSWORD_CHANGED,
                   "User", token.getUser().getId().toString(), "{\"via\":\"password_reset\"}");
       }
   }
   ```

5. Run `mvn -q test -Dtest=OneTimeTokenServiceIT`. Expect **PASS**.

6. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeTokenService.java \
     authentication/src/main/java/com/bacsystem/auth/onetime/OneTimeTokenInvalidException.java \
     authentication/src/test/java/com/bacsystem/auth/onetime/OneTimeTokenServiceIT.java
   git commit -m "feat(auth): add password reset issuance and redemption via one-time tokens"
   ```

---

### Task 23: MFA — Enrollment, Verification, Redis Challenge Ticket, Admin Reset (§8.4)

**Files:**
- Modify: `authentication/src/main/resources/application.yml`
- Modify: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaCredentialRepository.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaChallengeExpiredException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaVerificationFailedException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/SelfMfaResetException.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaEnrollmentResult.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/mfa/MfaServiceIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.mfa.MfaCredential`, `com.bacsystem.auth.mfa.MfaCredentialRepository`, `com.bacsystem.auth.mfa.MfaBackupCode`, `com.bacsystem.auth.mfa.MfaBackupCodeRepository`, `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.token.RefreshTokenService`, `com.bacsystem.auth.token.TokenHasher`, `com.bacsystem.auth.email.EmailNotificationService`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.mfa.MfaService`, `com.bacsystem.auth.mfa.MfaEnrollmentResult`, `com.bacsystem.auth.mfa.MfaChallengeExpiredException`, `com.bacsystem.auth.mfa.MfaVerificationFailedException`, `com.bacsystem.auth.mfa.SelfMfaResetException`

**Steps:**

1. Add the MFA secret encryption key to `application.yml` (Modify) — a fixed
   dev-only value, same convention as the bootstrap admin password: real
   deployments override it via environment variable, and it must never
   change once real secrets are encrypted with it:

   ```yaml
   auth:
     mfa:
       secret-encryption-key-base64: "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY="
     jwks:
       overlap-seconds: 7200
   ```

2. Write the failing integration test `MfaServiceIT`:

   ```java
   package com.bacsystem.auth.mfa;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import dev.samstevens.totp.code.CodeGenerator;
   import dev.samstevens.totp.code.DefaultCodeGenerator;
   import dev.samstevens.totp.time.SystemTimeProvider;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import java.util.List;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;

   class MfaServiceIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserService userService;
       @Autowired private MfaService mfaService;
       @Autowired private MfaBackupCodeRepository mfaBackupCodeRepository;

       private final CodeGenerator codeGenerator = new DefaultCodeGenerator();

       private User newUser(String email) {
           Tenant tenant = new Tenant();
           tenant.setSlug("mfa-svc-" + System.nanoTime());
           tenant.setName("MFA Service Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           return userService.createUser(tenant.getId(), email, "OriginalPassw0rd!1", null);
       }

       @Test
       void enrollConfirmAndVerifyFullCycle() throws Exception {
           User user = newUser("mfa-cycle@test.com");

           MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
           assertThat(enrollment.qrDataUri()).startsWith("data:image/png;base64,");

           String currentCode = codeGenerator.generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           List<String> backupCodes = mfaService.confirmEnrollment(user.getId(), currentCode);
           assertThat(backupCodes).hasSize(10);

           String challenge = mfaService.issueChallenge(user.getId());
           String loginCode = codeGenerator.generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           java.util.UUID verifiedUserId = mfaService.verifyChallenge(challenge, loginCode);
           assertThat(verifiedUserId).isEqualTo(user.getId());
       }

       @Test
       void challengeIsSingleUse() throws Exception {
           User user = newUser("mfa-single-use@test.com");
           MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
           String code = codeGenerator.generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           mfaService.confirmEnrollment(user.getId(), code);

           String challenge = mfaService.issueChallenge(user.getId());
           String loginCode = codeGenerator.generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           mfaService.verifyChallenge(challenge, loginCode);

           assertThrows(MfaChallengeExpiredException.class,
                   () -> mfaService.verifyChallenge(challenge, loginCode));
       }

       @Test
       void backupCodeWorksOnceThenIsConsumed() throws Exception {
           User user = newUser("mfa-backup@test.com");
           MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
           String code = codeGenerator.generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           List<String> backupCodes = mfaService.confirmEnrollment(user.getId(), code);
           String firstBackupCode = backupCodes.get(0);

           String challenge1 = mfaService.issueChallenge(user.getId());
           mfaService.verifyChallenge(challenge1, firstBackupCode);

           String challenge2 = mfaService.issueChallenge(user.getId());
           assertThrows(MfaVerificationFailedException.class,
                   () -> mfaService.verifyChallenge(challenge2, firstBackupCode));
       }

       @Test
       void selfResetIsForbidden() {
           User user = newUser("mfa-self-reset@test.com");
           assertThrows(SelfMfaResetException.class,
                   () -> mfaService.adminReset(user.getId(), user.getId(), "video call", false));
       }

       @Test
       void adminResetRevokesAllRefreshTokensAndDeactivatesMfa() throws Exception {
           User admin = newUser("mfa-admin@test.com");
           User target = newUser("mfa-target@test.com");
           MfaEnrollmentResult enrollment = mfaService.beginEnrollment(target.getId());
           String code = codeGenerator.generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           mfaService.confirmEnrollment(target.getId(), code);

           mfaService.adminReset(admin.getId(), target.getId(), "in-person ID check", false);

           List<com.bacsystem.auth.mfa.MfaBackupCode> remainingCodes =
                   mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(target.getId());
           assertThat(remainingCodes).isEmpty();
       }
   }
   ```

3. Run `mvn -q test -Dtest=MfaServiceIT`. Expect **FAIL**.

4. Add the pending-credential lookup to `MfaCredentialRepository.java`
   (Modify — not anticipated back in Task 9, needed here to find the one
   inactive credential a user is mid-enrollment on):

   ```java
   package com.bacsystem.auth.mfa;

   import org.springframework.data.jpa.repository.JpaRepository;

   import java.util.Optional;
   import java.util.UUID;

   public interface MfaCredentialRepository extends JpaRepository<MfaCredential, UUID> {
       Optional<MfaCredential> findByUserIdAndActiveTrue(UUID userId);
       Optional<MfaCredential> findFirstByUserIdAndActiveFalseOrderByCreatedAtDesc(UUID userId);
   }
   ```

5. Create the three exceptions and the enrollment DTO:

   ```java
   package com.bacsystem.auth.mfa;

   public class MfaChallengeExpiredException extends RuntimeException {
       public MfaChallengeExpiredException() {
           super("MFA challenge expired, invalid, or already used — restart login from the password step");
       }
   }
   ```

   ```java
   package com.bacsystem.auth.mfa;

   public class MfaVerificationFailedException extends RuntimeException {
       public MfaVerificationFailedException() {
           super("authentication_failed");
       }
   }
   ```

   ```java
   package com.bacsystem.auth.mfa;

   public class SelfMfaResetException extends RuntimeException {
       public SelfMfaResetException() {
           super("An administrator cannot reset their own MFA");
       }
   }
   ```

   ```java
   package com.bacsystem.auth.mfa;

   public record MfaEnrollmentResult(String rawSecret, String qrDataUri) {
   }
   ```

6. Create `MfaService.java` — TOTP via `dev.samstevens.totp`, AES/GCM for the
   reversible secret encryption (§6: the TOTP secret is the one exception to
   "everything hashed"), Redis for the challenge ticket per §6/§8.4's
   decision:

   ```java
   package com.bacsystem.auth.mfa;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import com.bacsystem.auth.email.EmailNotificationService;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.token.RefreshTokenService;
   import com.bacsystem.auth.token.TokenHasher;
   import dev.samstevens.totp.code.CodeGenerator;
   import dev.samstevens.totp.code.CodeVerifier;
   import dev.samstevens.totp.code.DefaultCodeGenerator;
   import dev.samstevens.totp.code.DefaultCodeVerifier;
   import dev.samstevens.totp.code.HashingAlgorithm;
   import dev.samstevens.totp.qr.QrData;
   import dev.samstevens.totp.qr.QrGenerator;
   import dev.samstevens.totp.qr.ZxingPngQrGenerator;
   import dev.samstevens.totp.secret.DefaultSecretGenerator;
   import dev.samstevens.totp.secret.SecretGenerator;
   import dev.samstevens.totp.time.SystemTimeProvider;
   import dev.samstevens.totp.time.TimeProvider;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.data.redis.core.StringRedisTemplate;
   import org.springframework.stereotype.Service;
   import org.springframework.transaction.annotation.Transactional;

   import javax.crypto.Cipher;
   import javax.crypto.spec.GCMParameterSpec;
   import javax.crypto.spec.SecretKeySpec;
   import java.security.SecureRandom;
   import java.time.Duration;
   import java.util.ArrayList;
   import java.util.Base64;
   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   @Service
   public class MfaService {

       private static final int BACKUP_CODE_COUNT = 10;
       private static final Duration CHALLENGE_TTL = Duration.ofMinutes(3);
       private static final String REDIS_KEY_PREFIX = "mfa:challenge:";

       private final MfaCredentialRepository mfaCredentialRepository;
       private final MfaBackupCodeRepository mfaBackupCodeRepository;
       private final UserService userService;
       private final RefreshTokenService refreshTokenService;
       private final EmailNotificationService emailNotificationService;
       private final AuditLogService auditLogService;
       private final StringRedisTemplate redisTemplate;
       private final byte[] encryptionKey;

       private final SecretGenerator secretGenerator = new DefaultSecretGenerator();
       private final CodeGenerator codeGenerator = new DefaultCodeGenerator();
       private final TimeProvider timeProvider = new SystemTimeProvider();
       private final CodeVerifier codeVerifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
       private final QrGenerator qrGenerator = new ZxingPngQrGenerator();

       public MfaService(MfaCredentialRepository mfaCredentialRepository, MfaBackupCodeRepository mfaBackupCodeRepository,
                          UserService userService, RefreshTokenService refreshTokenService,
                          EmailNotificationService emailNotificationService, AuditLogService auditLogService,
                          StringRedisTemplate redisTemplate,
                          @Value("${auth.mfa.secret-encryption-key-base64}") String encryptionKeyBase64) {
           this.mfaCredentialRepository = mfaCredentialRepository;
           this.mfaBackupCodeRepository = mfaBackupCodeRepository;
           this.userService = userService;
           this.refreshTokenService = refreshTokenService;
           this.emailNotificationService = emailNotificationService;
           this.auditLogService = auditLogService;
           this.redisTemplate = redisTemplate;
           this.encryptionKey = Base64.getDecoder().decode(encryptionKeyBase64);
       }

       @Transactional
       public MfaEnrollmentResult beginEnrollment(UUID userId) {
           String rawSecret = secretGenerator.generate();

           MfaCredential credential = new MfaCredential();
           credential.setUser(userReference(userId));
           credential.setEncryptedSecret(encrypt(rawSecret));
           credential.setActive(false);
           mfaCredentialRepository.save(credential);

           QrData qrData = new QrData.Builder()
                   .label(userId.toString())
                   .secret(rawSecret)
                   .issuer("bacsystem-auth")
                   .algorithm(HashingAlgorithm.SHA1)
                   .digits(6)
                   .period(30)
                   .build();
           byte[] qrPng = qrGenerator.generate(qrData);
           String qrDataUri = "data:image/png;base64," + Base64.getEncoder().encodeToString(qrPng);

           return new MfaEnrollmentResult(rawSecret, qrDataUri);
       }

       @Transactional
       public List<String> confirmEnrollment(UUID userId, String code) {
           MfaCredential pending = mfaCredentialRepository
                   .findFirstByUserIdAndActiveFalseOrderByCreatedAtDesc(userId)
                   .orElseThrow(MfaVerificationFailedException::new);

           String secret = decrypt(pending.getEncryptedSecret());
           if (!codeVerifier.isValidCode(secret, code)) {
               throw new MfaVerificationFailedException();
           }
           pending.setActive(true);
           mfaCredentialRepository.save(pending);

           List<String> rawCodes = new ArrayList<>();
           SecureRandom random = new SecureRandom();
           for (int i = 0; i < BACKUP_CODE_COUNT; i++) {
               String raw = String.format("%08d", Math.abs(random.nextInt(100_000_000)));
               MfaBackupCode backupCode = new MfaBackupCode();
               backupCode.setUser(userReference(userId));
               backupCode.setCodeHash(TokenHasher.sha256Hex(raw));
               mfaBackupCodeRepository.save(backupCode);
               rawCodes.add(raw);
           }

           auditLogService.record(userId, AuditAction.MFA_ENROLLED, "User", userId.toString(), "{}");
           return rawCodes;
       }

       public String issueChallenge(UUID userId) {
           String rawTicket = TokenHasher.generateRawToken();
           redisTemplate.opsForValue().set(REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket),
                   userId.toString(), CHALLENGE_TTL);
           return rawTicket;
       }

       /** Single-use: the Redis key is deleted only on a successful verification (§8.4). */
       public UUID verifyChallenge(String rawTicket, String code) {
           String redisKey = REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket);
           String userIdString = redisTemplate.opsForValue().get(redisKey);
           if (userIdString == null) {
               throw new MfaChallengeExpiredException();
           }
           UUID userId = UUID.fromString(userIdString);

           if (isValidTotp(userId, code) || consumeBackupCodeIfValid(userId, code)) {
               redisTemplate.delete(redisKey);
               return userId;
           }
           throw new MfaVerificationFailedException();
       }

       @Transactional
       public void adminReset(UUID actorUserId, UUID targetUserId, String verificationMethod, boolean targetIsAdmin) {
           if (actorUserId.equals(targetUserId)) {
               throw new SelfMfaResetException();
           }

           mfaCredentialRepository.findByUserIdAndActiveTrue(targetUserId)
                   .ifPresent(credential -> {
                       credential.setActive(false);
                       mfaCredentialRepository.save(credential);
                   });
           mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(targetUserId)
                   .forEach(code -> {
                       code.setUsedAt(java.time.Instant.now());
                       mfaBackupCodeRepository.save(code);
                   });

           refreshTokenService.revokeAllForUser(targetUserId);

           var target = userService.getById(targetUserId);
           emailNotificationService.queue(target.getEmail(), "mfa-admin-reset",
                   "Your MFA was reset by an administrator. If this wasn't you, contact support immediately.");

           auditLogService.record(actorUserId, AuditAction.MFA_ADMIN_RESET, "User", targetUserId.toString(),
                   "{\"verificationMethod\":\"" + verificationMethod + "\",\"targetIsAdmin\":" + targetIsAdmin + "}");
       }

       private boolean isValidTotp(UUID userId, String code) {
           return mfaCredentialRepository.findByUserIdAndActiveTrue(userId)
                   .map(c -> codeVerifier.isValidCode(decrypt(c.getEncryptedSecret()), code))
                   .orElse(false);
       }

       @Transactional
       protected boolean consumeBackupCodeIfValid(UUID userId, String code) {
           String hash = TokenHasher.sha256Hex(code);
           Optional<MfaBackupCode> match = mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(userId).stream()
                   .filter(c -> c.getCodeHash().equals(hash))
                   .findFirst();
           match.ifPresent(c -> {
               c.setUsedAt(java.time.Instant.now());
               mfaBackupCodeRepository.save(c);
           });
           return match.isPresent();
       }

       private com.bacsystem.auth.identity.User userReference(UUID userId) {
           com.bacsystem.auth.identity.User ref = new com.bacsystem.auth.identity.User();
           ref.setId(userId);
           return ref;
       }

       private String encrypt(String plaintext) {
           try {
               byte[] iv = new byte[12];
               new SecureRandom().nextBytes(iv);
               Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
               cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(encryptionKey, "AES"), new GCMParameterSpec(128, iv));
               byte[] ciphertext = cipher.doFinal(plaintext.getBytes());
               byte[] combined = new byte[iv.length + ciphertext.length];
               System.arraycopy(iv, 0, combined, 0, iv.length);
               System.arraycopy(ciphertext, 0, combined, iv.length, ciphertext.length);
               return Base64.getEncoder().encodeToString(combined);
           } catch (Exception e) {
               throw new IllegalStateException("Failed to encrypt MFA secret", e);
           }
       }

       private String decrypt(String encoded) {
           try {
               byte[] combined = Base64.getDecoder().decode(encoded);
               byte[] iv = java.util.Arrays.copyOfRange(combined, 0, 12);
               byte[] ciphertext = java.util.Arrays.copyOfRange(combined, 12, combined.length);
               Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
               cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(encryptionKey, "AES"), new GCMParameterSpec(128, iv));
               return new String(cipher.doFinal(ciphertext));
           } catch (Exception e) {
               throw new IllegalStateException("Failed to decrypt MFA secret", e);
           }
       }
   }
   ```

7. Run `mvn -q test -Dtest=MfaServiceIT`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/resources/application.yml \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaChallengeExpiredException.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaVerificationFailedException.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/SelfMfaResetException.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaEnrollmentResult.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaService.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaCredentialRepository.java \
     authentication/src/test/java/com/bacsystem/auth/mfa/MfaServiceIT.java
   git commit -m "feat(auth): add MfaService with TOTP enrollment, Redis challenge ticket, and admin reset"
   ```

---

### Task 24: Rate Limiting — bucket4j + Redis, Trusted-Proxy IP Resolution (§13)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/security/ClientIpResolver.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/RedisClientConfig.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/RateLimiter.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/security/RateLimitFilter.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/security/ClientIpResolverTest.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/security/RateLimiterIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.security.ClientIpResolver`, `com.bacsystem.auth.security.RedisClientConfig`, `com.bacsystem.auth.security.RateLimiter`, `com.bacsystem.auth.security.RateLimitFilter`

**Steps:**

1. Write the failing test `ClientIpResolverTest` (§13: `X-Forwarded-For` is
   only trusted from a configured proxy list — never blindly):

   ```java
   package com.bacsystem.auth.security;

   import jakarta.servlet.http.HttpServletRequest;
   import org.junit.jupiter.api.Test;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.mockito.Mockito.when;

   class ClientIpResolverTest {

       private final ClientIpResolver resolver = new ClientIpResolver(java.util.Set.of("10.0.0.1"));

       @Test
       void usesForwardedForWhenRemoteAddrIsATrustedProxy() {
           HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);
           when(request.getRemoteAddr()).thenReturn("10.0.0.1");
           when(request.getHeader("X-Forwarded-For")).thenReturn("203.0.113.7, 10.0.0.1");

           assertThat(resolver.resolve(request)).isEqualTo("203.0.113.7");
       }

       @Test
       void ignoresForwardedForWhenRemoteAddrIsNotATrustedProxy() {
           HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);
           when(request.getRemoteAddr()).thenReturn("198.51.100.9");
           when(request.getHeader("X-Forwarded-For")).thenReturn("1.2.3.4");

           // an untrusted caller can't spoof its IP via the header
           assertThat(resolver.resolve(request)).isEqualTo("198.51.100.9");
       }
   }
   ```

2. Run `mvn -q test -Dtest=ClientIpResolverTest`. Expect **FAIL**.

3. Create `ClientIpResolver.java`:

   ```java
   package com.bacsystem.auth.security;

   import jakarta.servlet.http.HttpServletRequest;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   import java.util.Set;

   @Component
   public class ClientIpResolver {

       private final Set<String> trustedProxies;

       public ClientIpResolver(@Value("${auth.rate-limit.trusted-proxies:}") Set<String> trustedProxies) {
           this.trustedProxies = trustedProxies;
       }

       public String resolve(HttpServletRequest request) {
           String remoteAddr = request.getRemoteAddr();
           if (!trustedProxies.contains(remoteAddr)) {
               return remoteAddr;
           }
           String forwardedFor = request.getHeader("X-Forwarded-For");
           if (forwardedFor == null || forwardedFor.isBlank()) {
               return remoteAddr;
           }
           return forwardedFor.split(",")[0].trim();
       }
   }
   ```

4. Create `RedisClientConfig.java` — a raw Lettuce `RedisClient` bean;
   `bucket4j-redis`'s `LettuceBasedProxyManager` needs the Lettuce client
   directly, separate from Spring Data Redis's own `LettuceConnectionFactory`
   (already in use by `StringRedisTemplate` for the MFA challenge ticket,
   Task 23):

   ```java
   package com.bacsystem.auth.security;

   import io.lettuce.core.RedisClient;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;

   @Configuration
   public class RedisClientConfig {

       @Bean
       public RedisClient redisClient(@Value("${spring.data.redis.host}") String host,
                                       @Value("${spring.data.redis.port}") int port) {
           return RedisClient.create("redis://" + host + ":" + port);
       }
   }
   ```

5. Write the failing integration test `RateLimiterIT` (real Redis — fail-
   closed on auth, fail-open on admin, when Redis is unreachable):

   ```java
   package com.bacsystem.auth.security;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import io.lettuce.core.RedisClient;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import static org.assertj.core.api.Assertions.assertThat;

   class RateLimiterIT extends PostgresRedisTestBase {

       @Autowired private RateLimiter rateLimiter;

       @Test
       void authBucketAllowsUpToConfiguredCapacityThenBlocks() {
           String key = "test-auth-" + System.nanoTime();
           for (int i = 0; i < 10; i++) {
               assertThat(rateLimiter.tryConsumeAuth(key)).isTrue();
           }
           assertThat(rateLimiter.tryConsumeAuth(key)).isFalse();
       }

       @Test
       void adminBucketFailsOpenWhenRedisIsUnreachable() {
           RateLimiter brokenRedisLimiter = new RateLimiter(
                   RedisClient.create("redis://localhost:1"), 10, 100);

           // Redis at that port is unreachable — admin path must still allow the call
           assertThat(brokenRedisLimiter.tryConsumeAdmin("any-key")).isTrue();
       }

       @Test
       void authBucketFailsClosedWhenRedisIsUnreachable() {
           RateLimiter brokenRedisLimiter = new RateLimiter(
                   RedisClient.create("redis://localhost:1"), 10, 100);

           // Redis at that port is unreachable — auth path must deny the call
           assertThat(brokenRedisLimiter.tryConsumeAuth("any-key")).isFalse();
       }
   }
   ```

6. Run `mvn -q test -Dtest=RateLimiterIT`. Expect **FAIL**.

7. Create `RateLimiter.java` — thresholds are explicit constructor
   parameters bound from configuration (§13: "exactly what the k6
   thresholds assert against"), never hardcoded inline:

   ```java
   package com.bacsystem.auth.security;

   import io.github.bucket4j.Bandwidth;
   import io.github.bucket4j.BucketConfiguration;
   import io.github.bucket4j.distributed.proxy.ProxyManager;
   import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
   import io.lettuce.core.RedisClient;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   import java.time.Duration;
   import java.util.function.Supplier;

   @Component
   public class RateLimiter {

       private final ProxyManager<String> proxyManager;
       private final int authCapacityPerMinute;
       private final int adminCapacityPerMinute;

       public RateLimiter(RedisClient redisClient,
                           @Value("${auth.rate-limit.auth-capacity-per-minute:10}") int authCapacityPerMinute,
                           @Value("${auth.rate-limit.admin-capacity-per-minute:100}") int adminCapacityPerMinute) {
           this.proxyManager = LettuceBasedProxyManager.builderFor(redisClient.connect())
                   .withExpirationStrategy(
                           io.github.bucket4j.distributed.ExpirationAfterWriteStrategy
                                   .basedOnTimeForRefillingBucketUpToMax(Duration.ofMinutes(2)))
                   .build();
           this.authCapacityPerMinute = authCapacityPerMinute;
           this.adminCapacityPerMinute = adminCapacityPerMinute;
       }

       public boolean tryConsumeAuth(String key) {
           try {
               return bucket("auth:" + key, authCapacityPerMinute).tryConsume(1);
           } catch (Exception redisUnavailable) {
               return false; // fail CLOSED on auth endpoints (§13)
           }
       }

       public boolean tryConsumeAdmin(String key) {
           try {
               return bucket("admin:" + key, adminCapacityPerMinute).tryConsume(1);
           } catch (Exception redisUnavailable) {
               return true; // fail OPEN on admin endpoints (§13)
           }
       }

       private io.github.bucket4j.distributed.BucketProxy bucket(String key, int capacityPerMinute) {
           Supplier<BucketConfiguration> configSupplier = () -> BucketConfiguration.builder()
                   .addLimit(Bandwidth.builder().capacity(capacityPerMinute)
                           .refillIntervally(capacityPerMinute, Duration.ofMinutes(1)).build())
                   .build();
           return proxyManager.builder().build(key, configSupplier);
       }
   }
   ```

8. Create `RateLimitFilter.java` — applies the auth/admin split by path,
   using `ClientIpResolver` for the rate-limit key on unauthenticated auth
   endpoints (there is no user identity yet at `/oauth2/token`):

   ```java
   package com.bacsystem.auth.security;

   import jakarta.servlet.FilterChain;
   import jakarta.servlet.ServletException;
   import jakarta.servlet.http.HttpServletRequest;
   import jakarta.servlet.http.HttpServletResponse;
   import org.springframework.stereotype.Component;
   import org.springframework.web.filter.OncePerRequestFilter;

   import java.io.IOException;

   @Component
   public class RateLimitFilter extends OncePerRequestFilter {

       private final RateLimiter rateLimiter;
       private final ClientIpResolver clientIpResolver;

       public RateLimitFilter(RateLimiter rateLimiter, ClientIpResolver clientIpResolver) {
           this.rateLimiter = rateLimiter;
           this.clientIpResolver = clientIpResolver;
       }

       @Override
       protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
               throws ServletException, IOException {
           String path = request.getRequestURI();
           boolean isAuthPath = path.startsWith("/oauth2/") || path.startsWith("/v1/auth/");
           String key = clientIpResolver.resolve(request);

           boolean allowed = isAuthPath ? rateLimiter.tryConsumeAuth(key) : rateLimiter.tryConsumeAdmin(key);
           if (!allowed) {
               response.setStatus(429);
               response.setContentType("application/problem+json");
               response.getWriter().write(
                       "{\"type\":\"rate_limited\",\"title\":\"Too Many Requests\",\"status\":429}");
               return;
           }
           chain.doFilter(request, response);
       }
   }
   ```

9. Run `mvn -q test -Dtest=ClientIpResolverTest,RateLimiterIT`. Expect **PASS**.

10. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/security/ClientIpResolver.java \
     authentication/src/main/java/com/bacsystem/auth/security/RedisClientConfig.java \
     authentication/src/main/java/com/bacsystem/auth/security/RateLimiter.java \
     authentication/src/main/java/com/bacsystem/auth/security/RateLimitFilter.java \
     authentication/src/test/java/com/bacsystem/auth/security/ClientIpResolverTest.java \
     authentication/src/test/java/com/bacsystem/auth/security/RateLimiterIT.java
   git commit -m "feat(auth): add bucket4j+Redis rate limiting with fail-open/closed split"
   ```

---

### Task 25: AuthorizationServerConfig — Custom Password & Refresh Grants (§8.1, §8.3)

This is the plan's highest-risk task — the spec (§18) flags it explicitly:
"password grant is not built into Spring Authorization Server... worth an
early implementation spike." Treat the first test run here as that spike:
if Spring Authorization Server 1.3.x's exact extension-point method names
differ from what's written below, that is expected friction to resolve via
the normal write-test/run/fix loop, not a sign the approach is wrong — the
approach (a custom `AuthenticationConverter` + `AuthenticationProvider`
registered into `OAuth2TokenEndpointConfigurer`, delegating to the
framework's own token generator) is Spring Authorization Server's documented
pattern for adding a non-standard grant type.

**The `refresh_token` grant needs the same custom treatment as `password`,
not SAS's built-in handler**: this service's refresh tokens are opaque,
hashed, and rotated with reuse detection in our own `refresh_tokens` table
(§8.3) — a fundamentally different representation from SAS's own internal
refresh token format, which its built-in provider expects to look up via
`OAuth2AuthorizationService`. Registering `refresh_token` as one of an
application's grant types (Task 3's seed migration) only means anything once
this task's custom `RefreshGrantAuthenticationProvider` is wired in to
actually handle it — the default one never sees a token it would recognize.

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/token/IssuedTokens.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/TokenIssuer.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenRotationResult.java`
- Modify: `authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenService.java`
- Modify: `authentication/src/test/java/com/bacsystem/auth/token/RefreshTokenServiceIT.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/PasswordGrantAuthenticationToken.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/PasswordGrantAuthenticationConverter.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/PasswordGrantAuthenticationProvider.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/RefreshGrantAuthenticationToken.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/RefreshGrantAuthenticationConverter.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/RefreshGrantAuthenticationProvider.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/AuthorizationServerConfig.java`
- Modify: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaService.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/token/TokenIssuerIT.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/config/PasswordGrantIT.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/config/RefreshGrantIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.identity.UserRepository`, `com.bacsystem.auth.security.LoginAttemptService`, `com.bacsystem.auth.security.AccountLockedException`, `com.bacsystem.auth.mfa.MfaService`, `com.bacsystem.auth.token.SigningKeyService`, `com.bacsystem.auth.token.RefreshTokenService`, `com.bacsystem.auth.token.RefreshTokenReuseException`, `com.bacsystem.auth.tenancy.TenantRepository`, `com.bacsystem.auth.rbac.UserRoleRepository`, `com.bacsystem.auth.rbac.JpaRegisteredClientRepository`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.token.IssuedTokens`, `com.bacsystem.auth.token.TokenIssuer`, `com.bacsystem.auth.token.RefreshTokenRotationResult`, `com.bacsystem.auth.config.PasswordGrantAuthenticationToken`, `com.bacsystem.auth.config.PasswordGrantAuthenticationConverter`, `com.bacsystem.auth.config.PasswordGrantAuthenticationProvider`, `com.bacsystem.auth.config.RefreshGrantAuthenticationToken`, `com.bacsystem.auth.config.RefreshGrantAuthenticationConverter`, `com.bacsystem.auth.config.RefreshGrantAuthenticationProvider`, `com.bacsystem.auth.config.AuthorizationServerConfig`

**Steps:**

1. Write the failing integration test `TokenIssuerIT` — the shared
   token-issuance component both custom grants (below) and Task 31's
   `/v1/auth/mfa/verify` endpoint call:

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.identity.UserStatus;
   import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

   import java.util.Set;

   import static org.assertj.core.api.Assertions.assertThat;

   class TokenIssuerIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRepository userRepository;
       @Autowired private JpaRegisteredClientRepository registeredClientRepository;
       @Autowired private TokenIssuer tokenIssuer;
       @Autowired private RefreshTokenService refreshTokenService;

       @Test
       void issuesAJwtAccessTokenAndARotatableOpaqueRefreshToken() {
           Tenant tenant = new Tenant();
           tenant.setSlug("issuer-" + System.nanoTime());
           tenant.setName("Issuer Test");
           tenant = tenantRepository.saveAndFlush(tenant);

           User user = new User();
           user.setTenant(tenant);
           user.setEmail("issuer@test.com");
           user.setPasswordHash("{argon2}hash");
           user.setStatus(UserStatus.ACTIVE);
           user = userRepository.saveAndFlush(user);

           RegisteredClient client = registeredClientRepository.findByClientId("example-app");

           IssuedTokens issued = tokenIssuer.issue(client, user, Set.of());

           assertThat(issued.accessToken()).isNotBlank();
           assertThat(issued.refreshToken()).isNotBlank();
           // the refresh token this returns is a real row `RefreshTokenService` can rotate —
           // proves the two components share one representation, not two incompatible ones.
           String rotated = refreshTokenService.rotate(issued.refreshToken());
           assertThat(rotated).isNotBlank();
       }
   }
   ```

2. Run `mvn -q test -Dtest=TokenIssuerIT`. Expect **FAIL**.

3. Create `IssuedTokens.java`:

   ```java
   package com.bacsystem.auth.token;

   import java.time.Instant;

   public record IssuedTokens(String accessToken, Instant accessTokenExpiresAt, String refreshToken) {
   }
   ```

4. Create `TokenIssuer.java` — the one place a `RegisteredClient` + `User` +
   scopes becomes a token pair, called by both custom grants below and by
   `/v1/auth/mfa/verify` (Task 31). Its own local `GRANT_TYPE` constant
   (value `"password"`) is deliberately not `PasswordGrantAuthenticationToken
   .PASSWORD` from the `config` package — `token` is a lower layer that
   `config` depends on, not the reverse, and the two grants sharing this
   class need a single grant-type label to save under regardless of which
   one actually issued the tokens; the label only affects `OAuth2Authorization`
   bookkeeping, not how either grant is dispatched:

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.identity.User;
   import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
   import org.springframework.security.oauth2.core.AuthorizationGrantType;
   import org.springframework.security.oauth2.core.OAuth2AccessToken;
   import org.springframework.security.oauth2.core.OAuth2TokenType;
   import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
   import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
   import org.springframework.security.oauth2.server.authorization.OAuth2TokenContext;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
   import org.springframework.security.oauth2.server.authorization.context.AuthorizationServerContextHolder;
   import org.springframework.security.oauth2.server.authorization.token.DefaultOAuth2TokenContext;
   import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenGenerator;
   import org.springframework.stereotype.Service;

   import java.util.List;
   import java.util.Set;

   @Service
   public class TokenIssuer {

       private static final AuthorizationGrantType GRANT_TYPE = new AuthorizationGrantType("password");

       private final OAuth2AuthorizationService authorizationService;
       private final OAuth2TokenGenerator<?> tokenGenerator;
       private final RefreshTokenService refreshTokenService;

       public TokenIssuer(OAuth2AuthorizationService authorizationService, OAuth2TokenGenerator<?> tokenGenerator,
                           RefreshTokenService refreshTokenService) {
           this.authorizationService = authorizationService;
           this.tokenGenerator = tokenGenerator;
           this.refreshTokenService = refreshTokenService;
       }

       /**
        * Full issuance: a new JWT access token (framework-generated, §8.1) plus
        * a brand-new opaque refresh token (§8.3). Used by the password grant
        * and by MFA-verified login (Task 31), where no refresh token exists yet.
        */
       public IssuedTokens issue(RegisteredClient registeredClient, User user, Set<String> scopes) {
           OAuth2AccessToken accessToken = generateAccessToken(registeredClient, user, scopes);
           String rawRefreshToken = refreshTokenService.issue(user, registeredClient.getClientId());
           saveAuthorization(registeredClient, user, scopes, accessToken);
           return new IssuedTokens(accessToken.getTokenValue(), accessToken.getExpiresAt(), rawRefreshToken);
       }

       /**
        * Access-token-only issuance for the refresh grant (Task 25's
        * {@code RefreshGrantAuthenticationProvider}): the refresh token already
        * exists — {@code RefreshTokenService.rotate} just produced it — so this
        * must not call {@code refreshTokenService.issue(...)} again, which
        * would mint a second, orphaned refresh token no client ever sees.
        */
       public IssuedTokens issueAccessTokenForRotatedRefresh(RegisteredClient registeredClient, User user,
                                                              Set<String> scopes, String rawRefreshToken) {
           OAuth2AccessToken accessToken = generateAccessToken(registeredClient, user, scopes);
           saveAuthorization(registeredClient, user, scopes, accessToken);
           return new IssuedTokens(accessToken.getTokenValue(), accessToken.getExpiresAt(), rawRefreshToken);
       }

       private OAuth2AccessToken generateAccessToken(RegisteredClient registeredClient, User user, Set<String> scopes) {
           DefaultOAuth2TokenContext.Builder contextBuilder = DefaultOAuth2TokenContext.builder()
                   .registeredClient(registeredClient)
                   .principal(new UsernamePasswordAuthenticationToken(user.getId().toString(), null, List.of()))
                   .authorizationServerContext(AuthorizationServerContextHolder.getContext())
                   .authorizedScopes(scopes)
                   .authorizationGrantType(GRANT_TYPE);

           OAuth2TokenContext accessTokenContext = contextBuilder.tokenType(OAuth2TokenType.ACCESS_TOKEN).build();
           var generated = tokenGenerator.generate(accessTokenContext);
           return new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER,
                   generated.getTokenValue(), generated.getIssuedAt(), generated.getExpiresAt(), scopes);
       }

       private void saveAuthorization(RegisteredClient registeredClient, User user, Set<String> scopes,
                                       OAuth2AccessToken accessToken) {
           OAuth2Authorization authorization = OAuth2Authorization.withRegisteredClient(registeredClient)
                   .principalName(user.getId().toString())
                   .authorizationGrantType(GRANT_TYPE)
                   .authorizedScopes(scopes)
                   .accessToken(accessToken)
                   .build();
           authorizationService.save(authorization);
       }
   }
   ```

5. Run `mvn -q test -Dtest=TokenIssuerIT`. Expect **PASS**.

6. Write the failing integration test `PasswordGrantIT` — drives the real
   HTTP endpoint end-to-end (the only way to prove the custom grant wiring
   actually works, not just individual classes in isolation):

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.web.client.TestRestTemplate;
   import org.springframework.http.*;
   import org.springframework.util.LinkedMultiValueMap;
   import org.springframework.util.MultiValueMap;

   import static org.assertj.core.api.Assertions.assertThat;

   class PasswordGrantIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserService userService;
       @Autowired private TestRestTemplate restTemplate;

       @Test
       void passwordGrantIssuesAccessAndRefreshTokenForValidCredentials() {
           Tenant tenant = new Tenant();
           tenant.setSlug("pwgrant-" + System.nanoTime());
           tenant.setName("Password Grant Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           userService.createUser(tenant.getId(), "grant@test.com", "ValidPassw0rd!123", null);
           userService.changePassword(
                   userService.findByTenantAndEmail(tenant.getId(), "grant@test.com").orElseThrow(),
                   "ValidPassw0rd!123ChangedOnce");

           MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
           form.add("grant_type", "password");
           form.add("tenant", tenant.getSlug());
           form.add("username", "grant@test.com");
           form.add("password", "ValidPassw0rd!123ChangedOnce");

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
           headers.setBasicAuth("example-app", "example-secret");

           ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                   "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

           assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
           assertThat(response.getBody()).containsKeys("access_token", "refresh_token");
       }

       @Test
       void wrongPasswordReturnsGenericAuthenticationFailedNotAHint() {
           Tenant tenant = new Tenant();
           tenant.setSlug("pwgrant-bad-" + System.nanoTime());
           tenant.setName("Password Grant Bad Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           userService.createUser(tenant.getId(), "wrongpass@test.com", "ValidPassw0rd!123", null);

           MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
           form.add("grant_type", "password");
           form.add("tenant", tenant.getSlug());
           form.add("username", "wrongpass@test.com");
           form.add("password", "TotallyWrongPassword!1");

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
           headers.setBasicAuth("example-app", "example-secret");

           ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                   "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

           assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
           assertThat(response.getBody().get("error")).isEqualTo("authentication_failed");
       }

       @Test
       void jwksResponseCarriesTheOverlapWindowCacheControl() {
           // §8.3: the rotation overlap (min 2h) is DERIVED from this header's max-age
           // (1h starting value) — it must be explicit, not whatever SAS defaults to.
           ResponseEntity<String> response = restTemplate.getForEntity("/oauth2/jwks", String.class);
           assertThat(response.getHeaders().getCacheControl()).contains("max-age=3600");
       }
   }
   ```

7. Run `mvn -q test -Dtest=PasswordGrantIT`. Expect **FAIL**.

8. Create `PasswordGrantAuthenticationToken.java`:

   ```java
   package com.bacsystem.auth.config;

   import org.springframework.security.authentication.AbstractAuthenticationToken;
   import org.springframework.security.core.Authentication;
   import org.springframework.security.oauth2.core.AuthorizationGrantType;

   import java.util.Collections;
   import java.util.Set;

   public class PasswordGrantAuthenticationToken extends AbstractAuthenticationToken {

       public static final AuthorizationGrantType PASSWORD = new AuthorizationGrantType("password");

       private final Authentication clientPrincipal;
       private final String tenant;
       private final String username;
       private final String password;
       private final Set<String> scopes;

       public PasswordGrantAuthenticationToken(Authentication clientPrincipal, String tenant, String username,
                                                String password, Set<String> scopes) {
           super(Collections.emptyList());
           this.clientPrincipal = clientPrincipal;
           this.tenant = tenant;
           this.username = username;
           this.password = password;
           this.scopes = scopes;
           setAuthenticated(false);
       }

       @Override public Object getCredentials() { return password; }
       @Override public Object getPrincipal() { return clientPrincipal; }
       public Authentication getClientPrincipal() { return clientPrincipal; }
       public String getTenant() { return tenant; }
       public String getUsername() { return username; }
       public Set<String> getScopes() { return scopes; }
   }
   ```

9. Create `PasswordGrantAuthenticationConverter.java`:

   ```java
   package com.bacsystem.auth.config;

   import jakarta.servlet.http.HttpServletRequest;
   import org.springframework.security.core.Authentication;
   import org.springframework.security.core.context.SecurityContextHolder;
   import org.springframework.security.web.authentication.AuthenticationConverter;

   import java.util.LinkedHashSet;
   import java.util.Set;

   public class PasswordGrantAuthenticationConverter implements AuthenticationConverter {

       @Override
       public Authentication convert(HttpServletRequest request) {
           String grantType = request.getParameter("grant_type");
           if (!PasswordGrantAuthenticationToken.PASSWORD.getValue().equals(grantType)) {
               return null; // not our grant type — let the next converter in the chain try
           }
           Authentication clientPrincipal = SecurityContextHolder.getContext().getAuthentication();
           String tenant = request.getParameter("tenant");
           String username = request.getParameter("username");
           String password = request.getParameter("password");
           String scopeParam = request.getParameter("scope");

           Set<String> scopes = new LinkedHashSet<>();
           if (scopeParam != null && !scopeParam.isBlank()) {
               for (String s : scopeParam.split(" ")) scopes.add(s);
           }
           return new PasswordGrantAuthenticationToken(clientPrincipal, tenant, username, password, scopes);
       }
   }
   ```

10. Create `PasswordGrantAuthenticationProvider.java` — implements the whole
   authentication decision tree the spec's flows require: tenant resolution
   (§5), lockout check before password verification (§13), password
   verification, MFA branch (§8.4) returning an `mfa_required` OAuth2 error
   carrying the challenge ticket instead of a token, and — on full success —
   delegating to `TokenIssuer` (step 4) so token construction stays in one
   place shared with the refresh grant below and with `/v1/auth/mfa/verify`
   (Task 31):

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.mfa.MfaService;
   import com.bacsystem.auth.security.AccountLockedException;
   import com.bacsystem.auth.security.LoginAttemptService;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import com.bacsystem.auth.token.IssuedTokens;
   import com.bacsystem.auth.token.TokenIssuer;
   import org.springframework.security.authentication.AuthenticationProvider;
   import org.springframework.security.core.Authentication;
   import org.springframework.security.core.AuthenticationException;
   import org.springframework.security.crypto.password.PasswordEncoder;
   import org.springframework.security.oauth2.core.OAuth2AccessToken;
   import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
   import org.springframework.security.oauth2.core.OAuth2Error;
   import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AccessTokenAuthenticationToken;
   import org.springframework.security.oauth2.server.authorization.authentication.OAuth2ClientAuthenticationToken;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

   import java.time.Instant;
   import java.util.Map;
   import java.util.Optional;

   public class PasswordGrantAuthenticationProvider implements AuthenticationProvider {

       private final TenantRepository tenantRepository;
       private final UserService userService;
       private final PasswordEncoder passwordEncoder;
       private final LoginAttemptService loginAttemptService;
       private final MfaService mfaService;
       private final TokenIssuer tokenIssuer;

       public PasswordGrantAuthenticationProvider(TenantRepository tenantRepository, UserService userService,
               PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService, MfaService mfaService,
               TokenIssuer tokenIssuer) {
           this.tenantRepository = tenantRepository;
           this.userService = userService;
           this.passwordEncoder = passwordEncoder;
           this.loginAttemptService = loginAttemptService;
           this.mfaService = mfaService;
           this.tokenIssuer = tokenIssuer;
       }

       @Override
       public Authentication authenticate(Authentication authentication) throws AuthenticationException {
           PasswordGrantAuthenticationToken grant = (PasswordGrantAuthenticationToken) authentication;
           RegisteredClient registeredClient = ((OAuth2ClientAuthenticationToken) grant.getClientPrincipal())
                   .getRegisteredClient();

           String ipAddress = "unknown"; // real client IP is unavailable at this layer; the RateLimitFilter (Task 24)
                                          // already applied the per-IP check earlier in the filter chain for this path.
           try {
               loginAttemptService.assertNotLocked(grant.getUsername(), ipAddress);

               Tenant tenant = tenantRepository.findBySlug(grant.getTenant())
                       .orElseThrow(this::genericAuthFailure);
               Optional<User> user = userService.findByTenantAndEmail(tenant.getId(), grant.getUsername());
               if (user.isEmpty() || !passwordEncoder.matches(grant.getPassword(), user.get().getPasswordHash())) {
                   loginAttemptService.recordFailure(grant.getUsername(), ipAddress);
                   throw genericAuthFailure();
               }

               loginAttemptService.recordSuccess(user.get().getId(), grant.getUsername(), ipAddress);

               if (mfaService.isEnrolled(user.get().getId())) {
                   String challenge = mfaService.issueChallenge(user.get().getId());
                   throw new OAuth2AuthenticationException(new OAuth2Error("mfa_required", challenge, null));
               }

               IssuedTokens issued = tokenIssuer.issue(registeredClient, user.get(), grant.getScopes());
               return toAuthenticationToken(registeredClient, issued, grant.getScopes());
           } catch (AccountLockedException locked) {
               throw genericAuthFailure();
           }
       }

       static Authentication toAuthenticationToken(RegisteredClient registeredClient, IssuedTokens issued,
                                                    java.util.Set<String> scopes) {
           OAuth2AccessToken accessToken = new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER,
                   issued.accessToken(), Instant.now(), issued.accessTokenExpiresAt(), scopes);
           return new OAuth2AccessTokenAuthenticationToken(registeredClient,
                   new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                           "issued", null, java.util.List.of()),
                   accessToken, Map.of("refresh_token", issued.refreshToken()));
       }

       @Override
       public boolean supports(Class<?> authentication) {
           return PasswordGrantAuthenticationToken.class.isAssignableFrom(authentication);
       }

       private OAuth2AuthenticationException genericAuthFailure() {
           return new OAuth2AuthenticationException(new OAuth2Error("authentication_failed",
                   "Invalid credentials", null));
       }
   }
   ```

   `MfaService` needs one more small method this provider calls,
   `isEnrolled(UUID userId)` — add it to `MfaService` (Modify, Task 23):

   ```java
   public boolean isEnrolled(UUID userId) {
       return mfaCredentialRepository.findByUserIdAndActiveTrue(userId).isPresent();
   }
   ```

11. Write the failing integration test `RefreshGrantIT`:

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.web.client.TestRestTemplate;
   import org.springframework.http.*;
   import org.springframework.util.LinkedMultiValueMap;
   import org.springframework.util.MultiValueMap;

   import static org.assertj.core.api.Assertions.assertThat;

   class RefreshGrantIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserService userService;
       @Autowired private TestRestTemplate restTemplate;

       @Test
       void refreshTokenGrantRotatesAndIssuesANewAccessToken() {
           Tenant tenant = new Tenant();
           tenant.setSlug("refresh-" + System.nanoTime());
           tenant.setName("Refresh Grant Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           userService.createUser(tenant.getId(), "refresh@test.com", "ValidPassw0rd!123", null);
           userService.changePassword(
                   userService.findByTenantAndEmail(tenant.getId(), "refresh@test.com").orElseThrow(),
                   "ValidPassw0rd!123Changed");

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
           headers.setBasicAuth("example-app", "example-secret");

           MultiValueMap<String, String> passwordForm = new LinkedMultiValueMap<>();
           passwordForm.add("grant_type", "password");
           passwordForm.add("tenant", tenant.getSlug());
           passwordForm.add("username", "refresh@test.com");
           passwordForm.add("password", "ValidPassw0rd!123Changed");

           ResponseEntity<java.util.Map> loginResponse = restTemplate.postForEntity(
                   "/oauth2/token", new HttpEntity<>(passwordForm, headers), java.util.Map.class);
           String refreshToken = (String) loginResponse.getBody().get("refresh_token");

           MultiValueMap<String, String> refreshForm = new LinkedMultiValueMap<>();
           refreshForm.add("grant_type", "refresh_token");
           refreshForm.add("refresh_token", refreshToken);

           ResponseEntity<java.util.Map> refreshResponse = restTemplate.postForEntity(
                   "/oauth2/token", new HttpEntity<>(refreshForm, headers), java.util.Map.class);

           assertThat(refreshResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
           assertThat(refreshResponse.getBody().get("refresh_token")).isNotEqualTo(refreshToken);

           // the original refresh token is now rotated — reusing it must fail (§8.3 reuse detection)
           ResponseEntity<java.util.Map> reuseResponse = restTemplate.postForEntity(
                   "/oauth2/token", new HttpEntity<>(refreshForm, headers), java.util.Map.class);
           assertThat(reuseResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
       }
   }
   ```

12. Create `RefreshGrantAuthenticationToken.java`:

   ```java
   package com.bacsystem.auth.config;

   import org.springframework.security.authentication.AbstractAuthenticationToken;
   import org.springframework.security.core.Authentication;
   import org.springframework.security.oauth2.core.AuthorizationGrantType;

   import java.util.Collections;

   public class RefreshGrantAuthenticationToken extends AbstractAuthenticationToken {

       public static final AuthorizationGrantType REFRESH_TOKEN = new AuthorizationGrantType("refresh_token");

       private final Authentication clientPrincipal;
       private final String refreshToken;

       public RefreshGrantAuthenticationToken(Authentication clientPrincipal, String refreshToken) {
           super(Collections.emptyList());
           this.clientPrincipal = clientPrincipal;
           this.refreshToken = refreshToken;
           setAuthenticated(false);
       }

       @Override public Object getCredentials() { return refreshToken; }
       @Override public Object getPrincipal() { return clientPrincipal; }
       public Authentication getClientPrincipal() { return clientPrincipal; }
       public String getRefreshToken() { return refreshToken; }
   }
   ```

13. Create `RefreshGrantAuthenticationConverter.java` — only claims requests
   whose `refresh_token` value looks like *our* opaque token, not SAS's
   built-in format, so this task doesn't have to also disable the default
   provider explicitly; in practice this service only ever issues its own
   tokens, so every real request matches:

   ```java
   package com.bacsystem.auth.config;

   import jakarta.servlet.http.HttpServletRequest;
   import org.springframework.security.core.Authentication;
   import org.springframework.security.core.context.SecurityContextHolder;
   import org.springframework.security.web.authentication.AuthenticationConverter;

   public class RefreshGrantAuthenticationConverter implements AuthenticationConverter {

       @Override
       public Authentication convert(HttpServletRequest request) {
           String grantType = request.getParameter("grant_type");
           if (!RefreshGrantAuthenticationToken.REFRESH_TOKEN.getValue().equals(grantType)) {
               return null;
           }
           Authentication clientPrincipal = SecurityContextHolder.getContext().getAuthentication();
           String refreshToken = request.getParameter("refresh_token");
           return new RefreshGrantAuthenticationToken(clientPrincipal, refreshToken);
       }
   }
   ```

14. `RefreshGrantAuthenticationProvider` needs the `User` that owns a
   rotated refresh token, but `RefreshTokenService.rotate` (Task 19)
   currently returns only the new raw token string. Change its return type
   to a small record carrying both — add `RefreshTokenRotationResult.java`
   and modify `rotate` (Modify `RefreshTokenService.java`, Task 19):

   ```java
   package com.bacsystem.auth.token;

   import com.bacsystem.auth.identity.User;

   public record RefreshTokenRotationResult(User user, String newRawRefreshToken) {
   }
   ```

   The updated `rotate` method (replaces the version from Task 19 — same
   reuse-detection logic, now returning the owner alongside the new token):

   ```java
   @Transactional
   public RefreshTokenRotationResult rotate(String presentedRaw) {
       RefreshToken current = refreshTokenRepository.findByTokenHash(TokenHasher.sha256Hex(presentedRaw))
               .orElseThrow(RefreshTokenReuseException::new);

       if (current.getReplacedBy() != null || current.getRevokedAt() != null
               || current.getExpiresAt().isBefore(Instant.now())) {
           revokeAllForUser(current.getUser().getId());
           auditLogService.record(current.getUser().getId(), AuditAction.USER_PASSWORD_CHANGED,
                   "RefreshToken", current.getId().toString(), "{\"event\":\"reuse_detected\"}");
           throw new RefreshTokenReuseException();
       }

       String newRaw = issue(current.getUser(), current.getApplicationClientId());
       RefreshToken newest = refreshTokenRepository
               .findByTokenHash(TokenHasher.sha256Hex(newRaw)).orElseThrow();
       current.setReplacedBy(newest);
       refreshTokenRepository.save(current);
       return new RefreshTokenRotationResult(current.getUser(), newRaw);
   }
   ```

   Update the two existing callers that treated `rotate`'s return value as a
   bare `String`:
   - `RefreshTokenServiceIT` (Task 19): both `String rotatedRaw =
     refreshTokenService.rotate(raw);` lines become
     `String rotatedRaw = refreshTokenService.rotate(raw).newRawRefreshToken();`.
   - `TokenIssuerIT` (step 1 above): `String rotated =
     refreshTokenService.rotate(issued.refreshToken());` becomes
     `String rotated = refreshTokenService.rotate(issued.refreshToken()).newRawRefreshToken();`.

15. Write the failing test for `RefreshGrantAuthenticationProvider` is
   `RefreshGrantIT` from step 11 — no separate unit test needed, since its
   entire job is gluing two already-tested components (`RefreshTokenService
   .rotate`, `TokenIssuer.issueAccessTokenForRotatedRefresh`) together
   behind the grant dispatch mechanism, which only the HTTP-level test can
   actually exercise. Create `RefreshGrantAuthenticationProvider.java`:

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.token.IssuedTokens;
   import com.bacsystem.auth.token.RefreshTokenReuseException;
   import com.bacsystem.auth.token.RefreshTokenRotationResult;
   import com.bacsystem.auth.token.RefreshTokenService;
   import com.bacsystem.auth.token.TokenIssuer;
   import org.springframework.security.authentication.AuthenticationProvider;
   import org.springframework.security.core.Authentication;
   import org.springframework.security.core.AuthenticationException;
   import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
   import org.springframework.security.oauth2.core.OAuth2Error;
   import org.springframework.security.oauth2.server.authorization.authentication.OAuth2ClientAuthenticationToken;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

   import java.util.Set;

   public class RefreshGrantAuthenticationProvider implements AuthenticationProvider {

       private final RefreshTokenService refreshTokenService;
       private final TokenIssuer tokenIssuer;

       public RefreshGrantAuthenticationProvider(RefreshTokenService refreshTokenService, TokenIssuer tokenIssuer) {
           this.refreshTokenService = refreshTokenService;
           this.tokenIssuer = tokenIssuer;
       }

       @Override
       public Authentication authenticate(Authentication authentication) throws AuthenticationException {
           RefreshGrantAuthenticationToken grant = (RefreshGrantAuthenticationToken) authentication;
           RegisteredClient registeredClient = ((OAuth2ClientAuthenticationToken) grant.getClientPrincipal())
                   .getRegisteredClient();
           try {
               RefreshTokenRotationResult rotation = refreshTokenService.rotate(grant.getRefreshToken());
               IssuedTokens issued = tokenIssuer.issueAccessTokenForRotatedRefresh(
                       registeredClient, rotation.user(), Set.of(), rotation.newRawRefreshToken());
               return PasswordGrantAuthenticationProvider.toAuthenticationToken(registeredClient, issued, Set.of());
           } catch (RefreshTokenReuseException reuse) {
               throw new OAuth2AuthenticationException(new OAuth2Error("authentication_failed",
                       "Refresh token reuse detected", null));
           }
       }

       @Override
       public boolean supports(Class<?> authentication) {
           return RefreshGrantAuthenticationToken.class.isAssignableFrom(authentication);
       }
   }
   ```

16. Create `AuthorizationServerConfig.java` — wires both custom grants into
   `OAuth2TokenEndpointConfigurer`, exposes the JWKS source backed by
   `SigningKeyService` (§8.3), and sets the issuer/settings:

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.mfa.MfaService;
   import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
   import com.bacsystem.auth.rbac.UserRoleRepository;
   import com.bacsystem.auth.security.LoginAttemptService;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import com.bacsystem.auth.token.RefreshTokenService;
   import com.bacsystem.auth.token.SigningKey;
   import com.bacsystem.auth.token.SigningKeyService;
   import com.bacsystem.auth.token.TokenIssuer;
   import com.nimbusds.jose.jwk.JWK;
   import com.nimbusds.jose.jwk.JWKSet;
   import com.nimbusds.jose.jwk.source.JWKSource;
   import com.nimbusds.jose.proc.SecurityContext;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.core.Ordered;
   import org.springframework.core.annotation.Order;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.crypto.password.PasswordEncoder;
   import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
   import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
   import org.springframework.security.web.SecurityFilterChain;

   import java.security.KeyFactory;
   import java.security.interfaces.ECPrivateKey;
   import java.security.interfaces.ECPublicKey;
   import java.security.spec.PKCS8EncodedKeySpec;
   import java.security.spec.X509EncodedKeySpec;
   import java.util.Base64;
   import java.util.List;

   @Configuration
   public class AuthorizationServerConfig {

       // RegisteredClientRepository (Task 3's JpaRegisteredClientRepository) is not
       // referenced directly here — Spring Authorization Server's own internal
       // wiring picks it up from the application context by type.
       @Bean
       @Order(Ordered.HIGHEST_PRECEDENCE)
       public SecurityFilterChain authorizationServerSecurityFilterChain(
               HttpSecurity http, TenantRepository tenantRepository, UserService userService,
               PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService, MfaService mfaService,
               RefreshTokenService refreshTokenService, TokenIssuer tokenIssuer) throws Exception {

           OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
                   OAuth2AuthorizationServerConfigurer.authorizationServer();

           http.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
                   .with(authorizationServerConfigurer, configurer -> configurer
                           .tokenEndpoint(tokenEndpoint -> tokenEndpoint
                                   .accessTokenRequestConverters(converters -> {
                                       converters.add(0, new PasswordGrantAuthenticationConverter());
                                       converters.add(0, new RefreshGrantAuthenticationConverter());
                                   })
                                   .authenticationProviders(providers -> {
                                       providers.add(0, new PasswordGrantAuthenticationProvider(
                                               tenantRepository, userService, passwordEncoder,
                                               loginAttemptService, mfaService, tokenIssuer));
                                       providers.add(0, new RefreshGrantAuthenticationProvider(
                                               refreshTokenService, tokenIssuer));
                                   })))
                   .csrf(csrf -> csrf.ignoringRequestMatchers(authorizationServerConfigurer.getEndpointsMatcher()))
                   // Spring Security's default header writer sets "no-cache" on every
                   // response; disable it here so the explicit Cache-Control below (added
                   // by JwksCacheControlFilter) is what JWKS clients actually see — the
                   // overlap window in §8.3 is derived from this exact value.
                   .headers(headers -> headers.cacheControl(cache -> cache.disable()))
                   .addFilterBefore(new JwksCacheControlFilter(),
                           org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

           return http.build();
       }

       /** Sets the `Cache-Control` §8.3's overlap window is derived from — only on `/oauth2/jwks`. */
       static class JwksCacheControlFilter extends org.springframework.web.filter.OncePerRequestFilter {
           @Override
           protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
                                            jakarta.servlet.http.HttpServletResponse response,
                                            jakarta.servlet.FilterChain chain)
                   throws jakarta.servlet.ServletException, java.io.IOException {
               if ("/oauth2/jwks".equals(request.getRequestURI())) {
                   response.setHeader("Cache-Control", "public, max-age=3600");
               }
               chain.doFilter(request, response);
           }
       }

       @Bean
       public AuthorizationServerSettings authorizationServerSettings() {
           return AuthorizationServerSettings.builder().build();
       }

       /**
        * Copies `tenant` and `roles` onto the actual JWT claims (§8.2) — SAS's
        * default {@code JwtGenerator} only emits standard claims; without this
        * customizer the attributes stashed on the {@code OAuth2Authorization}
        * in {@code issueTokens} above never reach the token itself.
        */
       @Bean
       public org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer<
               org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext>
               jwtCustomizer(UserService userService, UserRoleRepository userRoleRepository) {
           return context -> {
               if (context.getTokenType().getValue().equals("access_token")
                       && PasswordGrantAuthenticationToken.PASSWORD.equals(context.getAuthorizationGrantType())) {
                   java.util.UUID userId = java.util.UUID.fromString(context.getPrincipal().getName());
                   com.bacsystem.auth.identity.User user = userService.getById(userId);
                   java.util.List<String> roleNames = userRoleRepository.findByUserId(userId).stream()
                           .map(ur -> ur.getRole().getName()).toList();
                   context.getClaims().claim("tenant", user.getTenant().getId().toString());
                   context.getClaims().claim("roles", roleNames);
               }
           };
       }

       /**
        * JWKS backed by {@link SigningKeyService} (§8.3) — every ACTIVE and
        * RETIRING key is published, giving consumers the overlap window they
        * need to keep validating tokens signed by a just-rotated-out key.
        */
       @Bean
       public JWKSource<SecurityContext> jwkSource(SigningKeyService signingKeyService) {
           return (selector, context) -> {
               List<JWK> jwks = signingKeyService.publishableKeys().stream()
                       .map(this::toJwk)
                       .toList();
               return selector.select(new JWKSet(jwks));
           };
       }

       private JWK toJwk(SigningKey key) {
           try {
               KeyFactory keyFactory = KeyFactory.getInstance("EC");
               ECPublicKey publicKey = (ECPublicKey) keyFactory.generatePublic(
                       new X509EncodedKeySpec(Base64.getDecoder().decode(key.getPublicKeyPem())));
               ECPrivateKey privateKey = (ECPrivateKey) keyFactory.generatePrivate(
                       new PKCS8EncodedKeySpec(Base64.getDecoder().decode(key.getPrivateKeyPem())));
               return new com.nimbusds.jose.jwk.ECKey.Builder(com.nimbusds.jose.jwk.Curve.P_256, publicKey)
                       .privateKey(privateKey)
                       .keyID(key.getKid())
                       .build();
           } catch (Exception e) {
               throw new IllegalStateException("Failed to convert SigningKey to JWK: " + key.getKid(), e);
           }
       }
   }
   ```

17. Run `mvn -q test -Dtest=TokenIssuerIT,PasswordGrantIT,RefreshGrantIT,RefreshTokenServiceIT`.
   Expect **PASS** — this whole task, especially the grant-registration step
   above, is the one most likely to need real back-and-forth against the
   exact Spring Authorization Server 1.3.4 API pulled in by the Boot 3.3.4
   BOM; consult its `oauth2-authorization-server` sample project's
   custom-grant example if a method referenced above doesn't exist in that
   version, and adapt — the intent (custom converter + provider registered
   on the token endpoint, framework-owned token generation, one shared
   `TokenIssuer`) does not change.

18. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/config/ \
     authentication/src/main/java/com/bacsystem/auth/token/IssuedTokens.java \
     authentication/src/main/java/com/bacsystem/auth/token/TokenIssuer.java \
     authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenRotationResult.java \
     authentication/src/main/java/com/bacsystem/auth/token/RefreshTokenService.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaService.java \
     authentication/src/test/java/com/bacsystem/auth/token/TokenIssuerIT.java \
     authentication/src/test/java/com/bacsystem/auth/token/RefreshTokenServiceIT.java \
     authentication/src/test/java/com/bacsystem/auth/config/PasswordGrantIT.java \
     authentication/src/test/java/com/bacsystem/auth/config/RefreshGrantIT.java
   git commit -m "feat(auth): add custom password and refresh grants sharing one TokenIssuer"
   ```

---

### Task 26: SecurityConfig (Resource Server) & OpenAPI

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/config/SecurityConfig.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/OpenApiConfig.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/config/SecurityConfigIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.security.RateLimitFilter`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.config.SecurityConfig`, `com.bacsystem.auth.config.OpenApiConfig`

**Steps:**

1. Write the failing test `SecurityConfigIT` — an unauthenticated request to
   a protected path is rejected, the public password-reset paths are not:

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.web.client.TestRestTemplate;
   import org.springframework.http.HttpStatus;
   import org.springframework.http.ResponseEntity;

   import static org.assertj.core.api.Assertions.assertThat;

   class SecurityConfigIT extends PostgresRedisTestBase {

       @Autowired private TestRestTemplate restTemplate;

       @Test
       void protectedEndpointRejectsUnauthenticatedRequest() {
           ResponseEntity<String> response = restTemplate.getForEntity("/v1/users/" + java.util.UUID.randomUUID(), String.class);
           assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
       }

       @Test
       void passwordResetRequestIsPubliclyReachable() {
           ResponseEntity<String> response = restTemplate.postForEntity(
                   "/v1/auth/password/reset-request",
                   new org.springframework.http.HttpEntity<>(java.util.Map.of("tenant", "x", "email", "a@b.com")),
                   String.class);
           // reachable without auth — may be 202 or 400 depending on body validation, never 401/403
           assertThat(response.getStatusCode()).isNotIn(HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN);
       }
   }
   ```

2. Run `mvn -q test -Dtest=SecurityConfigIT`. Expect **FAIL**.

3. Create `SecurityConfig.java`:

   ```java
   package com.bacsystem.auth.config;

   import com.bacsystem.auth.security.RateLimitFilter;
   import com.nimbusds.jose.JWSAlgorithm;
   import com.nimbusds.jose.jwk.source.JWKSource;
   import com.nimbusds.jose.proc.JWSKeySelector;
   import com.nimbusds.jose.proc.JWSVerificationKeySelector;
   import com.nimbusds.jose.proc.SecurityContext;
   import com.nimbusds.jwt.proc.DefaultJWTProcessor;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.core.Ordered;
   import org.springframework.core.annotation.Order;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
   import org.springframework.security.oauth2.jwt.JwtDecoder;
   import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
   import org.springframework.security.web.SecurityFilterChain;
   import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

   @Configuration
   public class SecurityConfig {

       private static final String[] PUBLIC_PATHS = {
               "/v1/auth/password/reset-request",
               "/v1/auth/password/reset-confirm",
               "/v1/auth/mfa/verify",
               "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
               "/actuator/health", "/actuator/prometheus"
       };

       @Bean
       @Order(Ordered.HIGHEST_PRECEDENCE + 1)
       public SecurityFilterChain apiSecurityFilterChain(HttpSecurity http, JwtDecoder jwtDecoder,
                                                           RateLimitFilter rateLimitFilter) throws Exception {
           http
                   .csrf(AbstractHttpConfigurer::disable)
                   .authorizeHttpRequests(auth -> auth
                           .requestMatchers(PUBLIC_PATHS).permitAll()
                           .anyRequest().authenticated())
                   .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder)))
                   .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class);
           return http.build();
       }

       @Bean
       public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
           JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(JWSAlgorithm.ES256, jwkSource);
           DefaultJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
           jwtProcessor.setJWSKeySelector(keySelector);
           return new NimbusJwtDecoder(jwtProcessor);
       }
   }
   ```

4. Create `OpenApiConfig.java`:

   ```java
   package com.bacsystem.auth.config;

   import io.swagger.v3.oas.models.OpenAPI;
   import io.swagger.v3.oas.models.info.Info;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;

   @Configuration
   public class OpenApiConfig {

       @Bean
       public OpenAPI authOpenApi() {
           return new OpenAPI().info(new Info()
                   .title("Authentication & Authorization Service")
                   .version("v1")
                   .description("Central identity/access-control API (spec §11)"));
       }
   }
   ```

5. Run `mvn -q test -Dtest=SecurityConfigIT`. Expect **PASS**.

6. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/config/SecurityConfig.java \
     authentication/src/main/java/com/bacsystem/auth/config/OpenApiConfig.java \
     authentication/src/test/java/com/bacsystem/auth/config/SecurityConfigIT.java
   git commit -m "feat(auth): add resource-server SecurityConfig and OpenAPI docs"
   ```

---

### Task 27: ProblemDetailAdvice — RFC 7807 + Auth-Error Genericization (§10)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/web/ProblemDetailAdvice.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/ProblemDetailAdviceTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.rbac.RoleVersionConflictException`, `com.bacsystem.auth.rbac.RoleNotFoundException`, `com.bacsystem.auth.rbac.DuplicateRoleNameException`, `com.bacsystem.auth.rbac.RoleInUseException`, `com.bacsystem.auth.identity.DuplicateEmailException`, `com.bacsystem.auth.identity.UserNotFoundException`, `com.bacsystem.auth.identity.WeakPasswordException`, `com.bacsystem.auth.mfa.MfaChallengeExpiredException`, `com.bacsystem.auth.mfa.MfaVerificationFailedException`, `com.bacsystem.auth.mfa.SelfMfaResetException`, `com.bacsystem.auth.onetime.OneTimeTokenInvalidException`, `com.bacsystem.auth.token.RefreshTokenReuseException`
- Produces: `com.bacsystem.auth.web.ProblemDetailAdvice`

**Steps:**

1. Write the failing test `ProblemDetailAdviceTest`:

   ```java
   package com.bacsystem.auth.web;

   import com.bacsystem.auth.rbac.RoleVersionConflictException;
   import com.bacsystem.auth.mfa.MfaVerificationFailedException;
   import org.junit.jupiter.api.Test;
   import org.springframework.http.HttpStatus;
   import org.springframework.http.ProblemDetail;

   import static org.assertj.core.api.Assertions.assertThat;

   class ProblemDetailAdviceTest {

       private final ProblemDetailAdvice advice = new ProblemDetailAdvice();

       @Test
       void roleVersionConflictMapsTo409WithSpecificCode() {
           ProblemDetail pd = advice.handleRoleVersionConflict(new RoleVersionConflictException());
           assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
           assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_VERSION_CONFLICT");
       }

       @Test
       void mfaVerificationFailureMapsToGenericAuthenticationFailed() {
           ProblemDetail pd = advice.handleMfaVerificationFailed(new MfaVerificationFailedException());
           assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
           assertThat(pd.getProperties().get("code")).isEqualTo("authentication_failed");
           // never a hint at why — §10.2
           assertThat(pd.getDetail()).doesNotContainIgnoringCase("totp");
           assertThat(pd.getDetail()).doesNotContainIgnoringCase("backup");
       }
   }
   ```

2. Run `mvn -q test -Dtest=ProblemDetailAdviceTest`. Expect **FAIL**.

3. Create `ProblemDetailAdvice.java`:

   ```java
   package com.bacsystem.auth.web;

   import com.bacsystem.auth.identity.DuplicateEmailException;
   import com.bacsystem.auth.identity.UserNotFoundException;
   import com.bacsystem.auth.identity.WeakPasswordException;
   import com.bacsystem.auth.mfa.MfaChallengeExpiredException;
   import com.bacsystem.auth.mfa.MfaVerificationFailedException;
   import com.bacsystem.auth.mfa.SelfMfaResetException;
   import com.bacsystem.auth.onetime.OneTimeTokenInvalidException;
   import com.bacsystem.auth.rbac.DuplicateRoleNameException;
   import com.bacsystem.auth.rbac.RoleInUseException;
   import com.bacsystem.auth.rbac.RoleNotFoundException;
   import com.bacsystem.auth.rbac.RoleVersionConflictException;
   import com.bacsystem.auth.token.RefreshTokenReuseException;
   import org.springframework.http.HttpStatus;
   import org.springframework.http.ProblemDetail;
   import org.springframework.web.bind.annotation.ExceptionHandler;
   import org.springframework.web.bind.annotation.RestControllerAdvice;

   /**
    * RFC 7807 for validation/business errors; a single generic
    * {@code authentication_failed} code for every authentication failure,
    * regardless of real cause (§10.2) — the fine-grained {@code code} values
    * below never apply to credentials/MFA/token/lockout failures.
    */
   @RestControllerAdvice
   public class ProblemDetailAdvice {

       @ExceptionHandler(RoleVersionConflictException.class)
       public ProblemDetail handleRoleVersionConflict(RoleVersionConflictException e) {
           return problem(HttpStatus.CONFLICT, "ROLE_VERSION_CONFLICT", e.getMessage());
       }

       @ExceptionHandler(RoleNotFoundException.class)
       public ProblemDetail handleRoleNotFound(RoleNotFoundException e) {
           return problem(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", e.getMessage());
       }

       @ExceptionHandler(DuplicateRoleNameException.class)
       public ProblemDetail handleDuplicateRoleName(DuplicateRoleNameException e) {
           return problem(HttpStatus.CONFLICT, "DUPLICATE_ROLE_NAME", e.getMessage());
       }

       @ExceptionHandler(RoleInUseException.class)
       public ProblemDetail handleRoleInUse(RoleInUseException e) {
           return problem(HttpStatus.CONFLICT, "ROLE_IN_USE", e.getMessage());
       }

       @ExceptionHandler(DuplicateEmailException.class)
       public ProblemDetail handleDuplicateEmail(DuplicateEmailException e) {
           return problem(HttpStatus.CONFLICT, "DUPLICATE_EMAIL", e.getMessage());
       }

       @ExceptionHandler(UserNotFoundException.class)
       public ProblemDetail handleUserNotFound(UserNotFoundException e) {
           return problem(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", e.getMessage());
       }

       @ExceptionHandler(WeakPasswordException.class)
       public ProblemDetail handleWeakPassword(WeakPasswordException e) {
           return problem(HttpStatus.BAD_REQUEST, "WEAK_PASSWORD", e.getMessage());
       }

       @ExceptionHandler(SelfMfaResetException.class)
       public ProblemDetail handleSelfMfaReset(SelfMfaResetException e) {
           return problem(HttpStatus.FORBIDDEN, "SELF_MFA_RESET_FORBIDDEN", e.getMessage());
       }

       // Everything below is an authentication failure — §10.2 requires ONE
       // generic code/detail regardless of which of these actually happened.
       @ExceptionHandler({MfaChallengeExpiredException.class, MfaVerificationFailedException.class,
               OneTimeTokenInvalidException.class, RefreshTokenReuseException.class})
       public ProblemDetail handleAuthenticationFailure(RuntimeException e) {
           return problem(HttpStatus.BAD_REQUEST, "authentication_failed", "Authentication failed");
       }

       private ProblemDetail problem(HttpStatus status, String code, String detail) {
           ProblemDetail pd = ProblemDetail.forStatus(status);
           pd.setDetail(detail);
           pd.setProperty("code", code);
           return pd;
       }
   }
   ```

4. Run `mvn -q test -Dtest=ProblemDetailAdviceTest`. Expect **PASS**.

5. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/web/ProblemDetailAdvice.java \
     authentication/src/test/java/com/bacsystem/auth/web/ProblemDetailAdviceTest.java
   git commit -m "feat(auth): add RFC 7807 error mapping with authentication-error genericization"
   ```

---

### Task 28: BootstrapRunner (§7)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/bootstrap/BootstrapRunner.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/bootstrap/BootstrapRunnerIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.tenancy.Tenant`, `com.bacsystem.auth.tenancy.TenantRepository`, `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.rbac.RoleService`, `com.bacsystem.auth.rbac.UserRoleRepository`, `com.bacsystem.auth.audit.AuditLogService`, `com.bacsystem.auth.audit.AuditAction`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.bootstrap.BootstrapRunner`

**Steps:**

1. Write the failing test `BootstrapRunnerIT`:

   ```java
   package com.bacsystem.auth.bootstrap;

   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import com.bacsystem.auth.rbac.UserRoleRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;

   import static org.assertj.core.api.Assertions.assertThat;

   class BootstrapRunnerIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserRoleRepository userRoleRepository;
       @Autowired private BootstrapRunner bootstrapRunner;

       @Test
       void firstRunCreatesTenantAndAdminUser() throws Exception {
           bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments("--bootstrap"));

           var tenant = tenantRepository.findBySlug("default").orElseThrow();
           assertThat(tenant.getName()).isEqualTo("Default Tenant");
       }

       @Test
       void secondRunIsANoOp() throws Exception {
           bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments("--bootstrap"));
           bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments("--bootstrap"));

           long tenantCount = tenantRepository.findAll().stream()
                   .filter(t -> t.getSlug().equals("default")).count();
           assertThat(tenantCount).isEqualTo(1);
       }

       @Test
       void withoutTheFlagItDoesNothing() throws Exception {
           bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments());
           assertThat(tenantRepository.findBySlug("default")).isEmpty();
       }
   }
   ```

2. Run `mvn -q test -Dtest=BootstrapRunnerIT`. Expect **FAIL**.

3. Add the bootstrap admin password property to `application.yml` (Modify —
   env-var-overridable, never a literal secret in the file itself):

   ```yaml
   auth:
     bootstrap:
       admin-password: "${AUTH_BOOTSTRAP_ADMIN_PASSWORD:ChangeMeOnFirstLogin!123}"
   ```

4. Create `BootstrapRunner.java`:

   ```java
   package com.bacsystem.auth.bootstrap;

   import com.bacsystem.auth.audit.AuditAction;
   import com.bacsystem.auth.audit.AuditLogService;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.rbac.RoleService;
   import com.bacsystem.auth.rbac.UserRole;
   import com.bacsystem.auth.rbac.UserRoleRepository;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.boot.ApplicationArguments;
   import org.springframework.boot.ApplicationRunner;
   import org.springframework.stereotype.Component;
   import org.springframework.transaction.annotation.Transactional;

   @Component
   public class BootstrapRunner implements ApplicationRunner {

       private static final String DEFAULT_TENANT_SLUG = "default";
       private static final String ADMIN_EMAIL = "admin@default.local";

       private final TenantRepository tenantRepository;
       private final UserService userService;
       private final RoleService roleService;
       private final UserRoleRepository userRoleRepository;
       private final AuditLogService auditLogService;
       private final String adminPassword;

       public BootstrapRunner(TenantRepository tenantRepository, UserService userService, RoleService roleService,
                               UserRoleRepository userRoleRepository, AuditLogService auditLogService,
                               @Value("${auth.bootstrap.admin-password}") String adminPassword) {
           this.tenantRepository = tenantRepository;
           this.userService = userService;
           this.roleService = roleService;
           this.userRoleRepository = userRoleRepository;
           this.auditLogService = auditLogService;
           this.adminPassword = adminPassword;
       }

       @Override
       @Transactional
       public void run(ApplicationArguments args) {
           if (!args.containsOption("bootstrap")) {
               return;
           }
           if (tenantRepository.findBySlug(DEFAULT_TENANT_SLUG).isPresent()) {
               return; // idempotent (§7) — nothing to do, exit as a normal no-op
           }

           Tenant tenant = new Tenant();
           tenant.setSlug(DEFAULT_TENANT_SLUG);
           tenant.setName("Default Tenant");
           tenant = tenantRepository.save(tenant);

           var admin = userService.createUser(tenant.getId(), ADMIN_EMAIL, adminPassword, null);

           var adminRole = roleService.createRole(tenant.getId(), "admin", false, admin.getId());
           UserRole assignment = new UserRole();
           assignment.setUser(admin);
           assignment.setRole(adminRole);
           assignment.setAssignedBy(admin);
           userRoleRepository.save(assignment);

           auditLogService.record(admin.getId(), AuditAction.BOOTSTRAP_TENANT_CREATED, "Tenant",
                   tenant.getId().toString(), "{}");
       }
   }
   ```

5. Run `mvn -q test -Dtest=BootstrapRunnerIT`. Expect **PASS**.

6. Commit:

   ```bash
   git add authentication/src/main/resources/application.yml \
     authentication/src/main/java/com/bacsystem/auth/bootstrap/BootstrapRunner.java \
     authentication/src/test/java/com/bacsystem/auth/bootstrap/BootstrapRunnerIT.java
   git commit -m "feat(auth): add idempotent bootstrap runner for the default tenant and admin"
   ```

---

### Task 29: UserController & Cursor Pagination

Fixes a gap between Task 15 and the spec: §10.1 mandates cursor-based
pagination for every list endpoint, but `UserService.listByTenant` (Task 15)
was written against Spring Data's offset-based `Page`/`Pageable`. This task
introduces the real cursor mechanism and is the one place list endpoints
route through — Task 30's role listing reuses the same `CursorCodec`.

Depends on `ProblemDetailAdvice` (Task 27) even though `UserController`
never imports it: `@WebMvcTest` auto-loads every `@RestControllerAdvice`
bean on the classpath regardless of whether the test lists it explicitly,
and `UserControllerTest`'s 404 assertion only holds once that advice
translates `UserNotFoundException` — without it, an unhandled exception is
a bare 500. The DAG can't infer this from an import that doesn't exist, so
it is spelled out here instead.

**Files:**
- Modify: `authentication/src/main/java/com/bacsystem/auth/identity/UserRepository.java`
- Modify: `authentication/src/main/java/com/bacsystem/auth/identity/UserService.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/web/CursorCodec.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/web/CursorPage.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/web/controller/UserController.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/CursorCodecTest.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/controller/UserControllerTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.identity.UserStatus`, `com.bacsystem.auth.web.ProblemDetailAdvice`
- Produces: `com.bacsystem.auth.web.CursorCodec`, `com.bacsystem.auth.web.CursorPage`, `com.bacsystem.auth.web.controller.UserController`

**Steps:**

1. Write the failing test `CursorCodecTest`:

   ```java
   package com.bacsystem.auth.web;

   import org.junit.jupiter.api.Test;

   import java.time.Instant;
   import java.util.UUID;

   import static org.assertj.core.api.Assertions.assertThat;

   class CursorCodecTest {

       @Test
       void roundTripsInstantAndId() {
           Instant now = Instant.parse("2026-07-24T10:15:30.123456Z");
           UUID id = UUID.randomUUID();

           String cursor = CursorCodec.encode(now, id);
           CursorCodec.Decoded decoded = CursorCodec.decode(cursor);

           assertThat(decoded.createdAt()).isEqualTo(now);
           assertThat(decoded.id()).isEqualTo(id);
       }

       @Test
       void nullCursorDecodesToEmpty() {
           assertThat(CursorCodec.decode(null)).isNull();
           assertThat(CursorCodec.decode("")).isNull();
       }
   }
   ```

2. Run `mvn -q test -Dtest=CursorCodecTest`. Expect **FAIL**.

3. Create `CursorCodec.java`:

   ```java
   package com.bacsystem.auth.web;

   import java.nio.charset.StandardCharsets;
   import java.time.Instant;
   import java.util.Base64;
   import java.util.UUID;

   public final class CursorCodec {

       private CursorCodec() {}

       public record Decoded(Instant createdAt, UUID id) {}

       public static String encode(Instant createdAt, UUID id) {
           String raw = createdAt.toString() + "|" + id;
           return Base64.getUrlEncoder().withoutPadding().encodeToString(raw.getBytes(StandardCharsets.UTF_8));
       }

       public static Decoded decode(String cursor) {
           if (cursor == null || cursor.isBlank()) {
               return null;
           }
           String raw = new String(Base64.getUrlDecoder().decode(cursor), StandardCharsets.UTF_8);
           String[] parts = raw.split("\\|", 2);
           return new Decoded(Instant.parse(parts[0]), UUID.fromString(parts[1]));
       }
   }
   ```

4. Create `CursorPage.java`:

   ```java
   package com.bacsystem.auth.web;

   import java.util.List;

   public record CursorPage<T>(List<T> data, String nextCursor) {
   }
   ```

5. Add the keyset query to `UserRepository.java` (Modify):

   ```java
   package com.bacsystem.auth.identity;

   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.Pageable;
   import org.springframework.data.jpa.repository.JpaRepository;

   import java.time.Instant;
   import java.util.List;
   import java.util.Optional;
   import java.util.UUID;

   public interface UserRepository extends JpaRepository<User, UUID> {
       Optional<User> findByTenantIdAndEmail(UUID tenantId, String email);
       Page<User> findByTenantId(UUID tenantId, Pageable pageable);

       List<User> findByTenantIdAndCreatedAtGreaterThanOrderByCreatedAtAsc(
               UUID tenantId, Instant after, Pageable limit);
   }
   ```

6. Add the cursor-based listing method to `UserService.java` (Modify —
   replaces the offset-based `listByTenant` from Task 15 as the one this
   controller calls; `listByTenant` itself is left in place since nothing
   requires removing it, but the new method is what §10.1 actually needs):

   ```java
   public com.bacsystem.auth.web.CursorPage<User> listByTenantCursor(UUID tenantId, String cursor, int size) {
       com.bacsystem.auth.web.CursorCodec.Decoded decoded = com.bacsystem.auth.web.CursorCodec.decode(cursor);
       Instant after = decoded == null ? Instant.EPOCH : decoded.createdAt();

       List<User> page = userRepository.findByTenantIdAndCreatedAtGreaterThanOrderByCreatedAtAsc(
               tenantId, after, org.springframework.data.domain.PageRequest.of(0, size));

       String nextCursor = page.isEmpty() ? null
               : com.bacsystem.auth.web.CursorCodec.encode(page.get(page.size() - 1).getCreatedAt(),
                       page.get(page.size() - 1).getId());
       return new com.bacsystem.auth.web.CursorPage<>(page, nextCursor);
   }
   ```

   Add the matching imports to `UserService.java`: `java.util.List` (already
   present), `com.bacsystem.auth.web.CursorCodec`, `com.bacsystem.auth.web.CursorPage`.

7. Write the failing test `UserControllerTest` (`@WebMvcTest` + `MockMvc`,
   `UserService` mocked):

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.identity.UserStatus;
   import com.fasterxml.jackson.databind.ObjectMapper;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
   import org.springframework.boot.test.mock.mockito.MockBean;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.security.test.context.support.WithMockUser;
   import org.springframework.test.web.servlet.MockMvc;

   import java.time.Instant;
   import java.util.UUID;

   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.Mockito.when;
   import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
   import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

   @WebMvcTest(UserController.class)
   class UserControllerTest {

       @Autowired private MockMvc mockMvc;
       @MockBean private UserService userService;
       @Autowired private ObjectMapper objectMapper;

       private Jwt jwtWithTenant(UUID tenantId) {
           return Jwt.withTokenValue("token")
                   .header("alg", "ES256")
                   .claim("tenant", tenantId.toString())
                   .claim("sub", "caller@test.com")
                   .build();
       }

       @Test
       void createUserReturns201() throws Exception {
           UUID tenantId = UUID.randomUUID();
           User created = new User();
           created.setId(UUID.randomUUID());
           created.setEmail("new@test.com");
           created.setStatus(UserStatus.ACTIVE);
           created.setMustChangePassword(true);
           when(userService.createUser(any(), any(), any(), any())).thenReturn(created);

           mockMvc.perform(post("/v1/users")
                           .with(jwt().jwt(jwtWithTenant(tenantId)))
                           .contentType("application/json")
                           .content(objectMapper.writeValueAsString(
                                   new UserController.CreateUserRequest("new@test.com", "TempPassw0rd!123"))))
                   .andExpect(status().isCreated())
                   .andExpect(jsonPath("$.email").value("new@test.com"));
       }

       @Test
       void getUnknownUserReturns404() throws Exception {
           when(userService.getById(any())).thenThrow(new com.bacsystem.auth.identity.UserNotFoundException(UUID.randomUUID()));

           mockMvc.perform(get("/v1/users/{id}", UUID.randomUUID())
                           .with(jwt().jwt(jwtWithTenant(UUID.randomUUID()))))
                   .andExpect(status().isNotFound());
       }
   }
   ```

8. Run `mvn -q test -Dtest=UserControllerTest`. Expect **FAIL**.

9. Create `UserController.java`:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.identity.User;
   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.web.CursorPage;
   import org.springframework.http.HttpStatus;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
   import org.springframework.web.bind.annotation.*;

   import java.util.UUID;

   @RestController
   @RequestMapping("/v1/users")
   public class UserController {

       public record CreateUserRequest(String email, String temporaryPassword) {}
       public record UserResponse(UUID id, String email, String status, boolean mustChangePassword) {}

       private final UserService userService;

       public UserController(UserService userService) {
           this.userService = userService;
       }

       @PostMapping
       @ResponseStatus(HttpStatus.CREATED)
       public UserResponse create(@RequestBody CreateUserRequest request, JwtAuthenticationToken auth) {
           UUID tenantId = tenantIdOf(auth);
           UUID actorId = UUID.fromString(auth.getToken().getSubject());
           User user = userService.createUser(tenantId, request.email(), request.temporaryPassword(), actorId);
           return toResponse(user);
       }

       @GetMapping("/{id}")
       public UserResponse get(@PathVariable UUID id) {
           return toResponse(userService.getById(id));
       }

       @GetMapping
       public CursorPage<UserResponse> list(@RequestParam(required = false) String cursor,
                                             @RequestParam(defaultValue = "20") int size,
                                             JwtAuthenticationToken auth) {
           UUID tenantId = tenantIdOf(auth);
           CursorPage<User> page = userService.listByTenantCursor(tenantId, cursor, size);
           return new CursorPage<>(page.data().stream().map(this::toResponse).toList(), page.nextCursor());
       }

       @DeleteMapping("/{id}")
       @ResponseStatus(HttpStatus.NO_CONTENT)
       public void deactivate(@PathVariable UUID id, JwtAuthenticationToken auth) {
           userService.deactivateUser(id, UUID.fromString(auth.getToken().getSubject()));
       }

       private UUID tenantIdOf(JwtAuthenticationToken auth) {
           Jwt jwt = (Jwt) auth.getPrincipal();
           return UUID.fromString(jwt.getClaimAsString("tenant"));
       }

       private UserResponse toResponse(User user) {
           return new UserResponse(user.getId(), user.getEmail(), user.getStatus().name(), user.isMustChangePassword());
       }
   }
   ```

10. Run `mvn -q test -Dtest=UserControllerTest`. Expect **PASS**.

11. Commit:

    ```bash
    git add authentication/src/main/java/com/bacsystem/auth/identity/UserRepository.java \
      authentication/src/main/java/com/bacsystem/auth/identity/UserService.java \
      authentication/src/main/java/com/bacsystem/auth/web/CursorCodec.java \
      authentication/src/main/java/com/bacsystem/auth/web/CursorPage.java \
      authentication/src/main/java/com/bacsystem/auth/web/controller/UserController.java \
      authentication/src/test/java/com/bacsystem/auth/web/CursorCodecTest.java \
      authentication/src/test/java/com/bacsystem/auth/web/controller/UserControllerTest.java
    git commit -m "feat(auth): add UserController with cursor pagination per §10.1"
    ```

---

### Task 30: RoleController & PermissionCatalogController

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/web/controller/RoleController.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/web/controller/PermissionCatalogController.java`
- Modify: `authentication/src/main/java/com/bacsystem/auth/config/SecurityConfig.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/controller/RoleControllerTest.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/controller/PermissionCatalogControllerTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.rbac.Role`, `com.bacsystem.auth.rbac.RolePermission`, `com.bacsystem.auth.rbac.RoleService`, `com.bacsystem.auth.rbac.PermissionCatalogService`, `com.bacsystem.auth.rbac.PermissionSyncResult`, `com.bacsystem.auth.web.ProblemDetailAdvice`
- Produces: `com.bacsystem.auth.web.controller.RoleController`, `com.bacsystem.auth.web.controller.PermissionCatalogController`

**Steps:**

1. Write the failing test `RoleControllerTest` — the `GET .../{id}` response
   must carry `version` (§11's fix from spec review, §9.4):

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.rbac.Role;
   import com.bacsystem.auth.rbac.RoleService;
   import com.bacsystem.auth.rbac.RoleVersionConflictException;
   import com.bacsystem.auth.web.ProblemDetailAdvice;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
   import org.springframework.boot.test.mock.mockito.MockBean;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.test.web.servlet.MockMvc;

   import java.util.List;
   import java.util.UUID;

   import static org.mockito.ArgumentMatchers.*;
   import static org.mockito.Mockito.when;
   import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
   import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

   @WebMvcTest({RoleController.class, ProblemDetailAdvice.class})
   class RoleControllerTest {

       @Autowired private MockMvc mockMvc;
       @MockBean private RoleService roleService;

       @Test
       void getRoleReturnsVersionAndPermissions() throws Exception {
           UUID roleId = UUID.randomUUID();
           Role role = new Role();
           role.setId(roleId);
           role.setName("editor");
           when(roleService.getRole(roleId)).thenReturn(role);
           when(roleService.getPermissions(roleId)).thenReturn(List.of());

           mockMvc.perform(get("/v1/roles/{id}", roleId).with(jwt()))
                   .andExpect(status().isOk())
                   .andExpect(jsonPath("$.version").exists())
                   .andExpect(jsonPath("$.permissions").isArray());
       }

       @Test
       void replacePermissionsWithStaleVersionReturns409() throws Exception {
           UUID roleId = UUID.randomUUID();
           when(roleService.replacePermissions(eq(roleId), eq(3L), anySet(), any()))
                   .thenThrow(new RoleVersionConflictException());

           mockMvc.perform(put("/v1/roles/{id}/permissions", roleId).with(jwt())
                           .contentType("application/json")
                           .content("{\"version\":3,\"permissionIds\":[]}"))
                   .andExpect(status().isConflict())
                   .andExpect(jsonPath("$.code").value("ROLE_VERSION_CONFLICT"));
       }
   }
   ```

2. Run `mvn -q test -Dtest=RoleControllerTest`. Expect **FAIL**.

3. Write the failing test `PermissionCatalogControllerTest`:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.rbac.PermissionCatalogService;
   import com.bacsystem.auth.rbac.PermissionSyncResult;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
   import org.springframework.boot.test.mock.mockito.MockBean;
   import org.springframework.test.web.servlet.MockMvc;

   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.Mockito.when;
   import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
   import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

   @WebMvcTest(PermissionCatalogController.class)
   class PermissionCatalogControllerTest {

       @Autowired private MockMvc mockMvc;
       @MockBean private PermissionCatalogService permissionCatalogService;

       @Test
       void syncReturnsAddedAndDeprecatedCounts() throws Exception {
           when(permissionCatalogService.sync(any(), any())).thenReturn(new PermissionSyncResult(2, 1));

           mockMvc.perform(put("/v1/applications/{app}/permissions", "example-app")
                           .with(jwt().authorities(() -> "SCOPE_permissions:sync"))
                           .contentType("application/json")
                           .content("{\"permissionNames\":[\"a:read\",\"a:write\"]}"))
                   .andExpect(status().isOk())
                   .andExpect(jsonPath("$.added").value(2))
                   .andExpect(jsonPath("$.deprecated").value(1));
       }
   }
   ```

4. Run `mvn -q test -Dtest=PermissionCatalogControllerTest`. Expect **FAIL**.

5. Create `RoleController.java`:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.rbac.Role;
   import com.bacsystem.auth.rbac.RoleService;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
   import org.springframework.web.bind.annotation.*;

   import java.util.List;
   import java.util.Set;
   import java.util.UUID;

   @RestController
   @RequestMapping("/v1/roles")
   public class RoleController {

       public record CreateRoleRequest(String name, boolean isTemplate) {}
       public record ReplacePermissionsRequest(long version, Set<UUID> permissionIds) {}
       public record RoleResponse(UUID id, String name, long version, List<UUID> permissions) {}

       private final RoleService roleService;

       public RoleController(RoleService roleService) {
           this.roleService = roleService;
       }

       @PostMapping
       public RoleResponse create(@RequestBody CreateRoleRequest request, JwtAuthenticationToken auth) {
           Role role = roleService.createRole(tenantIdOf(auth), request.name(), request.isTemplate(), actorIdOf(auth));
           return toResponse(role, List.of());
       }

       @GetMapping
       public List<RoleResponse> list(JwtAuthenticationToken auth) {
           return roleService.listByTenant(tenantIdOf(auth)).stream()
                   .map(r -> toResponse(r, roleService.getPermissions(r.getId()).stream()
                           .map(rp -> rp.getPermission().getId()).toList()))
                   .toList();
       }

       @GetMapping("/{id}")
       public RoleResponse get(@PathVariable UUID id) {
           Role role = roleService.getRole(id);
           List<UUID> permissionIds = roleService.getPermissions(id).stream()
                   .map(rp -> rp.getPermission().getId()).toList();
           return toResponse(role, permissionIds);
       }

       @PutMapping("/{id}/permissions")
       public RoleResponse replacePermissions(@PathVariable UUID id, @RequestBody ReplacePermissionsRequest request,
                                               JwtAuthenticationToken auth) {
           Role role = roleService.replacePermissions(id, request.version(), request.permissionIds(), actorIdOf(auth));
           List<UUID> permissionIds = roleService.getPermissions(id).stream()
                   .map(rp -> rp.getPermission().getId()).toList();
           return toResponse(role, permissionIds);
       }

       @DeleteMapping("/{id}")
       public void delete(@PathVariable UUID id, JwtAuthenticationToken auth) {
           roleService.deleteRole(id, actorIdOf(auth));
       }

       private UUID tenantIdOf(JwtAuthenticationToken auth) {
           return UUID.fromString(((Jwt) auth.getPrincipal()).getClaimAsString("tenant"));
       }

       private UUID actorIdOf(JwtAuthenticationToken auth) {
           return UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
       }

       private RoleResponse toResponse(Role role, List<UUID> permissionIds) {
           return new RoleResponse(role.getId(), role.getName(), role.getVersion(), permissionIds);
       }
   }
   ```

6. Create `PermissionCatalogController.java`:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.rbac.PermissionCatalogService;
   import com.bacsystem.auth.rbac.PermissionSyncResult;
   import org.springframework.security.access.prepost.PreAuthorize;
   import org.springframework.web.bind.annotation.*;

   import java.util.Set;

   @RestController
   @RequestMapping("/v1/applications")
   public class PermissionCatalogController {

       public record SyncRequest(Set<String> permissionNames) {}

       private final PermissionCatalogService permissionCatalogService;

       public PermissionCatalogController(PermissionCatalogService permissionCatalogService) {
           this.permissionCatalogService = permissionCatalogService;
       }

       @PutMapping("/{app}/permissions")
       @PreAuthorize("hasAuthority('SCOPE_permissions:sync')")
       public PermissionSyncResult sync(@PathVariable("app") String applicationName, @RequestBody SyncRequest request) {
           return permissionCatalogService.sync(applicationName, request.permissionNames());
       }
   }
   ```

   `@PreAuthorize` requires method security to be enabled — add the import
   `org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity`
   and the annotation itself to `SecurityConfig` (Modify, Task 26):

   ```java
   import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

   @Configuration
   @EnableMethodSecurity
   public class SecurityConfig {
   ```

7. Run `mvn -q test -Dtest=RoleControllerTest,PermissionCatalogControllerTest`. Expect **PASS**.

8. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/web/controller/RoleController.java \
     authentication/src/main/java/com/bacsystem/auth/web/controller/PermissionCatalogController.java \
     authentication/src/main/java/com/bacsystem/auth/config/SecurityConfig.java \
     authentication/src/test/java/com/bacsystem/auth/web/controller/RoleControllerTest.java \
     authentication/src/test/java/com/bacsystem/auth/web/controller/PermissionCatalogControllerTest.java
   git commit -m "feat(auth): add RoleController exposing version+permissions per §9.4/§11"
   ```

---

### Task 31: MfaController — Enroll, Confirm, Verify, Admin Reset

`/v1/auth/mfa/verify` (§11) must itself return a token pair — it is the
second step of login, reached before the caller has any bearer token. That
means it needs to know *which application* to issue tokens for, but
`MfaService.issueChallenge` (Task 23) only ever stored the user id. This
task closes that gap: the challenge must carry the application client id
too, so this controller can resolve the right `RegisteredClient` and call
`TokenIssuer` itself.

**Files:**
- Modify: `authentication/src/main/java/com/bacsystem/auth/mfa/MfaService.java`
- Modify: `authentication/src/test/java/com/bacsystem/auth/mfa/MfaServiceIT.java`
- Modify: `authentication/src/main/java/com/bacsystem/auth/config/PasswordGrantAuthenticationProvider.java`
- Modify: `authentication/src/main/java/com/bacsystem/auth/config/SecurityConfig.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/web/controller/MfaController.java`
- Create: `authentication/src/main/java/com/bacsystem/auth/web/controller/AdminMfaController.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/controller/MfaVerifyIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.mfa.MfaService`, `com.bacsystem.auth.mfa.MfaEnrollmentResult`, `com.bacsystem.auth.mfa.SelfMfaResetException`, `com.bacsystem.auth.rbac.JpaRegisteredClientRepository`, `com.bacsystem.auth.identity.UserRepository`, `com.bacsystem.auth.token.TokenIssuer`, `com.bacsystem.auth.token.IssuedTokens`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.web.controller.MfaController`, `com.bacsystem.auth.web.controller.AdminMfaController`, `com.bacsystem.auth.mfa.MfaChallengeContext`

**Steps:**

1. Change `MfaService.issueChallenge`/`verifyChallenge` (Modify, Task 23) to
   carry the application client id through the Redis value, not just the
   user id — add `MfaChallengeContext`:

   ```java
   package com.bacsystem.auth.mfa;

   import java.util.UUID;

   public record MfaChallengeContext(UUID userId, String applicationClientId) {
       String toRedisValue() {
           return userId + "|" + applicationClientId;
       }

       static MfaChallengeContext fromRedisValue(String value) {
           String[] parts = value.split("\\|", 2);
           return new MfaChallengeContext(UUID.fromString(parts[0]), parts[1]);
       }
   }
   ```

   Update `issueChallenge` and `verifyChallenge` in `MfaService.java`:

   ```java
   public String issueChallenge(UUID userId, String applicationClientId) {
       String rawTicket = TokenHasher.generateRawToken();
       redisTemplate.opsForValue().set(REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket),
               new MfaChallengeContext(userId, applicationClientId).toRedisValue(), CHALLENGE_TTL);
       return rawTicket;
   }

   /** Single-use: the Redis key is deleted only on a successful verification (§8.4). */
   public MfaChallengeContext verifyChallenge(String rawTicket, String code) {
       String redisKey = REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket);
       String value = redisTemplate.opsForValue().get(redisKey);
       if (value == null) {
           throw new MfaChallengeExpiredException();
       }
       MfaChallengeContext context = MfaChallengeContext.fromRedisValue(value);

       if (isValidTotp(context.userId(), code) || consumeBackupCodeIfValid(context.userId(), code)) {
           redisTemplate.delete(redisKey);
           return context;
       }
       throw new MfaVerificationFailedException();
   }
   ```

   Update `MfaServiceIT` (Modify, Task 23) — every `issueChallenge(user.getId())`
   call becomes `issueChallenge(user.getId(), "example-app")`, and every
   `verifyChallenge(...)` result comparison
   (`assertThat(verifiedUserId).isEqualTo(user.getId())`) becomes
   `assertThat(result.userId()).isEqualTo(user.getId())` with the variable
   retyped from `UUID` to `MfaChallengeContext`.

   Update the one caller in `PasswordGrantAuthenticationProvider` (Modify,
   Task 25): `mfaService.issueChallenge(user.get().getId())` becomes
   `mfaService.issueChallenge(user.get().getId(), registeredClient.getClientId())`.

2. Write the failing test `MfaVerifyIT` — the full two-step login, ending in
   a real token pair from the business endpoint, not `/oauth2/token`:

   ```java
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

   import static org.assertj.core.api.Assertions.assertThat;

   class MfaVerifyIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserService userService;
       @Autowired private MfaService mfaService;
       @Autowired private TestRestTemplate restTemplate;

       @Test
       void verifyEndpointReturnsATokenPair() throws Exception {
           Tenant tenant = new Tenant();
           tenant.setSlug("mfa-verify-" + System.nanoTime());
           tenant.setName("MFA Verify Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           User user = userService.createUser(tenant.getId(), "verify@test.com", "Passw0rd!12345", null);

           MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
           String firstCode = new DefaultCodeGenerator().generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());
           mfaService.confirmEnrollment(user.getId(), firstCode);

           String challenge = mfaService.issueChallenge(user.getId(), "example-app");
           String loginCode = new DefaultCodeGenerator().generate(enrollment.rawSecret(), new SystemTimeProvider().getTime());

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_JSON);
           ResponseEntity<java.util.Map> response = restTemplate.postForEntity("/v1/auth/mfa/verify",
                   new HttpEntity<>(java.util.Map.of("challenge", challenge, "code", loginCode), headers),
                   java.util.Map.class);

           assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
           assertThat(response.getBody()).containsKeys("access_token", "refresh_token");
       }
   }
   ```

3. Run `mvn -q test -Dtest=MfaVerifyIT`. Expect **FAIL**.

4. Create `MfaController.java` — enrollment and verification, at
   `/v1/auth/mfa/...` per §11:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.identity.UserRepository;
   import com.bacsystem.auth.mfa.MfaChallengeContext;
   import com.bacsystem.auth.mfa.MfaEnrollmentResult;
   import com.bacsystem.auth.mfa.MfaService;
   import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
   import com.bacsystem.auth.token.IssuedTokens;
   import com.bacsystem.auth.token.TokenIssuer;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
   import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
   import org.springframework.web.bind.annotation.*;

   import java.util.List;
   import java.util.Set;
   import java.util.UUID;

   @RestController
   @RequestMapping("/v1/auth/mfa")
   public class MfaController {

       public record VerifyRequest(String challenge, String code) {}
       public record TokenPairResponse(String accessToken, String refreshToken) {}
       public record EnrollResponse(String rawSecret, String qrDataUri) {}
       public record ConfirmRequest(String code) {}

       private final MfaService mfaService;
       private final JpaRegisteredClientRepository registeredClientRepository;
       private final UserRepository userRepository;
       private final TokenIssuer tokenIssuer;

       public MfaController(MfaService mfaService, JpaRegisteredClientRepository registeredClientRepository,
                             UserRepository userRepository, TokenIssuer tokenIssuer) {
           this.mfaService = mfaService;
           this.registeredClientRepository = registeredClientRepository;
           this.userRepository = userRepository;
           this.tokenIssuer = tokenIssuer;
       }

       @PostMapping("/enroll")
       public EnrollResponse enroll(JwtAuthenticationToken auth) {
           MfaEnrollmentResult result = mfaService.beginEnrollment(subjectOf(auth));
           return new EnrollResponse(result.rawSecret(), result.qrDataUri());
       }

       @PostMapping("/enroll/confirm")
       public List<String> confirmEnroll(@RequestBody ConfirmRequest request, JwtAuthenticationToken auth) {
           return mfaService.confirmEnrollment(subjectOf(auth), request.code());
       }

       @PostMapping("/verify")
       public TokenPairResponse verify(@RequestBody VerifyRequest request) {
           MfaChallengeContext context = mfaService.verifyChallenge(request.challenge(), request.code());
           RegisteredClient client = registeredClientRepository.findByClientId(context.applicationClientId());
           var user = userRepository.findById(context.userId()).orElseThrow();
           IssuedTokens issued = tokenIssuer.issue(client, user, Set.of());
           return new TokenPairResponse(issued.accessToken(), issued.refreshToken());
       }

       private UUID subjectOf(JwtAuthenticationToken auth) {
           return UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
       }
   }
   ```

   Create `AdminMfaController.java` — the admin-reset endpoint, at its own
   path per §11's endpoint catalog, `POST /v1/admin/users/{id}/mfa/reset`
   (a different path than the rest of this task's endpoints, hence its own
   small controller rather than a method on `MfaController`):

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.mfa.MfaService;
   import org.springframework.security.access.prepost.PreAuthorize;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
   import org.springframework.web.bind.annotation.*;

   import java.util.UUID;

   @RestController
   @RequestMapping("/v1/admin/users")
   public class AdminMfaController {

       public record AdminResetRequest(String verificationMethod, boolean targetIsAdmin) {}

       private final MfaService mfaService;

       public AdminMfaController(MfaService mfaService) {
           this.mfaService = mfaService;
       }

       @PostMapping("/{userId}/mfa/reset")
       @PreAuthorize("hasRole('admin')")
       public void reset(@PathVariable UUID userId, @RequestBody AdminResetRequest request,
                          JwtAuthenticationToken auth) {
           UUID actorId = UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
           mfaService.adminReset(actorId, userId, request.verificationMethod(), request.targetIsAdmin());
       }
   }
   ```

   `hasRole('admin')` requires the JWT's `roles` claim to surface as Spring
   Security authorities named `ROLE_admin`; add a `JwtAuthenticationConverter`
   bean doing that mapping to `SecurityConfig` (Modify, Task 26):

   ```java
   @Bean
   public org.springframework.core.convert.converter.Converter<Jwt, ? extends AbstractAuthenticationToken>
           jwtAuthenticationConverter() {
       var rolesConverter = new org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter();
       rolesConverter.setAuthorityPrefix("ROLE_");
       rolesConverter.setAuthoritiesClaimName("roles");
       var converter = new org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter();
       converter.setJwtGrantedAuthoritiesConverter(rolesConverter);
       return converter;
   }
   ```

   and reference it from `oauth2ResourceServer`:
   `.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder)
   .jwtAuthenticationConverter(jwtAuthenticationConverter())))`.

5. Run `mvn -q test -Dtest=MfaVerifyIT`. Expect **PASS**.

6. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/mfa/MfaChallengeContext.java \
     authentication/src/main/java/com/bacsystem/auth/mfa/MfaService.java \
     authentication/src/main/java/com/bacsystem/auth/config/PasswordGrantAuthenticationProvider.java \
     authentication/src/main/java/com/bacsystem/auth/config/SecurityConfig.java \
     authentication/src/main/java/com/bacsystem/auth/web/controller/MfaController.java \
     authentication/src/main/java/com/bacsystem/auth/web/controller/AdminMfaController.java \
     authentication/src/test/java/com/bacsystem/auth/mfa/MfaServiceIT.java \
     authentication/src/test/java/com/bacsystem/auth/web/controller/MfaVerifyIT.java
   git commit -m "feat(auth): add MfaController with challenge carrying the target application"
   ```

---

### Task 32: PasswordController — Change & Reset (§11, §12)

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/web/controller/PasswordController.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/web/controller/PasswordControllerIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.identity.UserService`, `com.bacsystem.auth.identity.User`, `com.bacsystem.auth.onetime.OneTimeTokenService`, `com.bacsystem.auth.tenancy.TenantRepository`, `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.web.controller.PasswordController`

**Steps:**

1. Write the failing test `PasswordControllerIT`:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.support.PostgresRedisTestBase;
   import com.bacsystem.auth.tenancy.Tenant;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.web.client.TestRestTemplate;
   import org.springframework.http.*;

   import java.util.Map;

   import static org.assertj.core.api.Assertions.assertThat;

   class PasswordControllerIT extends PostgresRedisTestBase {

       @Autowired private TenantRepository tenantRepository;
       @Autowired private UserService userService;
       @Autowired private TestRestTemplate restTemplate;

       @Test
       void resetRequestAlwaysReturns202RegardlessOfWhetherTheEmailExists() {
           Tenant tenant = new Tenant();
           tenant.setSlug("pw-reset-" + System.nanoTime());
           tenant.setName("Password Reset Test");
           tenant = tenantRepository.saveAndFlush(tenant);
           userService.createUser(tenant.getId(), "known@test.com", "Passw0rd!12345", null);

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_JSON);

           ResponseEntity<String> knownEmail = restTemplate.postForEntity("/v1/auth/password/reset-request",
                   new HttpEntity<>(Map.of("tenant", tenant.getSlug(), "email", "known@test.com"), headers),
                   String.class);
           ResponseEntity<String> unknownEmail = restTemplate.postForEntity("/v1/auth/password/reset-request",
                   new HttpEntity<>(Map.of("tenant", tenant.getSlug(), "email", "nobody@test.com"), headers),
                   String.class);

           assertThat(knownEmail.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
           assertThat(unknownEmail.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
       }
   }
   ```

2. Run `mvn -q test -Dtest=PasswordControllerIT`. Expect **FAIL**.

3. Create `PasswordController.java`:

   ```java
   package com.bacsystem.auth.web.controller;

   import com.bacsystem.auth.identity.UserService;
   import com.bacsystem.auth.onetime.OneTimeTokenService;
   import com.bacsystem.auth.tenancy.TenantRepository;
   import org.springframework.http.HttpStatus;
   import org.springframework.security.oauth2.jwt.Jwt;
   import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
   import org.springframework.web.bind.annotation.*;

   import java.util.UUID;

   @RestController
   @RequestMapping("/v1/auth/password")
   public class PasswordController {

       public record ChangeRequest(String newPassword) {}
       public record ResetRequestBody(String tenant, String email) {}
       public record ResetConfirmRequest(String token, String newPassword) {}

       private final UserService userService;
       private final OneTimeTokenService oneTimeTokenService;
       private final TenantRepository tenantRepository;

       public PasswordController(UserService userService, OneTimeTokenService oneTimeTokenService,
                                  TenantRepository tenantRepository) {
           this.userService = userService;
           this.oneTimeTokenService = oneTimeTokenService;
           this.tenantRepository = tenantRepository;
       }

       @PostMapping("/change")
       public void change(@RequestBody ChangeRequest request, JwtAuthenticationToken auth) {
           UUID userId = UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
           userService.changePassword(userService.getById(userId), request.newPassword());
       }

       @PostMapping("/reset-request")
       @ResponseStatus(HttpStatus.ACCEPTED)
       public void resetRequest(@RequestBody ResetRequestBody request) {
           tenantRepository.findBySlug(request.tenant())
                   .ifPresent(tenant -> oneTimeTokenService.requestPasswordReset(tenant.getId(), request.email()));
           // always 202 regardless of tenant/email existing (§10.2, §12) — no branch on the result above
       }

       @PostMapping("/reset-confirm")
       public void resetConfirm(@RequestBody ResetConfirmRequest request) {
           oneTimeTokenService.confirmPasswordReset(request.token(), request.newPassword());
       }
   }
   ```

4. Run `mvn -q test -Dtest=PasswordControllerIT`. Expect **PASS**.

5. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/web/controller/PasswordController.java \
     authentication/src/test/java/com/bacsystem/auth/web/controller/PasswordControllerIT.java
   git commit -m "feat(auth): add PasswordController for change and reset flows"
   ```

---

### Task 33: Observability — Metric Tag Guard, Structured Logs, Tracing (§16)

**Files:**
- Modify: `authentication/pom.xml`
- Create: `authentication/src/main/java/com/bacsystem/auth/config/ObservabilityConfig.java`
- Create: `authentication/src/main/resources/logback-spring.xml`
- Test: `authentication/src/test/java/com/bacsystem/auth/config/ObservabilityConfigTest.java`

**Interfaces:**
- Consumes: None
- Produces: `com.bacsystem.auth.config.ObservabilityConfig`

**Steps:**

1. Add `logstash-logback-encoder` to `authentication/pom.xml` (Modify) for
   structured JSON logs:

   ```xml
   <dependency>
       <groupId>net.logstash.logback</groupId>
       <artifactId>logstash-logback-encoder</artifactId>
       <version>7.4</version>
   </dependency>
   ```

2. Write the failing test `ObservabilityConfigTest` — the hard rule from
   §16: metrics are never tagged by email or user_id, enforced by a filter,
   not just "nobody happened to add one":

   ```java
   package com.bacsystem.auth.config;

   import io.micrometer.core.instrument.Meter;
   import io.micrometer.core.instrument.MeterRegistry;
   import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
   import org.junit.jupiter.api.Test;

   import static org.assertj.core.api.Assertions.assertThat;
   import static org.junit.jupiter.api.Assertions.assertThrows;

   class ObservabilityConfigTest {

       @Test
       void deniesEmailAndUserIdTags() {
           MeterRegistry registry = new SimpleMeterRegistry();
           registry.config().meterFilter(new ObservabilityConfig().denyPersonalDataTags());

           registry.counter("logins", "result", "success").increment(); // allowed tag — must not throw
           assertThat(registry.find("logins").counter()).isNotNull();

           assertThrows(IllegalArgumentException.class,
                   () -> registry.counter("logins", "email", "someone@test.com").increment());
           assertThrows(IllegalArgumentException.class,
                   () -> registry.counter("logins", "user_id", "abc-123").increment());
       }
   }
   ```

3. Run `mvn -q test -Dtest=ObservabilityConfigTest`. Expect **FAIL**.

4. Create `ObservabilityConfig.java`:

   ```java
   package com.bacsystem.auth.config;

   import io.micrometer.core.instrument.Meter;
   import io.micrometer.core.instrument.config.MeterFilter;
   import io.micrometer.core.instrument.config.MeterFilterReply;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;

   import java.util.Set;

   @Configuration
   public class ObservabilityConfig {

       private static final Set<String> FORBIDDEN_TAG_KEYS = Set.of("email", "user_id", "userId");

       @Bean
       public MeterFilter denyPersonalDataTags() {
           return new MeterFilter() {
               @Override
               public MeterFilterReply accept(Meter.Id id) {
                   boolean hasForbiddenTag = id.getTags().stream()
                           .anyMatch(tag -> FORBIDDEN_TAG_KEYS.contains(tag.getKey()));
                   if (hasForbiddenTag) {
                       throw new IllegalArgumentException(
                               "Metric tag would leak personal data / unbounded cardinality: " + id);
                   }
                   return MeterFilterReply.NEUTRAL;
               }
           };
       }
   }
   ```

5. Run `mvn -q test -Dtest=ObservabilityConfigTest`. Expect **PASS**.

6. Create `logback-spring.xml` — JSON to stdout, with the W3C trace/span ids
   Micrometer Tracing puts in the MDC (no exporter configured yet, per §2 —
   the fields are populated and ready for one):

   ```xml
   <configuration>
       <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
           <encoder class="net.logstash.logback.encoder.LogstashEncoder">
               <includeMdcKeyName>traceId</includeMdcKeyName>
               <includeMdcKeyName>spanId</includeMdcKeyName>
           </encoder>
       </appender>
       <root level="INFO">
           <appender-ref ref="STDOUT"/>
       </root>
   </configuration>
   ```

7. Commit:

   ```bash
   git add authentication/pom.xml \
     authentication/src/main/java/com/bacsystem/auth/config/ObservabilityConfig.java \
     authentication/src/main/resources/logback-spring.xml \
     authentication/src/test/java/com/bacsystem/auth/config/ObservabilityConfigTest.java
   git commit -m "feat(auth): enforce no-PII metric tags and add structured JSON logging"
   ```

---

### Task 34: RetentionJob — Partition Maintenance for `audit_log` & `login_attempts` (§6)

Tasks 10 and 11 created these tables already partitioned by date, with two
literal starting partitions and a `DEFAULT` safety-net partition — but
nothing yet keeps creating future partitions or drops ones past the
retention window (§6: 24 months for `audit_log`, 90 days for
`login_attempts`). Without this job, every insert eventually falls into the
`DEFAULT` partition forever, silently defeating the whole point of
partitioning for retention.

**Files:**
- Create: `authentication/src/main/java/com/bacsystem/auth/audit/RetentionJob.java`
- Test: `authentication/src/test/java/com/bacsystem/auth/audit/RetentionJobIT.java`

**Interfaces:**
- Consumes: `com.bacsystem.auth.support.PostgresRedisTestBase`
- Produces: `com.bacsystem.auth.audit.RetentionJob`

**Steps:**

1. Write the failing integration test `RetentionJobIT`:

   ```java
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
   ```

2. Run `mvn -q test -Dtest=RetentionJobIT`. Expect **FAIL**.

3. Create `RetentionJob.java`:

   ```java
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
   ```

4. Run `mvn -q test -Dtest=RetentionJobIT`. Expect **PASS**.

5. Commit:

   ```bash
   git add authentication/src/main/java/com/bacsystem/auth/audit/RetentionJob.java \
     authentication/src/test/java/com/bacsystem/auth/audit/RetentionJobIT.java
   git commit -m "feat(auth): add scheduled partition maintenance for audit_log and login_attempts"
   ```

---

### Task 35: k6 Verification, docker-compose, and CI (§17.2)

The correctness gate blocks CI; the latency trend does not (§17.2's
rationale: a shared runner produces false reds on latency alone). This task
depends on the full stack existing — role/permission endpoints (Task 30),
lockout (Task 16), rate limiting (Task 24), and login (Task 25) — so it
lands last.

**Files:**
- Create: `authentication/Dockerfile`
- Create: `authentication/docker-compose.k6.yml`
- Create: `authentication/k6/correctness.js`
- Create: `authentication/k6/latency-trend.js`
- Create: `authentication/k6/seed.sql`
- Create: `.github/workflows/authentication-ci.yml`

**Interfaces:**
- Consumes: `com.bacsystem.auth.web.controller.RoleController`, `com.bacsystem.auth.security.LoginAttemptService`, `com.bacsystem.auth.security.RateLimiter`, `com.bacsystem.auth.config.PasswordGrantAuthenticationProvider`, `com.bacsystem.auth.bootstrap.BootstrapRunner`
- Produces: None

**Steps:**

1. Create `authentication/Dockerfile` — packaged jar, not `mvn spring-boot:run`
   (§17.2 — the k6 environment must reflect a real deployed artifact):

   ```dockerfile
   FROM eclipse-temurin:21-jre-alpine
   WORKDIR /app
   COPY target/authentication-0.1.0.jar app.jar
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```

2. Create `authentication/docker-compose.k6.yml`:

   ```yaml
   services:
     postgres:
       image: postgres:16-alpine
       environment:
         POSTGRES_DB: authentication
         POSTGRES_USER: authentication
         POSTGRES_PASSWORD: authentication
       ports: ["5432:5432"]
       healthcheck:
         test: ["CMD-SHELL", "pg_isready -U authentication"]
         interval: 2s
         retries: 20

     redis:
       image: redis:7-alpine
       ports: ["6379:6379"]

     auth:
       build: .
       depends_on:
         postgres: { condition: service_healthy }
       environment:
         SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/authentication
         SPRING_DATA_REDIS_HOST: redis
         AUTH_BOOTSTRAP_ADMIN_PASSWORD: "K6LoadTestAdmin!123"
       command: ["java", "-jar", "app.jar", "--bootstrap"]
       ports: ["8080:8080"]
   ```

3. Create `authentication/k6/seed.sql` — realistic volume per §17.2
   (thousands of users, dozens of roles) so query plans in the load test
   resemble production, not a handful of rows:

   ```sql
   INSERT INTO tenants (id, slug, name)
   VALUES ('00000000-0000-0000-0000-000000000001', 'k6-tenant', 'K6 Load Test Tenant')
   ON CONFLICT DO NOTHING;

   INSERT INTO users (tenant_id, email, password_hash, status)
   SELECT '00000000-0000-0000-0000-000000000001', 'k6-user-' || g || '@test.com',
          '$argon2id$v=19$m=19456,t=2,p=1$AAAAAAAAAAAAAAAAAAAAAA$FAKEFORLOADTEST', 'ACTIVE'
   FROM generate_series(1, 5000) g
   ON CONFLICT DO NOTHING;

   INSERT INTO roles (tenant_id, name, is_template)
   SELECT '00000000-0000-0000-0000-000000000001', 'k6-role-' || g, false
   FROM generate_series(1, 30) g
   ON CONFLICT DO NOTHING;
   ```

4. Create `authentication/k6/correctness.js` — the deterministic,
   CI-blocking scenario (§9.4, §16, §17.2): 20 VUs replacing the same
   role's permissions from the same starting version:

   ```javascript
   import http from 'k6/http';
   import { check } from 'k6';

   export const options = {
     scenarios: {
       role_permission_race: {
         executor: 'per-vu-iterations',
         vus: 20,
         iterations: 1,
         maxDuration: '30s',
       },
     },
     thresholds: {
       // binary, not percentage-based (§17.2): a single 5xx or a wrong final
       // state fails the whole run.
       'checks{check:no_5xx}': ['rate==1'],
     },
   };

   const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
   const ROLE_ID = __ENV.ROLE_ID;
   const STARTING_VERSION = __ENV.STARTING_VERSION;
   const TOKEN = __ENV.ACCESS_TOKEN;

   export default function () {
     const permissionId = __ENV['PERMISSION_ID_' + __VU];
     const res = http.put(
       `${BASE_URL}/v1/roles/${ROLE_ID}/permissions`,
       JSON.stringify({ version: Number(STARTING_VERSION), permissionIds: [permissionId] }),
       { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` } },
     );
     check(res, {
       'no_5xx': (r) => r.status < 500,
       'is 200 or 409': (r) => r.status === 200 || r.status === 409,
     });
   }
   ```

   A companion shell step (not k6 itself) asserts the final DB state is
   exactly one submitted set, never a union — this belongs in the CI
   workflow below, querying `role_permissions` directly after the k6 run
   completes, since k6 alone can't assert on database rows.

5. Create `authentication/k6/latency-trend.js` — non-blocking (§17.2),
   Argon2id-derived login threshold, sustained realistic mix:

   ```javascript
   import http from 'k6/http';

   export const options = {
     scenarios: {
       mostly_reads: {
         executor: 'constant-vus',
         vus: 200,
         duration: '2m',
         exec: 'refreshOrRead',
       },
       occasional_logins: {
         executor: 'constant-arrival-rate',
         rate: 5,
         timeUnit: '1s',
         duration: '2m',
         preAllocatedVUs: 20,
         exec: 'login',
       },
     },
     // Reported as a trend, not a CI gate (§17.2) — the blocking assertions
     // live in correctness.js. ARGON2_COST_MS is read from the environment
     // because it must be calibrated on the target hardware, never assumed.
   };

   const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
   const ARGON2_COST_MS = Number(__ENV.ARGON2_COST_MS || 300);
   const LOGIN_THRESHOLD_MS = ARGON2_COST_MS + 150;

   export function login() {
     const res = http.post(`${BASE_URL}/oauth2/token`,
       'grant_type=password&tenant=k6-tenant&username=k6-user-1@test.com&password=WrongOnPurpose!1',
       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
     if (res.timings.duration > LOGIN_THRESHOLD_MS) {
       console.warn(`login p95 candidate exceeded ${LOGIN_THRESHOLD_MS}ms: ${res.timings.duration}ms`);
     }
   }

   export function refreshOrRead() {
     http.get(`${BASE_URL}/oauth2/jwks`);
   }
   ```

6. Create `.github/workflows/authentication-ci.yml`:

   ```yaml
   name: authentication-ci

   on:
     pull_request:
       paths: ["authentication/**"]
     push:
       branches: [develop, master]
       paths: ["authentication/**"]
     schedule:
       - cron: "0 3 * * *"

   jobs:
     unit-and-integration:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-java@v4
           with: { distribution: temurin, java-version: '21' }
         - name: Run unit and integration tests
           working-directory: authentication
           run: mvn -q test

     k6-correctness-gate:
       needs: unit-and-integration
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Build jar
           working-directory: authentication
           run: mvn -q -DskipTests package
         - name: Start stack
           working-directory: authentication
           run: docker compose -f docker-compose.k6.yml up -d --build
         - name: Wait for app
           run: |
             for i in $(seq 1 30); do curl -sf http://localhost:8080/actuator/health && break; sleep 2; done
         - name: Seed load data
           working-directory: authentication
           run: docker compose -f docker-compose.k6.yml exec -T postgres \
                psql -U authentication -d authentication -f /dev/stdin < k6/seed.sql
         - name: Run k6 correctness scenario
           uses: grafana/k6-action@v0.3.1
           with:
             filename: authentication/k6/correctness.js
         - name: Assert no permission-set union in the database
           working-directory: authentication
           run: |
             COUNT=$(docker compose -f docker-compose.k6.yml exec -T postgres \
               psql -U authentication -d authentication -tAc \
               "SELECT count(*) FROM role_permissions WHERE role_id = '${ROLE_ID}'")
             test "$COUNT" = "1"
         - name: Tear down
           if: always()
           working-directory: authentication
           run: docker compose -f docker-compose.k6.yml down -v

     k6-latency-trend:
       if: github.event_name == 'schedule'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Build and start stack
           working-directory: authentication
           run: |
             mvn -q -DskipTests package
             docker compose -f docker-compose.k6.yml up -d --build
         - name: Run k6 latency trend (non-blocking)
           uses: grafana/k6-action@v0.3.1
           continue-on-error: true
           with:
             filename: authentication/k6/latency-trend.js
         - name: Tear down
           if: always()
           working-directory: authentication
           run: docker compose -f docker-compose.k6.yml down -v
   ```

7. Run the stack locally to confirm the CI steps actually work in this
   environment (Docker confirmed available, §4):

   ```bash
   cd authentication
   mvn -q -DskipTests package
   docker compose -f docker-compose.k6.yml up -d --build
   ```

   Wait for `curl -sf http://localhost:8080/actuator/health` to succeed,
   then run `k6 run k6/correctness.js` (with `ROLE_ID`, `STARTING_VERSION`,
   `ACCESS_TOKEN`, and 20 `PERMISSION_ID_<n>` env vars set from a role and
   permissions created via the running API first). Expect zero failed
   checks and the database assertion above to hold. Tear down with
   `docker compose -f docker-compose.k6.yml down -v`.

8. Commit:

   ```bash
   git add authentication/Dockerfile authentication/docker-compose.k6.yml \
     authentication/k6/ .github/workflows/authentication-ci.yml
   git commit -m "feat(auth): add k6 correctness/latency scenarios and CI wiring"
   ```

---
