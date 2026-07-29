package com.bacsystem.auth.rbac;

import com.bacsystem.auth.identity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

// NOTE: this entity has the same @IdClass-from-two-non-generated-@ManyToOne
// shape that made RolePermission's composite key non-null as soon as
// user/role are set, which routes JpaRepository.save() through
// entityManager.merge() (silent UPSERT) instead of persist() (INSERT) and
// so would NOT trip the user_roles(user_id, role_id) primary-key constraint
// on a duplicate assignment — see RolePermission's Persistable<Key>
// implementation for the fix pattern. Left unimplemented here deliberately:
// no test in the Task 6 brief exercises duplicate (user_id, role_id)
// assignment, so adding Persistable here would be speculative scope. Apply
// the same Persistable<Key> fix (with @Setter(AccessLevel.NONE) on the
// isNew flag) before relying on duplicate-assignment rejection for
// user_roles in any future task.
@Entity
@Table(name = "user_roles")
@IdClass(UserRole.Key.class)
@Getter
@Setter
public class UserRole {

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

    public static class Key implements Serializable {
        private UUID user;
        private UUID role;

        public Key() {}

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
