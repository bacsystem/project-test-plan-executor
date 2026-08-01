package com.bacsystem.auth.rbac;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Persistable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

// Implements Persistable because the composite key (role + permission, both
// non-generated associations) is always non-null once role/permission are
// set — Spring Data's default isNew() check would otherwise see a "dup"
// instance as pre-existing and silently merge/UPDATE it instead of
// attempting an INSERT, masking the role_permissions PK constraint.
@Entity
@Table(name = "role_permissions")
@IdClass(RolePermission.Key.class)
@Getter
@Setter
public class RolePermission implements Persistable<RolePermission.Key> {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id")
    private Permission permission;

    // Setter intentionally suppressed: this flag is the sole guard that keeps
    // save() routing through persist() (real INSERT, trips the PK constraint)
    // instead of merge() (silent UPSERT). It must only flip via the
    // @PostLoad/@PostPersist hook below, never via an externally callable
    // setIsNew(), or callers could silently defeat the duplicate-assignment
    // protection this entity exists to provide.
    @Transient
    @Setter(AccessLevel.NONE)
    private boolean isNew = true;

    @Override
    public Key getId() {
        return new Key(role == null ? null : role.getId(), permission == null ? null : permission.getId());
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    @PostLoad
    @PostPersist
    void markNotNew() {
        this.isNew = false;
    }

    public static class Key implements Serializable {
        private UUID role;
        private UUID permission;

        public Key() {}

        public Key(UUID role, UUID permission) {
            this.role = role;
            this.permission = permission;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Key key)) return false;
            return Objects.equals(role, key.role) && Objects.equals(permission, key.permission);
        }

        @Override
        public int hashCode() {
            return Objects.hash(role, permission);
        }
    }
}
