package domain

import "time"

type Product struct {
	TenantID          string    `json:"tenantId"`
	SKU               string    `json:"sku"`
	Name              string    `json:"name"`
	Category          string    `json:"category"`
	UnitOfMeasureCode string    `json:"unitOfMeasureCode"`
	CreatedAt         time.Time `json:"createdAt"`
}
