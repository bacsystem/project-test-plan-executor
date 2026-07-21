package http

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/events"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type StockServer struct {
	Stock    *postgres.StockRepository
	Products *postgres.ProductRepository
	Tenants  *postgres.TenantRepository
	Events   *events.Publisher
}

func (s *StockServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/api/v1/stock/movements", s.handleCreateMovement)
	r.Post("/api/v1/stock/transfers", s.handleCreateTransfer)
	r.Get("/api/v1/stock/low", s.handleLowStock)
	r.Get("/api/v1/stock/{sku}", s.handleGetStock)
	return r
}

type createMovementRequest struct {
	ProductSKU     string  `json:"productSku"`
	WarehouseID    string  `json:"warehouseId"`
	SectionID      string  `json:"sectionId"`
	Quantity       int     `json:"quantity"`
	UnitCost       float64 `json:"unitCost"`
	Type           string  `json:"type"`
	DocumentType   string  `json:"documentType"`
	DocumentSeries string  `json:"documentSeries"`
	DocumentNumber string  `json:"documentNumber"`
	GuideNumber    string  `json:"guideNumber"`
}

func (s *StockServer) handleCreateMovement(w http.ResponseWriter, r *http.Request) {
	var req createMovementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.ProductSKU == "" || req.WarehouseID == "" || req.SectionID == "" || req.Quantity <= 0 {
		writeError(w, http.StatusBadRequest, "productSku, warehouseId, sectionId, and a positive quantity are required")
		return
	}
	movementType := domain.MovementType(req.Type)
	if movementType != domain.MovementIn && movementType != domain.MovementOut {
		writeError(w, http.StatusBadRequest, `type must be "IN" or "OUT"`)
		return
	}

	tenantID := middleware.TenantID(r.Context())
	current, err := s.Stock.GetLevel(r.Context(), tenantID, req.ProductSKU, req.WarehouseID, req.SectionID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read current stock level")
		return
	}
	prevTotal, err := s.Stock.TotalQuantityBySKU(r.Context(), tenantID, req.ProductSKU)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read current stock total")
		return
	}

	m := domain.StockMovement{
		TenantID: tenantID, ProductSKU: req.ProductSKU, WarehouseID: req.WarehouseID, SectionID: req.SectionID,
		Quantity: req.Quantity, UnitCost: req.UnitCost, Type: movementType,
		DocumentType: req.DocumentType, DocumentSeries: req.DocumentSeries, DocumentNumber: req.DocumentNumber,
		GuideNumber: req.GuideNumber, OccurredAt: time.Now().UTC(),
	}
	next, err := domain.ApplyMovement(current, m)
	if err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}

	saved, err := s.Stock.ApplyMovement(r.Context(), m, next)
	if err != nil {
		if err == postgres.ErrInvalidReference {
			writeError(w, http.StatusNotFound, "unknown product, warehouse, or section")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to apply movement")
		return
	}

	s.publishStockUpdated(r.Context(), events.StockUpdatedPayload{
		TenantID: tenantID, SKU: req.ProductSKU, WarehouseID: req.WarehouseID, SectionID: req.SectionID,
		Quantity: next.Quantity, AvgUnitCost: next.AvgUnitCost, MovementType: string(movementType),
		OccurredAt: m.OccurredAt.Format(time.RFC3339),
	})

	newTotal := prevTotal - current.Quantity + next.Quantity
	if tenant, err := s.Tenants.GetByID(r.Context(), tenantID); err == nil {
		if domain.IsLowStockCrossing(prevTotal, newTotal, tenant.LowStockThreshold) {
			s.publishStockLow(r.Context(), events.StockLowPayload{
				TenantID: tenantID, SKU: req.ProductSKU, Quantity: newTotal, Threshold: tenant.LowStockThreshold,
			})
		}
	}

	writeJSON(w, http.StatusCreated, saved)
}

type createTransferRequest struct {
	ProductSKU      string `json:"productSku"`
	FromWarehouseID string `json:"fromWarehouseId"`
	FromSectionID   string `json:"fromSectionId"`
	ToWarehouseID   string `json:"toWarehouseId"`
	ToSectionID     string `json:"toSectionId"`
	Quantity        int    `json:"quantity"`
	DocumentType    string `json:"documentType"`
	DocumentSeries  string `json:"documentSeries"`
	DocumentNumber  string `json:"documentNumber"`
	GuideNumber     string `json:"guideNumber"`
}

type transferResponse struct {
	TransferID string               `json:"transferId"`
	Out        domain.StockMovement `json:"out"`
	In         domain.StockMovement `json:"in"`
}

