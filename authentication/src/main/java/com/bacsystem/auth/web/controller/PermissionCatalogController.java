package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.rbac.PermissionCatalogService;
import com.bacsystem.auth.rbac.PermissionSyncResult;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/v1/applications")
public class PermissionCatalogController {

    public record SyncRequest(Set<String> permissionNames) {}

    private final PermissionCatalogService permissionCatalogService;

    public PermissionCatalogController(PermissionCatalogService permissionCatalogService) {
        this.permissionCatalogService = permissionCatalogService;
    }

    @PutMapping("/{app}/permissions")
    @PreAuthorize("hasAuthority('SCOPE_permissions:sync')")
    public PermissionSyncResult sync(@PathVariable("app") String applicationName, @RequestBody SyncRequest request) {
        return permissionCatalogService.sync(applicationName, request.permissionNames());
    }
}
