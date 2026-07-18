package com.bacsystem.persons.service;

import com.bacsystem.persons.model.Person;

import java.util.List;

public record PersonPage(List<Person> data, int page, int size, long total) {
}
