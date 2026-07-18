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
