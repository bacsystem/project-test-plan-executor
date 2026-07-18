# Persons CRUD Implementation Plan

> **For agentic workers:** execute this plan with the
> parallel-plan-executor Workflow (cys:run / the /cys:run-plan command).
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A CRUD REST API for managing person records, built as a
self-contained Spring Boot (Java 17, Maven) module under `persons/`,
persisted with MongoDB via Spring Data.

**Architecture:** Standard Spring Boot layering — `model` (Mongo document +
Bean Validation) → `repository` (`MongoRepository`) → `service` (business
rules, pagination normalization) → `controller` + `web` (REST endpoints,
error mapping). Repository and pagination-normalization are independent of
each other once the model exists, so they run as parallel tasks; service
and controller are strictly sequential on top of them.

**Tech Stack:** Java 17, Spring Boot 3.3.4 (`spring-boot-starter-web`,
`spring-boot-starter-data-mongodb`, `spring-boot-starter-validation`,
`spring-boot-starter-test`), Maven, JUnit 5, Mockito.

## Global Constraints

- Module root: `persons/` with its own `persons/pom.xml` — a self-contained
  Maven project, the same "own directory, own build file" shape as the
  repo's existing `factorial/` and `subtract/` Go pilots.
- Package root: `com.bacsystem.persons`.
- Java 17, Spring Boot 3.3.4 parent, Maven only — no Lombok, no dependency
  beyond the four starters listed above.
- Error envelope for every 4xx/5xx response:
  `{"error": {"code": "<CODE>", "message": "<message>"}}` — codes:
  `VALIDATION_ERROR`, `NOT_FOUND`, `DUPLICATE_DOCUMENT_ID`,
  `INVALID_PAGINATION`, `INTERNAL_ERROR`.
- **Tests use mocks only** — Mockito for service-layer tests, `@WebMvcTest`
  + `MockMvc` + `@MockBean` for controller tests. No real MongoDB, no
  Testcontainers, no Docker dependency anywhere in the test suite (this
  environment's Application Control policy is known to block running
  compiled/forked binaries — see the `subtract-api` design spec).
- Run tests from the module root: `cd persons && mvn -q test -Dtest=<Class>`
  (omit `-Dtest` to run the whole suite). Every step below gives the exact
  class/method to target.
- PUT is a full replace, never a partial merge.
- Pagination: `page` defaults to `0`, `size` defaults to `20` when absent;
  `size` above `100` is clamped to `100`; a negative `page`/`size` or a
  non-integer value returns `400 INVALID_PAGINATION`.

---

### Task 1: Project Scaffold & Domain Model

**Files:**
- Create: `persons/pom.xml`
- Create: `persons/.gitignore`
- Create: `persons/src/main/resources/application.yml`
- Create: `persons/src/main/java/com/bacsystem/persons/PersonsApplication.java`
- Create: `persons/src/main/java/com/bacsystem/persons/model/Person.java`
- Create: `persons/src/main/java/com/bacsystem/persons/service/PersonNotFoundException.java`
- Create: `persons/src/main/java/com/bacsystem/persons/service/DuplicateDocumentIdException.java`
- Create: `persons/src/main/java/com/bacsystem/persons/service/InvalidPaginationException.java`
- Test: `persons/src/test/java/com/bacsystem/persons/model/PersonValidationTest.java`

**Interfaces:**
- Consumes: None
- Produces: `com.bacsystem.persons.model.Person`
- Produces: `com.bacsystem.persons.service.PersonNotFoundException`
- Produces: `com.bacsystem.persons.service.DuplicateDocumentIdException`
- Produces: `com.bacsystem.persons.service.InvalidPaginationException`

**Steps:**

