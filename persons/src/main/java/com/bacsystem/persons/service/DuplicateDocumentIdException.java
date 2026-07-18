package com.bacsystem.persons.service;

public class DuplicateDocumentIdException extends RuntimeException {
    public DuplicateDocumentIdException(String documentId) {
        super("Person with documentId already exists: " + documentId);
    }
}
