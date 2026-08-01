package domain

import "time"

type Warehouse struct {
	ID                   string    `json:"id"`
	TenantID             string    `json:"tenantId"`
	Name                 string    `json:"name"`
	Code                 string    `json:"code"`
	RucEstablishmentCode string    `json:"rucEstablishmentCode"`
	CreatedAt            time.Time `json:"createdAt"`
}

type Section struct {
	ID          string    `json:"id"`
	WarehouseID string    `json:"warehouseId"`
	Name        string    `json:"name"`
	Code        string    `json:"code"`
	CreatedAt   time.Time `json:"createdAt"`
}
