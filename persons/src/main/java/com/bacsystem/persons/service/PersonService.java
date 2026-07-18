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
