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
