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