func (s *StockServer) handleCreateTransfer(w http.ResponseWriter, r *http.Request) {
	var req createTransferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.ProductSKU == "" || req.FromWarehouseID == "" || req.FromSectionID == "" || req.ToWarehouseID == "" || req.ToSectionID == "" || req.Quantity <= 0 {
		writeError(w, http.StatusBadRequest, "productSku, source/destination warehouse+section, and a positive quantity are required")
		return
	}

	tenantID := middleware.TenantID(r.Context())
	source, err := s.Stock.GetLevel(r.Context(), tenantID, req.ProductSKU, req.FromWarehouseID, req.FromSectionID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read source stock level")
		return
	}

	transferID := uuid.NewString()
	occurredAt := time.Now().UTC()
	out := domain.StockMovement{
		TenantID: tenantID, ProductSKU: req.ProductSKU, WarehouseID: req.FromWarehouseID, SectionID: req.FromSectionID,
		Quantity: req.Quantity, Type: domain.MovementOut, TransferID: transferID,
		DocumentType: req.DocumentType, DocumentSeries: req.DocumentSeries, DocumentNumber: req.DocumentNumber,
		GuideNumber: req.GuideNumber, OccurredAt: occurredAt,
	}
	outNext, err := domain.ApplyMovement(source, out)
	if err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}

	// The destination receives already-owned, already-valued stock at the
	// source's current average cost — not a new purchase (design §5).
	dest, err := s.Stock.GetLevel(r.Context(), tenantID, req.ProductSKU, req.ToWarehouseID, req.ToSectionID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read destination stock level")
		return
	}
	in := domain.StockMovement{
		TenantID: tenantID, ProductSKU: req.ProductSKU, WarehouseID: req.ToWarehouseID, SectionID: req.ToSectionID,
		Quantity: req.Quantity, UnitCost: source.AvgUnitCost, Type: domain.MovementIn, TransferID: transferID,
		DocumentType: req.DocumentType, DocumentSeries: req.DocumentSeries, DocumentNumber: req.DocumentNumber,
		GuideNumber: req.GuideNumber, OccurredAt: occurredAt,
	}
	inNext, err := domain.ApplyMovement(dest, in)
	if err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}

	savedOut, savedIn, err := s.Stock.ApplyTransfer(r.Context(), out, outNext, in, inNext)
	if err != nil {
		if err == postgres.ErrInvalidReference {
			writeError(w, http.StatusNotFound, "unknown product, warehouse, or section")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to apply transfer")
		return
	}

	s.publishStockUpdated(r.Context(), events.StockUpdatedPayload{
		TenantID: tenantID, SKU: req.ProductSKU, WarehouseID: req.FromWarehouseID, SectionID: req.FromSectionID,
		Quantity: outNext.Quantity, AvgUnitCost: outNext.AvgUnitCost, MovementType: string(domain.MovementOut),
		OccurredAt: occurredAt.Format(time.RFC3339),
	})
	s.publishStockUpdated(r.Context(), events.StockUpdatedPayload{
		TenantID: tenantID, SKU: req.ProductSKU, WarehouseID: req.ToWarehouseID, SectionID: req.ToSectionID,
		Quantity: inNext.Quantity, AvgUnitCost: inNext.AvgUnitCost, MovementType: string(domain.MovementIn),
		OccurredAt: occurredAt.Format(time.RFC3339),
	})

	writeJSON(w, http.StatusCreated, transferResponse{TransferID: transferID, Out: savedOut, In: savedIn})
}

func (s *StockServer) handleGetStock(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	tenantID := middleware.TenantID(r.Context())
	if _, err := s.Products.GetBySKU(r.Context(), tenantID, sku); err != nil {
		writeError(w, http.StatusNotFound, "product not found")
		return
	}

	warehouseID := r.URL.Query().Get("warehouseId")
	sectionID := r.URL.Query().Get("sectionId")
	if warehouseID != "" && sectionID != "" {
		level, err := s.Stock.GetLevel(r.Context(), tenantID, sku, warehouseID, sectionID)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to read stock level")
			return
		}
		writeJSON(w, http.StatusOK, level)
		return
	}

	total, err := s.Stock.TotalQuantityBySKU(r.Context(), tenantID, sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read stock total")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"sku": sku, "totalQuantity": total})
}

func (s *StockServer) handleLowStock(w http.ResponseWriter, r *http.Request) {
	tenantID := middleware.TenantID(r.Context())
	tenant, err := s.Tenants.GetByID(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read tenant")
		return
	}
	low, err := s.Stock.LowStockProducts(r.Context(), tenantID, tenant.LowStockThreshold)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read low stock products")
		return
	}
	writeJSON(w, http.StatusOK, low)
}

// publishStockUpdated/publishStockLow no-op when Events is nil (tests
// exercise the HTTP/repository layers without a RabbitMQ container —
// the publisher itself has its own dedicated test in Task 5) and are
// best-effort in production: a failed publish never fails the HTTP
// response (design §7 error handling).
func (s *StockServer) publishStockUpdated(ctx context.Context, payload events.StockUpdatedPayload) {
	if s.Events == nil {
		return
	}
	_ = s.Events.PublishStockUpdated(ctx, payload)
}

func (s *StockServer) publishStockLow(ctx context.Context, payload events.StockLowPayload) {
	if s.Events == nil {
		return
	}
	_ = s.Events.PublishStockLow(ctx, payload)
}