1. Create `persons/pom.xml`:

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
       <artifactId>persons</artifactId>
       <version>0.1.0</version>
       <packaging>jar</packaging>

       <properties>
           <java.version>17</java.version>
       </properties>

       <dependencies>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-data-mongodb</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-validation</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-test</artifactId>
               <scope>test</scope>
           </dependency>
       </dependencies>

       <build>
           <plugins>
               <plugin>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-maven-plugin</artifactId>
               </plugin>
           </plugins>
       </build>
   </project>
   ```

2. Create `persons/.gitignore`:

   ```
   target/
   *.class
   ```

3. Create `persons/src/main/resources/application.yml`:

   ```yaml
   spring:
     data:
       mongodb:
         uri: ${MONGODB_URI:mongodb://localhost:27017/persons}

   server:
     port: ${PORT:8080}
   ```

4. Create `persons/src/main/java/com/bacsystem/persons/PersonsApplication.java`:

   ```java
   package com.bacsystem.persons;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;

   @SpringBootApplication
   public class PersonsApplication {
       public static void main(String[] args) {
           SpringApplication.run(PersonsApplication.class, args);
       }
   }
   ```

5. Verify the scaffold compiles: run `cd persons && mvn -q compile`, expect
   `BUILD SUCCESS` with no output on success.

6. Commit the scaffold:

   ```
   git add persons/pom.xml persons/.gitignore persons/src/main/resources/application.yml persons/src/main/java/com/bacsystem/persons/PersonsApplication.java
   git commit -m "feat(persons): scaffold Spring Boot module"
   ```

7. Write the failing test — create
   `persons/src/test/java/com/bacsystem/persons/model/PersonValidationTest.java`:

   ```java
   package com.bacsystem.persons.model;

   import jakarta.validation.ConstraintViolation;
   import jakarta.validation.Validation;
   import jakarta.validation.Validator;
   import jakarta.validation.ValidatorFactory;
   import org.junit.jupiter.api.AfterAll;
   import org.junit.jupiter.api.BeforeAll;
   import org.junit.jupiter.api.Test;

   import java.time.LocalDate;
   import java.util.Set;

   import static org.junit.jupiter.api.Assertions.assertEquals;
   import static org.junit.jupiter.api.Assertions.assertTrue;

   class PersonValidationTest {

       private static ValidatorFactory factory;
       private static Validator validator;

       @BeforeAll
       static void setUp() {
           factory = Validation.buildDefaultValidatorFactory();
           validator = factory.getValidator();
       }

       @AfterAll
       static void tearDown() {
           factory.close();
       }

       @Test
       void validPersonHasNoViolations() {
           Person person = new Person(null, "Ada", "Lovelace", "DOC-1",
                   "ada@example.com", LocalDate.of(1990, 1, 1), "555-0100");

           Set<ConstraintViolation<Person>> violations = validator.validate(person);

           assertTrue(violations.isEmpty());
       }

       @Test
       void blankFirstNameIsRejected() {
           Person person = new Person(null, "", "Lovelace", "DOC-1",
                   "ada@example.com", LocalDate.of(1990, 1, 1), null);

           Set<ConstraintViolation<Person>> violations = validator.validate(person);

           assertEquals(1, violations.size());
           assertEquals("firstName", violations.iterator().next().getPropertyPath().toString());
       }

       @Test
       void invalidEmailIsRejected() {
           Person person = new Person(null, "Ada", "Lovelace", "DOC-1",
                   "not-an-email", LocalDate.of(1990, 1, 1), null);

           Set<ConstraintViolation<Person>> violations = validator.validate(person);

           assertEquals(1, violations.size());
           assertEquals("email", violations.iterator().next().getPropertyPath().toString());
       }

       @Test
       void futureBirthDateIsRejected() {
           Person person = new Person(null, "Ada", "Lovelace", "DOC-1",
                   "ada@example.com", LocalDate.now().plusDays(1), null);

           Set<ConstraintViolation<Person>> violations = validator.validate(person);

           assertEquals(1, violations.size());
           assertEquals("birthDate", violations.iterator().next().getPropertyPath().toString());
       }
   }
   ```

8. Run it, expect FAIL: `cd persons && mvn -q test -Dtest=PersonValidationTest`
   — compilation error, `Person` does not exist yet.

9. Create `persons/src/main/java/com/bacsystem/persons/model/Person.java`:

   ```java
   package com.bacsystem.persons.model;

   import jakarta.validation.constraints.Email;
   import jakarta.validation.constraints.NotBlank;
   import jakarta.validation.constraints.NotNull;
   import jakarta.validation.constraints.Past;
   import org.springframework.data.annotation.Id;
   import org.springframework.data.mongodb.core.mapping.Document;

   import java.time.LocalDate;
   import java.util.Objects;

   @Document(collection = "persons")
   public class Person {

       @Id
       private String id;

       @NotBlank
       private String firstName;

       @NotBlank
       private String lastName;

       @NotBlank
       private String documentId;

       @NotBlank
       @Email
       private String email;

       @NotNull
       @Past
       private LocalDate birthDate;

       private String phone;

       public Person() {
       }

       public Person(String id, String firstName, String lastName, String documentId,
                     String email, LocalDate birthDate, String phone) {
           this.id = id;
           this.firstName = firstName;
           this.lastName = lastName;
           this.documentId = documentId;
           this.email = email;
           this.birthDate = birthDate;
           this.phone = phone;
       }

       public String getId() {
           return id;
       }

       public void setId(String id) {
           this.id = id;
       }

       public String getFirstName() {
           return firstName;
       }

       public void setFirstName(String firstName) {
           this.firstName = firstName;
       }

       public String getLastName() {
           return lastName;
       }

       public void setLastName(String lastName) {
           this.lastName = lastName;
       }

       public String getDocumentId() {
           return documentId;
       }

       public void setDocumentId(String documentId) {
           this.documentId = documentId;
       }

       public String getEmail() {
           return email;
       }

       public void setEmail(String email) {
           this.email = email;
       }

       public LocalDate getBirthDate() {
           return birthDate;
       }

       public void setBirthDate(LocalDate birthDate) {
           this.birthDate = birthDate;
       }

       public String getPhone() {
           return phone;
       }

       public void setPhone(String phone) {
           this.phone = phone;
       }

       @Override
       public boolean equals(Object o) {
           if (this == o) return true;
           if (!(o instanceof Person)) return false;
           Person person = (Person) o;
           return Objects.equals(id, person.id)
                   && Objects.equals(firstName, person.firstName)
                   && Objects.equals(lastName, person.lastName)
                   && Objects.equals(documentId, person.documentId)
                   && Objects.equals(email, person.email)
                   && Objects.equals(birthDate, person.birthDate)
                   && Objects.equals(phone, person.phone);
       }

       @Override
       public int hashCode() {
           return Objects.hash(id, firstName, lastName, documentId, email, birthDate, phone);
       }
   }
   ```

10. Run the test, expect PASS: `cd persons && mvn -q test -Dtest=PersonValidationTest`.

11. Commit:

    ```
    git add persons/src/main/java/com/bacsystem/persons/model/Person.java persons/src/test/java/com/bacsystem/persons/model/PersonValidationTest.java
    git commit -m "feat(persons): add Person document with Bean Validation"
    ```

12. Create the three exception classes (no test — they are two-line data
    carriers whose behavior is exercised through the callers that throw
    them in later tasks):

    `persons/src/main/java/com/bacsystem/persons/service/PersonNotFoundException.java`:

    ```java
    package com.bacsystem.persons.service;

    public class PersonNotFoundException extends RuntimeException {
        public PersonNotFoundException(String id) {
            super("Person not found: " + id);
        }
    }
    ```

    `persons/src/main/java/com/bacsystem/persons/service/DuplicateDocumentIdException.java`:

    ```java
    package com.bacsystem.persons.service;

    public class DuplicateDocumentIdException extends RuntimeException {
        public DuplicateDocumentIdException(String documentId) {
            super("Person with documentId already exists: " + documentId);
        }
    }
    ```

    `persons/src/main/java/com/bacsystem/persons/service/InvalidPaginationException.java`:

    ```java
    package com.bacsystem.persons.service;

    public class InvalidPaginationException extends RuntimeException {
        public InvalidPaginationException(String message) {
            super(message);
        }
    }
    ```

13. Verify compilation: `cd persons && mvn -q compile`, expect `BUILD SUCCESS`.

14. Commit:

    ```
    git add persons/src/main/java/com/bacsystem/persons/service/PersonNotFoundException.java persons/src/main/java/com/bacsystem/persons/service/DuplicateDocumentIdException.java persons/src/main/java/com/bacsystem/persons/service/InvalidPaginationException.java
    git commit -m "feat(persons): add domain exception types"
    ```

---

### Task 2: Repository

**Files:**
- Create: `persons/src/main/java/com/bacsystem/persons/repository/PersonRepository.java`

**Interfaces:**
- Consumes: `com.bacsystem.persons.model.Person`
- Produces: `com.bacsystem.persons.repository.PersonRepository`
- Produces: `PersonRepository.existsByDocumentId(String)`
- Produces: `PersonRepository.existsByDocumentIdAndIdNot(String, String)`

**Steps:**

1. No automated test for this task: `PersonRepository` is a Spring Data
   interface whose method bodies are generated by query derivation at
   runtime against a live MongoDB — the design spec explicitly puts
   verifying that behavior against a real MongoDB instance out of scope
   for this environment's automated test suite. Its correctness is
   exercised indirectly in Task 4's `PersonServiceTest` (which mocks this
   interface) and by code review of the derived method names.

2. Create `persons/src/main/java/com/bacsystem/persons/repository/PersonRepository.java`:

   ```java
   package com.bacsystem.persons.repository;

   import com.bacsystem.persons.model.Person;
   import org.springframework.data.mongodb.repository.MongoRepository;

   public interface PersonRepository extends MongoRepository<Person, String> {

       boolean existsByDocumentId(String documentId);

       boolean existsByDocumentIdAndIdNot(String documentId, String id);
   }
   ```

3. Verify compilation: `cd persons && mvn -q compile`, expect `BUILD SUCCESS`.

4. Commit:

   ```
   git add persons/src/main/java/com/bacsystem/persons/repository/PersonRepository.java
   git commit -m "feat(persons): add PersonRepository"
   ```

---

### Task 3: Pagination Parameters

**Files:**
- Create: `persons/src/main/java/com/bacsystem/persons/service/PageParams.java`
- Test: `persons/src/test/java/com/bacsystem/persons/service/PageParamsTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.persons.service.InvalidPaginationException`
- Produces: `com.bacsystem.persons.service.PageParams`
- Produces: `PageParams.of(Integer, Integer)`

**Steps:**

1. Write the failing test — create
   `persons/src/test/java/com/bacsystem/persons/service/PageParamsTest.java`:

   ```java
   package com.bacsystem.persons.service;

   import org.junit.jupiter.api.Test;

   import static org.junit.jupiter.api.Assertions.assertEquals;
   import static org.junit.jupiter.api.Assertions.assertThrows;

   class PageParamsTest {

       @Test
       void appliesDefaultsWhenParamsAreNull() {
           PageParams result = PageParams.of(null, null);

           assertEquals(0, result.page());
           assertEquals(20, result.size());
       }

       @Test
       void clampsSizeAbove100() {
           PageParams result = PageParams.of(0, 500);

           assertEquals(100, result.size());
       }

       @Test
       void keepsExplicitValuesWithinBounds() {
           PageParams result = PageParams.of(2, 50);

           assertEquals(2, result.page());
           assertEquals(50, result.size());
       }

       @Test
       void rejectsNegativePage() {
           assertThrows(InvalidPaginationException.class, () -> PageParams.of(-1, 20));
       }

       @Test
       void rejectsNegativeSize() {
           assertThrows(InvalidPaginationException.class, () -> PageParams.of(0, -5));
       }
   }
   ```

2. Run it, expect FAIL: `cd persons && mvn -q test -Dtest=PageParamsTest`
   — compilation error, `PageParams` does not exist yet.

3. Create `persons/src/main/java/com/bacsystem/persons/service/PageParams.java`:

   ```java
   package com.bacsystem.persons.service;

   public record PageParams(int page, int size) {

       private static final int DEFAULT_PAGE = 0;
       private static final int DEFAULT_SIZE = 20;
       private static final int MAX_SIZE = 100;

       public static PageParams of(Integer page, Integer size) {
           int resolvedPage = page == null ? DEFAULT_PAGE : page;
           int resolvedSize = size == null ? DEFAULT_SIZE : size;

           if (resolvedPage < 0 || resolvedSize < 0) {
               throw new InvalidPaginationException(
                       "page and size must not be negative (page=" + resolvedPage
                               + ", size=" + resolvedSize + ")");
           }

           return new PageParams(resolvedPage, Math.min(resolvedSize, MAX_SIZE));
       }
   }
   ```

4. Run the test, expect PASS: `cd persons && mvn -q test -Dtest=PageParamsTest`.

5. Commit:

   ```
   git add persons/src/main/java/com/bacsystem/persons/service/PageParams.java persons/src/test/java/com/bacsystem/persons/service/PageParamsTest.java
   git commit -m "feat(persons): add PageParams pagination normalization"
   ```

---

### Task 4: Service

**Files:**
- Create: `persons/src/main/java/com/bacsystem/persons/service/PersonPage.java`
- Create: `persons/src/main/java/com/bacsystem/persons/service/PersonService.java`
- Test: `persons/src/test/java/com/bacsystem/persons/service/PersonServiceTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.persons.model.Person`
- Consumes: `com.bacsystem.persons.repository.PersonRepository`
- Consumes: `PersonRepository.existsByDocumentId(String)`
- Consumes: `PersonRepository.existsByDocumentIdAndIdNot(String, String)`
- Consumes: `com.bacsystem.persons.service.PersonNotFoundException`
- Consumes: `com.bacsystem.persons.service.DuplicateDocumentIdException`
- Consumes: `com.bacsystem.persons.service.PageParams`
- Consumes: `PageParams.of(Integer, Integer)`
- Produces: `com.bacsystem.persons.service.PersonPage`
- Produces: `com.bacsystem.persons.service.PersonService`
- Produces: `PersonService.create(Person)`
- Produces: `PersonService.getById(String)`
- Produces: `PersonService.list(Integer, Integer)`
- Produces: `PersonService.update(String, Person)`
- Produces: `PersonService.delete(String)`

**Steps:**

1. Create the result type first (no separate test — a plain data record):
   `persons/src/main/java/com/bacsystem/persons/service/PersonPage.java`:

   ```java
   package com.bacsystem.persons.service;

   import com.bacsystem.persons.model.Person;

   import java.util.List;

   public record PersonPage(List<Person> data, int page, int size, long total) {
   }
   ```

2. Write the failing test — create
   `persons/src/test/java/com/bacsystem/persons/service/PersonServiceTest.java`:

   ```java
   package com.bacsystem.persons.service;

   import com.bacsystem.persons.model.Person;
   import com.bacsystem.persons.repository.PersonRepository;
   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   import org.mockito.Mock;
   import org.mockito.InjectMocks;
   import org.mockito.junit.jupiter.MockitoExtension;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.PageImpl;
   import org.springframework.data.domain.PageRequest;

   import java.time.LocalDate;
   import java.util.List;
   import java.util.Optional;

   import static org.junit.jupiter.api.Assertions.assertEquals;
   import static org.junit.jupiter.api.Assertions.assertThrows;
   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.Mockito.never;
   import static org.mockito.Mockito.verify;
   import static org.mockito.Mockito.when;

   @ExtendWith(MockitoExtension.class)
   class PersonServiceTest {

       @Mock
       private PersonRepository personRepository;

       @InjectMocks
       private PersonService personService;

       private Person samplePerson() {
           return new Person(null, "Ada", "Lovelace", "DOC-1",
                   "ada@example.com", LocalDate.of(1990, 1, 1), null);
       }

       @Test
       void createSavesWhenDocumentIdIsUnique() {
           Person person = samplePerson();
           when(personRepository.existsByDocumentId("DOC-1")).thenReturn(false);
           when(personRepository.save(any(Person.class))).thenAnswer(inv -> {
               Person saved = inv.getArgument(0);
               saved.setId("generated-id");
               return saved;
           });

           Person created = personService.create(person);

           assertEquals("generated-id", created.getId());
           verify(personRepository).save(person);
       }

       @Test
       void createRejectsDuplicateDocumentId() {
           Person person = samplePerson();
           when(personRepository.existsByDocumentId("DOC-1")).thenReturn(true);

           assertThrows(DuplicateDocumentIdException.class, () -> personService.create(person));
           verify(personRepository, never()).save(any());
       }

       @Test
       void getByIdReturnsPersonWhenFound() {
           Person person = samplePerson();
           person.setId("id-1");
           when(personRepository.findById("id-1")).thenReturn(Optional.of(person));

           Person found = personService.getById("id-1");

           assertEquals("id-1", found.getId());
       }

       @Test
       void getByIdThrowsWhenNotFound() {
           when(personRepository.findById("missing")).thenReturn(Optional.empty());

           assertThrows(PersonNotFoundException.class, () -> personService.getById("missing"));
       }

       @Test
       void listReturnsNormalizedPage() {
           Person person = samplePerson();
           Page<Person> page = new PageImpl<>(List.of(person), PageRequest.of(0, 20), 1);
           when(personRepository.findAll(PageRequest.of(0, 20))).thenReturn(page);

           PersonPage result = personService.list(null, null);

           assertEquals(0, result.page());
           assertEquals(20, result.size());
           assertEquals(1, result.total());
           assertEquals(1, result.data().size());
       }

       @Test
       void updateReplacesExistingPerson() {
           Person existing = samplePerson();
           existing.setId("id-1");
           Person updated = new Person(null, "Ada", "King", "DOC-1",
                   "ada@example.com", LocalDate.of(1990, 1, 1), "555-0100");

           when(personRepository.findById("id-1")).thenReturn(Optional.of(existing));
           when(personRepository.existsByDocumentIdAndIdNot("DOC-1", "id-1")).thenReturn(false);
           when(personRepository.save(any(Person.class))).thenAnswer(inv -> inv.getArgument(0));

           Person result = personService.update("id-1", updated);

           assertEquals("id-1", result.getId());
           assertEquals("King", result.getLastName());
       }

       @Test
       void updateRejectsDuplicateDocumentIdFromAnotherPerson() {
           Person existing = samplePerson();
           existing.setId("id-1");
           Person updated = new Person(null, "Ada", "King", "DOC-2",
                   "ada@example.com", LocalDate.of(1990, 1, 1), null);

           when(personRepository.findById("id-1")).thenReturn(Optional.of(existing));
           when(personRepository.existsByDocumentIdAndIdNot("DOC-2", "id-1")).thenReturn(true);

           assertThrows(DuplicateDocumentIdException.class,
                   () -> personService.update("id-1", updated));
       }

       @Test
       void deleteRemovesExistingPerson() {
           Person existing = samplePerson();
           existing.setId("id-1");
           when(personRepository.findById("id-1")).thenReturn(Optional.of(existing));

           personService.delete("id-1");

           verify(personRepository).deleteById("id-1");
       }

       @Test
       void deleteThrowsWhenNotFound() {
           when(personRepository.findById("missing")).thenReturn(Optional.empty());

           assertThrows(PersonNotFoundException.class, () -> personService.delete("missing"));
       }
   }
   ```

3. Run it, expect FAIL: `cd persons && mvn -q test -Dtest=PersonServiceTest`
   — compilation error, `PersonService` does not exist yet.

4. Create `persons/src/main/java/com/bacsystem/persons/service/PersonService.java`:

   ```java
   package com.bacsystem.persons.service;

   import com.bacsystem.persons.model.Person;
   import com.bacsystem.persons.repository.PersonRepository;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.PageRequest;
   import org.springframework.stereotype.Service;

   @Service
   public class PersonService {

       private final PersonRepository personRepository;

       public PersonService(PersonRepository personRepository) {
           this.personRepository = personRepository;
       }

       public Person create(Person person) {
           if (personRepository.existsByDocumentId(person.getDocumentId())) {
               throw new DuplicateDocumentIdException(person.getDocumentId());
           }
           person.setId(null);
           return personRepository.save(person);
       }

       public Person getById(String id) {
           return personRepository.findById(id)
                   .orElseThrow(() -> new PersonNotFoundException(id));
       }

       public PersonPage list(Integer page, Integer size) {
           PageParams params = PageParams.of(page, size);
           Page<Person> result = personRepository.findAll(PageRequest.of(params.page(), params.size()));
           return new PersonPage(result.getContent(), params.page(), params.size(), result.getTotalElements());
       }

       public Person update(String id, Person updated) {
           Person existing = getById(id);
           if (personRepository.existsByDocumentIdAndIdNot(updated.getDocumentId(), id)) {
               throw new DuplicateDocumentIdException(updated.getDocumentId());
           }
           updated.setId(existing.getId());
           return personRepository.save(updated);
       }

       public void delete(String id) {
           Person existing = getById(id);
           personRepository.deleteById(existing.getId());
       }
   }
   ```

5. Run the test, expect PASS: `cd persons && mvn -q test -Dtest=PersonServiceTest`.

6. Commit:

   ```
   git add persons/src/main/java/com/bacsystem/persons/service/PersonPage.java persons/src/main/java/com/bacsystem/persons/service/PersonService.java persons/src/test/java/com/bacsystem/persons/service/PersonServiceTest.java
   git commit -m "feat(persons): add PersonService with CRUD business rules"
   ```

---

### Task 5: Controller & Error Handling

**Files:**
- Create: `persons/src/main/java/com/bacsystem/persons/web/ErrorResponse.java`
- Create: `persons/src/main/java/com/bacsystem/persons/web/GlobalExceptionHandler.java`
- Create: `persons/src/main/java/com/bacsystem/persons/controller/PersonController.java`
- Test: `persons/src/test/java/com/bacsystem/persons/controller/PersonControllerTest.java`

**Interfaces:**
- Consumes: `com.bacsystem.persons.model.Person`
- Consumes: `com.bacsystem.persons.service.PersonService`
- Consumes: `PersonService.create(Person)`
- Consumes: `PersonService.getById(String)`
- Consumes: `PersonService.list(Integer, Integer)`
- Consumes: `PersonService.update(String, Person)`
- Consumes: `PersonService.delete(String)`
- Consumes: `com.bacsystem.persons.service.PersonPage`
- Consumes: `com.bacsystem.persons.service.PersonNotFoundException`
- Consumes: `com.bacsystem.persons.service.DuplicateDocumentIdException`
- Consumes: `com.bacsystem.persons.service.InvalidPaginationException`
- Produces: `com.bacsystem.persons.web.ErrorResponse`
- Produces: `com.bacsystem.persons.web.GlobalExceptionHandler`
- Produces: `com.bacsystem.persons.controller.PersonController`

**Steps:**

1. Create the error envelope first (no separate test — a plain data
   record exercised through the controller tests below):
   `persons/src/main/java/com/bacsystem/persons/web/ErrorResponse.java`:

   ```java
   package com.bacsystem.persons.web;

   public record ErrorResponse(ErrorBody error) {

       public record ErrorBody(String code, String message) {
       }

       public static ErrorResponse of(String code, String message) {
           return new ErrorResponse(new ErrorBody(code, message));
       }
   }
   ```

2. Create `persons/src/main/java/com/bacsystem/persons/web/GlobalExceptionHandler.java`:

   ```java
   package com.bacsystem.persons.web;

   import com.bacsystem.persons.service.DuplicateDocumentIdException;
   import com.bacsystem.persons.service.InvalidPaginationException;
   import com.bacsystem.persons.service.PersonNotFoundException;
   import org.springframework.http.HttpStatus;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.MethodArgumentNotValidException;
   import org.springframework.web.bind.annotation.ExceptionHandler;
   import org.springframework.web.bind.annotation.RestControllerAdvice;
   import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

   @RestControllerAdvice
   public class GlobalExceptionHandler {

       @ExceptionHandler(MethodArgumentNotValidException.class)
       public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
           String message = ex.getBindingResult().getFieldErrors().stream()
                   .findFirst()
                   .map(error -> error.getField() + ": " + error.getDefaultMessage())
                   .orElse("Validation failed");
           return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                   .body(ErrorResponse.of("VALIDATION_ERROR", message));
       }

       @ExceptionHandler(PersonNotFoundException.class)
       public ResponseEntity<ErrorResponse> handleNotFound(PersonNotFoundException ex) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(ErrorResponse.of("NOT_FOUND", ex.getMessage()));
       }

       @ExceptionHandler(DuplicateDocumentIdException.class)
       public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateDocumentIdException ex) {
           return ResponseEntity.status(HttpStatus.CONFLICT)
                   .body(ErrorResponse.of("DUPLICATE_DOCUMENT_ID", ex.getMessage()));
       }

       @ExceptionHandler(InvalidPaginationException.class)
       public ResponseEntity<ErrorResponse> handleInvalidPagination(InvalidPaginationException ex) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                   .body(ErrorResponse.of("INVALID_PAGINATION", ex.getMessage()));
       }

       @ExceptionHandler(MethodArgumentTypeMismatchException.class)
       public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                   .body(ErrorResponse.of("INVALID_PAGINATION",
                           ex.getName() + " must be a valid integer"));
       }

       @ExceptionHandler(Exception.class)
       public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body(ErrorResponse.of("INTERNAL_ERROR", "Unexpected error"));
       }
   }
   ```

3. Write the failing test — create
   `persons/src/test/java/com/bacsystem/persons/controller/PersonControllerTest.java`:

   ```java
   package com.bacsystem.persons.controller;

   import com.bacsystem.persons.model.Person;
   import com.bacsystem.persons.service.DuplicateDocumentIdException;
   import com.bacsystem.persons.service.PersonNotFoundException;
   import com.bacsystem.persons.service.PersonPage;
   import com.bacsystem.persons.service.PersonService;
   import com.fasterxml.jackson.databind.ObjectMapper;
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
   import org.springframework.boot.test.mock.mockito.MockBean;
   import org.springframework.http.MediaType;
   import org.springframework.test.web.servlet.MockMvc;

   import java.time.LocalDate;
   import java.util.List;

   import static org.mockito.ArgumentMatchers.any;
   import static org.mockito.ArgumentMatchers.eq;
   import static org.mockito.Mockito.doThrow;
   import static org.mockito.Mockito.when;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
   import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
   import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
   import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
   import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

   @WebMvcTest(PersonController.class)
   class PersonControllerTest {

       @Autowired
       private MockMvc mockMvc;

       @Autowired
       private ObjectMapper objectMapper;

       @MockBean
       private PersonService personService;

       private Person samplePerson() {
           return new Person("id-1", "Ada", "Lovelace", "DOC-1",
                   "ada@example.com", LocalDate.of(1990, 1, 1), null);
       }

       @Test
       void createReturns201() throws Exception {
           Person person = samplePerson();
           when(personService.create(any(Person.class))).thenReturn(person);

           mockMvc.perform(post("/api/v1/persons")
                           .contentType(MediaType.APPLICATION_JSON)
                           .content(objectMapper.writeValueAsString(person)))
                   .andExpect(status().isCreated())
                   .andExpect(header().string("Location", "/api/v1/persons/id-1"))
                   .andExpect(jsonPath("$.id").value("id-1"));
       }

       @Test
       void createReturns400ForBlankFirstName() throws Exception {
           Person person = samplePerson();
           person.setFirstName("");

           mockMvc.perform(post("/api/v1/persons")
                           .contentType(MediaType.APPLICATION_JSON)
                           .content(objectMapper.writeValueAsString(person)))
                   .andExpect(status().isBadRequest())
                   .andExpect(jsonPath("$.error.code").value("VALIDATION_ERROR"));
       }

       @Test
       void createReturns409ForDuplicateDocumentId() throws Exception {
           Person person = samplePerson();
           when(personService.create(any(Person.class)))
                   .thenThrow(new DuplicateDocumentIdException("DOC-1"));

           mockMvc.perform(post("/api/v1/persons")
                           .contentType(MediaType.APPLICATION_JSON)
                           .content(objectMapper.writeValueAsString(person)))
                   .andExpect(status().isConflict())
                   .andExpect(jsonPath("$.error.code").value("DUPLICATE_DOCUMENT_ID"));
       }

       @Test
       void getByIdReturns200() throws Exception {
           when(personService.getById("id-1")).thenReturn(samplePerson());

           mockMvc.perform(get("/api/v1/persons/id-1"))
                   .andExpect(status().isOk())
                   .andExpect(jsonPath("$.id").value("id-1"));
       }

       @Test
       void getByIdReturns404WhenMissing() throws Exception {
           when(personService.getById("missing")).thenThrow(new PersonNotFoundException("missing"));

           mockMvc.perform(get("/api/v1/persons/missing"))
                   .andExpect(status().isNotFound())
                   .andExpect(jsonPath("$.error.code").value("NOT_FOUND"));
       }

       @Test
       void listReturns200WithPage() throws Exception {
           PersonPage page = new PersonPage(List.of(samplePerson()), 0, 20, 1);
           when(personService.list(null, null)).thenReturn(page);

           mockMvc.perform(get("/api/v1/persons"))
                   .andExpect(status().isOk())
                   .andExpect(jsonPath("$.total").value(1))
                   .andExpect(jsonPath("$.data[0].id").value("id-1"));
       }

       @Test
       void listReturns400ForNonIntegerPage() throws Exception {
           mockMvc.perform(get("/api/v1/persons").param("page", "abc"))
                   .andExpect(status().isBadRequest())
                   .andExpect(jsonPath("$.error.code").value("INVALID_PAGINATION"));
       }

       @Test
       void updateReturns200() throws Exception {
           Person updated = samplePerson();
           updated.setLastName("King");
           when(personService.update(eq("id-1"), any(Person.class))).thenReturn(updated);

           mockMvc.perform(put("/api/v1/persons/id-1")
                           .contentType(MediaType.APPLICATION_JSON)
                           .content(objectMapper.writeValueAsString(updated)))
                   .andExpect(status().isOk())
                   .andExpect(jsonPath("$.lastName").value("King"));
       }

       @Test
       void updateReturns404WhenMissing() throws Exception {
           Person updated = samplePerson();
           when(personService.update(eq("missing"), any(Person.class)))
                   .thenThrow(new PersonNotFoundException("missing"));

           mockMvc.perform(put("/api/v1/persons/missing")
                           .contentType(MediaType.APPLICATION_JSON)
                           .content(objectMapper.writeValueAsString(updated)))
                   .andExpect(status().isNotFound());
       }

       @Test
       void deleteReturns204() throws Exception {
           mockMvc.perform(delete("/api/v1/persons/id-1"))
                   .andExpect(status().isNoContent());
       }

       @Test
       void deleteReturns404WhenMissing() throws Exception {
           doThrow(new PersonNotFoundException("missing")).when(personService).delete("missing");

           mockMvc.perform(delete("/api/v1/persons/missing"))
                   .andExpect(status().isNotFound());
       }
   }
   ```

4. Run it, expect FAIL: `cd persons && mvn -q test -Dtest=PersonControllerTest`
   — compilation error, `PersonController` does not exist yet.

5. Create `persons/src/main/java/com/bacsystem/persons/controller/PersonController.java`:

   ```java
   package com.bacsystem.persons.controller;

   import com.bacsystem.persons.model.Person;
   import com.bacsystem.persons.service.PersonPage;
   import com.bacsystem.persons.service.PersonService;
   import jakarta.validation.Valid;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.DeleteMapping;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.PostMapping;
   import org.springframework.web.bind.annotation.PutMapping;
   import org.springframework.web.bind.annotation.RequestBody;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestParam;
   import org.springframework.web.bind.annotation.RestController;

   import java.net.URI;

   @RestController
   @RequestMapping("/api/v1/persons")
   public class PersonController {

       private final PersonService personService;

       public PersonController(PersonService personService) {
           this.personService = personService;
       }

       @PostMapping
       public ResponseEntity<Person> create(@Valid @RequestBody Person person) {
           Person created = personService.create(person);
           return ResponseEntity.created(URI.create("/api/v1/persons/" + created.getId())).body(created);
       }

       @GetMapping("/{id}")
       public Person getById(@PathVariable String id) {
           return personService.getById(id);
       }

       @GetMapping
       public PersonPage list(@RequestParam(required = false) Integer page,
                               @RequestParam(required = false) Integer size) {
           return personService.list(page, size);
       }

       @PutMapping("/{id}")
       public Person update(@PathVariable String id, @Valid @RequestBody Person person) {
           return personService.update(id, person);
       }

       @DeleteMapping("/{id}")
       public ResponseEntity<Void> delete(@PathVariable String id) {
           personService.delete(id);
           return ResponseEntity.noContent().build();
       }
   }
   ```

6. Run the test, expect PASS: `cd persons && mvn -q test -Dtest=PersonControllerTest`.

7. Run the full suite to confirm nothing regressed: `cd persons && mvn -q test`,
   expect `BUILD SUCCESS`.

8. Commit:

   ```
   git add persons/src/main/java/com/bacsystem/persons/web/ErrorResponse.java persons/src/main/java/com/bacsystem/persons/web/GlobalExceptionHandler.java persons/src/main/java/com/bacsystem/persons/controller/PersonController.java persons/src/test/java/com/bacsystem/persons/controller/PersonControllerTest.java
   git commit -m "feat(persons): add PersonController with REST endpoints and error mapping"
   ```
