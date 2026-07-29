package com.bacsystem.auth.rbac;

import com.bacsystem.auth.identity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Persistable;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

// Implements Persistable for the same reason RolePermission does: the composite
// key (user + role, both non-generated associations) is always non-null once
// user/role are set — Spring Data's default isNew() check would otherwise see a
// "dup" instance as pre-existing and silently merge/UPDATE it instead of
// attempting an INSERT, masking the user_roles PK constraint.
@Entity
@Table(name = "user_roles")
@IdClass(UserRole.Key.class)
@Getter
@Setter
public class UserRole implements Persistable<UserRole.Key> {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assigned_by", nullable = false)
    private User assignedBy;

    @Column(name = "assigned_at", nullable = false)
    private Instant assignedAt = Instant.now();

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
        return new Key(user == null ? null : user.getId(), role == null ? null : role.getId());
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
        private UUID user;
        private UUID role;

        public Key() {}

        public Key(UUID user, UUID role) {
            this.user = user;
            this.role = role;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Key key)) return false;
            return Objects.equals(user, key.user) && Objects.equals(role, key.role);
        }

        @Override
        public int hashCode() {
            return Objects.hash(user, role);
        }
    }
}
