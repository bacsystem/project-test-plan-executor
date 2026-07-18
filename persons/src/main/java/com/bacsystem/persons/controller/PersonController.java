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
