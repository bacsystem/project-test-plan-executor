package com.bacsystem.auth.rbac;

import com.bacsystem.auth.tenancy.Tenant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    /** Name of the bootstrap administrator role (§7), used to derive the {@code targetIsAdmin} security signal. */
    public static final String ADMIN_ROLE_NAME = "admin";

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    @Column(nullable = false)
    private String name;

    @Column(name = "is_template", nullable = false)
    private boolean template = false;

    @Version
    @Column(nullable = false)
    private long version;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
