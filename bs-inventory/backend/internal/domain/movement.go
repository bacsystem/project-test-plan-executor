package domain

import "time"

type MovementType string

const (
	MovementIn  MovementType = "IN"
	MovementOut MovementType = "OUT"
)

type StockMovement struct {
	ID             string       `json:"id"`
	TenantID       string       `json:"tenantId"`
	ProductSKU     string       `json:"productSku"`
	WarehouseID    string       `json:"warehouseId"`
	SectionID      string       `json:"sectionId"`
	Quantity       int          `json:"quantity"`
	UnitCost       float64      `json:"unitCost"`
	Type           MovementType `json:"type"`
	DocumentType   string       `json:"documentType"`
	DocumentSeries string       `json:"documentSeries"`
	DocumentNumber string       `json:"documentNumber"`
	TransferID     string       `json:"transferId,omitempty"`  // empty if not part of a transfer
	GuideNumber    string       `json:"guideNumber,omitempty"` // empty if not applicable (Guía de Remisión reference)
	OccurredAt     time.Time    `json:"occurredAt"`
}
