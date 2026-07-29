package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.web.CursorPage;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * User CRUD + listing. Tenant is always read from the access token's
 * {@code tenant} claim, never from a path/query parameter (Global
 * Constraints — multi-tenancy).
 */
@RestController
@RequestMapping("/v1/users")
public class UserController {

    public record CreateUserRequest(String email, String temporaryPassword) {}

    public record UserResponse(UUID id, String email, String status, boolean mustChangePassword) {}

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@RequestBody CreateUserRequest request, JwtAuthenticationToken auth) {
        UUID tenantId = tenantIdOf(auth);
        UUID actorId = actorIdOf(auth);
        User user = userService.createUser(tenantId, request.email(), request.temporaryPassword(), actorId);
        return toResponse(user);
    }

    @GetMapping("/{id}")
    public UserResponse get(@PathVariable UUID id, JwtAuthenticationToken auth) {
        return toResponse(userService.getById(tenantIdOf(auth), id));
    }

    @GetMapping
    public CursorPage<UserResponse> list(@RequestParam(required = false) String cursor,
                                          @RequestParam(defaultValue = "20") int size,
                                          JwtAuthenticationToken auth) {
        UUID tenantId = tenantIdOf(auth);
        CursorPage<User> page = userService.listByTenantCursor(tenantId, cursor, size);
        return new CursorPage<>(page.data().stream().map(this::toResponse).toList(), page.nextCursor());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deactivate(@PathVariable UUID id, JwtAuthenticationToken auth) {
        userService.deactivateUser(tenantIdOf(auth), id, actorIdOf(auth));
    }

    private UUID tenantIdOf(JwtAuthenticationToken auth) {
        Jwt jwt = (Jwt) auth.getPrincipal();
        return UUID.fromString(jwt.getClaimAsString("tenant"));
    }

    private UUID actorIdOf(JwtAuthenticationToken auth) {
        return UUID.fromString(auth.getToken().getSubject());
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getStatus().name(), user.isMustChangePassword());
    }
}
