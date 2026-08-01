package domain

import "time"

type Tenant struct {
	ID                string    `json:"id"`
	Name              string    `json:"name"`
	CountryCode       string    `json:"countryCode"`
	LowStockThreshold int       `json:"lowStockThreshold"`
	CreatedAt         time.Time `json:"createdAt"`
}

type UserRole string

const (
	RoleAdmin  UserRole = "admin"
	RoleMember UserRole = "member"
)

type User struct {
	ID           string    `json:"id"`
	TenantID     string    `json:"tenantId"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Role         UserRole  `json:"role"`
	CreatedAt    time.Time `json:"createdAt"`
}
