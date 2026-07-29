package com.bacsystem.auth.web;

import java.util.List;

/**
 * A single page of cursor-paginated results (§10.1): the row data plus an
 * opaque cursor for the next page, or {@code null} when there isn't one.
 */
public record CursorPage<T>(List<T> data, String nextCursor) {
}
