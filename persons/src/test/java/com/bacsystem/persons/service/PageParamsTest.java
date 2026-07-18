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
