package com.bacsystem.auth.bootstrap;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.rbac.RoleService;
import com.bacsystem.auth.rbac.UserRole;
import com.bacsystem.auth.rbac.UserRoleRepository;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Creates the default tenant and its admin user on first startup (§7). Only
 * runs when invoked with {@code --bootstrap}; idempotent otherwise, since a
 * second run finds the default tenant already present and exits as a no-op.
 */
@Component
public class BootstrapRunner implements ApplicationRunner {

    private static final String DEFAULT_TENANT_SLUG = "default";
    private static final String ADMIN_EMAIL = "admin@default.local";

    private final TenantRepository tenantRepository;
    private final UserService userService;
    private final RoleService roleService;
    private final UserRoleRepository userRoleRepository;
    private final AuditLogService auditLogService;
    private final String adminPassword;

    public BootstrapRunner(TenantRepository tenantRepository, UserService userService, RoleService roleService,
                            UserRoleRepository userRoleRepository, AuditLogService auditLogService,
                            @Value("${auth.bootstrap.admin-password}") String adminPassword) {
        this.tenantRepository = tenantRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.userRoleRepository = userRoleRepository;
        this.auditLogService = auditLogService;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!args.containsOption("bootstrap")) {
            return;
        }
        if (tenantRepository.findBySlug(DEFAULT_TENANT_SLUG).isPresent()) {
            return; // idempotent (§7) — nothing to do, exit as a normal no-op
        }

        Tenant tenant = new Tenant();
        tenant.setSlug(DEFAULT_TENANT_SLUG);
        tenant.setName("Default Tenant");
        tenant = tenantRepository.save(tenant);

        var admin = userService.createUser(tenant.getId(), ADMIN_EMAIL, adminPassword, null);

        var adminRole = roleService.createRole(tenant.getId(), "admin", false, admin.getId());
        UserRole assignment = new UserRole();
        assignment.setUser(admin);
        assignment.setRole(adminRole);
        assignment.setAssignedBy(admin);
        userRoleRepository.save(assignment);

        auditLogService.record(admin.getId(), AuditAction.BOOTSTRAP_TENANT_CREATED, "Tenant",
                tenant.getId().toString(), "{}");
    }
}
