package com.bacsystem.persons.repository;

import com.bacsystem.persons.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepository extends MongoRepository<Person, String> {

    boolean existsByDocumentId(String documentId);

    boolean existsByDocumentIdAndIdNot(String documentId, String id);
}
