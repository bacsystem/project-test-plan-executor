package events

// StockUpdatedPayload is published on routing key "stock.updated" whenever
// a stock movement changes a stock_levels row.
type StockUpdatedPayload struct {
	TenantID     string  `json:"tenantId"`
	SKU          string  `json:"sku"`
	WarehouseID  string  `json:"warehouseId"`
	SectionID    string  `json:"sectionId"`
	Quantity     int     `json:"quantity"`
	AvgUnitCost  float64 `json:"avgUnitCost"`
	MovementType string  `json:"movementType"`
	OccurredAt   string  `json:"occurredAt"`
}

// StockLowPayload is published on routing key "stock.low" when a movement
// crosses a product's configured low-stock threshold.
type StockLowPayload struct {
	TenantID  string `json:"tenantId"`
	SKU       string `json:"sku"`
	Quantity  int    `json:"quantity"`
	Threshold int    `json:"threshold"`
}
