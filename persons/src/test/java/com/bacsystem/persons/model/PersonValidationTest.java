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
