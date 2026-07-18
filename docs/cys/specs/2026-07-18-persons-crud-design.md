# Persons CRUD — Design Spec

**Date:** 2026-07-18
**Status:** Approved

## 1. Goal

A CRUD REST API for managing person records, self-contained in a `persons/`
directory with its own Maven project — the same "own directory, own build
file" shape as the earlier `factorial/` and `subtract/` pilots, but this run
switches stack to Java 17 / Spring Boot with MongoDB persistence.

## 2. Stack

- **Language:** Java 17.
- **Framework:** Spring Boot 3.x (`spring-boot-starter-web`,
  `spring-boot-starter-data-mongodb`, `spring-boot-starter-validation`).
- **Build tool:** Maven (`persons/pom.xml`).
- **Persistence:** MongoDB via Spring Data MongoDB (`MongoRepository`). No
  other runtime dependencies.

## 3. Domain model

```java
@Document(collection = "persons")
public class Person {
    @Id
    private String id;              // Mongo ObjectId as hex string

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String documentId;      // required, unique across all persons

    @NotBlank @Email
    private String email;

    @NotNull @Past
    private LocalDate birthDate;    // required, must not be in the future

    private String phone;           // optional
}
```

Bean Validation annotations are the single source of truth for per-field
shape validation. Uniqueness of `documentId` cannot be expressed as a Bean
Validation annotation (it depends on stored data) — it is enforced in the
service layer.

## 4. REST API

| Method | Path                        | Success | Failure modes |
|--------|-----------------------------|---------|----------------|
| POST   | `/api/v1/persons`           | 201, body = created person, `Location` header | 400 validation, 409 duplicate `documentId` |
| GET    | `/api/v1/persons/{id}`      | 200, body = person | 404 not found |
| GET    | `/api/v1/persons?page=0&size=20` | 200, body = `{data: [...], page, size, total}` | 400 invalid pagination params |
| PUT    | `/api/v1/persons/{id}`      | 200, body = updated person | 400 validation, 404 not found, 409 duplicate `documentId` |
| DELETE | `/api/v1/persons/{id}`      | 204 | 404 not found |

Errors are always JSON: `{"error": {"code": "...", "message": "..."}}` —
`code` is one of `VALIDATION_ERROR`, `NOT_FOUND`, `DUPLICATE_DOCUMENT_ID`,
`INVALID_PAGINATION`, `INTERNAL_ERROR`. Pagination: `page` defaults to `0`
and `size` defaults to `20` when the query param is absent; `size` above
100 is silently clamped to 100 (normalization, not an error). `400
INVALID_PAGINATION` is returned only for a negative `page`/`size` or a
non-integer value.

**Update semantics:** PUT is a full replace — the client sends the complete
Person; the service does not merge partial fields.

## 5. Architecture

Standard Spring Boot layering (Controller → Service → Repository →
Document), chosen for consistency with the layered shape already used by
this repo's Go pilots (`domain`/`repository`/`service`/`handler`) and
because it keeps the service layer testable without a real MongoDB:

```
persons/
  pom.xml
  src/main/java/com/bacsystem/persons/
    PersonsApplication.java          — main, @SpringBootApplication
    model/Person.java                — @Document + Bean Validation annotations
    repository/PersonRepository.java — extends MongoRepository<Person, String>,
                                        adds existsByDocumentId(String)
    service/PersonService.java       — business rules: validates uniqueness of
                                        documentId, normalizes pagination
                                        (defaults, size cap), delegates
                                        storage to PersonRepository
    service/PersonNotFoundException.java
    service/DuplicateDocumentIdException.java
    controller/PersonController.java — @RestController, @Valid on request body,
                                        decodes/encodes JSON via Spring MVC
    web/ErrorResponse.java           — error envelope record/class
    web/GlobalExceptionHandler.java  — @RestControllerAdvice; maps
                                        MethodArgumentNotValidException,
                                        PersonNotFoundException,
                                        DuplicateDocumentIdException, and
                                        generic Exception to the error
                                        envelope + HTTP status
  src/test/java/com/bacsystem/persons/
    service/PersonServiceTest.java     — Mockito-mocked PersonRepository
    controller/PersonControllerTest.java — @WebMvcTest + MockMvc,
                                            @MockBean PersonService
```

## 6. Error handling

Errors flow up as typed exceptions (`PersonNotFoundException`,
`DuplicateDocumentIdException`, Spring's `MethodArgumentNotValidException`)
and are translated to HTTP status **only** in `GlobalExceptionHandler` —
`PersonService` and `PersonRepository` stay HTTP-agnostic.

## 7. Testing strategy

Mocks only — no real MongoDB, no Testcontainers, no Docker dependency. This
follows the constraint recorded in the `subtract-api` design spec: this
environment's Application Control policy blocks running a compiled binary,
and Testcontainers would require a live Docker daemon that is expected to
hit the same restriction.

- `PersonServiceTest`: Mockito mocks `PersonRepository`; covers create,
  duplicate `documentId`, not-found, pagination normalization.
- `PersonControllerTest`: `@WebMvcTest(PersonController.class)` +
  `MockMvc`, `PersonService` mocked via `@MockBean`; covers every status
  code in the API table above.
- **Explicitly out of scope for automated verification in this
  environment**: `PersonRepository` correctness against a real MongoDB
  instance.

## 8. Out of scope (explicit YAGNI)

- Authentication/authorization.
- Soft-delete, audit fields (`createdAt`/`updatedAt`).
- Search/filter beyond pagination.
- Rate limiting, request logging middleware, OpenAPI/Swagger generation.
- Docker Compose / deployment manifests for the service itself.
