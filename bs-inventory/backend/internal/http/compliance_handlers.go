package http

import (
	"errors"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"bs-inventory/internal/compliance"
	"bs-inventory/internal/domain"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type ReportsServer struct {
	Stock *postgres.StockRepository
}

func (s *ReportsServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/api/v1/reports/valuation", s.handleValuation)
	return r
}

type valuationResponse struct {
	ByWarehouse map[string]float64 `json:"byWarehouse"`
	Total       float64            `json:"total"`
}

func (s *ReportsServer) handleValuation(w http.ResponseWriter, r *http.Request) {
	tenantID := middleware.TenantID(r.Context())
	byWarehouse, err := s.Stock.TotalValuation(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to compute valuation")
		return
	}
	var total float64
	for _, v := range byWarehouse {
		total += v
	}
	writeJSON(w, http.StatusOK, valuationResponse{ByWarehouse: byWarehouse, Total: total})
}

type ComplianceServer struct {
	Stock      *postgres.StockRepository
	Products   *postgres.ProductRepository
	Tenants    *postgres.TenantRepository
	Warehouses *postgres.WarehouseRepository
}

func (s *ComplianceServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/api/v1/compliance/kardex/{sku}", s.handleKardex)
	r.Get("/api/v1/compliance/ple-export", s.handlePLEExport)
	return r
}

func (s *ComplianceServer) handleKardex(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	tenantID := middleware.TenantID(r.Context())
	if _, err := s.Products.GetBySKU(r.Context(), tenantID, sku); err != nil {
		writeError(w, http.StatusNotFound, "product not found")
		return
	}
	movements, err := s.Stock.ListMovementsByProduct(r.Context(), tenantID, sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read movements")
		return
	}
	writeJSON(w, http.StatusOK, compliance.BuildKardex(movements))
}

func (s *ComplianceServer) handlePLEExport(w http.ResponseWriter, r *http.Request) {
	tenantID := middleware.TenantID(r.Context())
	tenant, err := s.Tenants.GetByID(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read tenant")
		return
	}

	var profile compliance.RegulatoryProfile
	switch tenant.CountryCode {
	case "PE":
		profile = compliance.NewPeruProfile()
	default:
		writeError(w, http.StatusBadRequest, "no compliance profile implemented for this tenant's country")
		return
	}

	period := r.URL.Query().Get("period")
	from, to, err := parsePeriodRange(period)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	movements, err := s.Stock.ListMovementsByTenantAndPeriod(r.Context(), tenantID, from, to)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read movements")
		return
	}

	// PLE needs each movement's unit-of-measure (on Product) and its
	// warehouse's RUC establishment code (on Warehouse) — neither lives on
	// StockMovement, so join both here rather than growing the domain
	// type (see Task 6's ExportLedger signature note).
	products, err := s.Products.List(r.Context(), tenantID, 10000, 0)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read products")
		return
	}
	productsBySKU := make(map[string]domain.Product, len(products))
	for _, p := range products {
		productsBySKU[p.SKU] = p
	}

	warehouseList, err := s.Warehouses.ListByTenant(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read warehouses")
		return
	}
	warehousesByID := make(map[string]domain.Warehouse, len(warehouseList))
	for _, wh := range warehouseList {
		warehousesByID[wh.ID] = wh
	}

	out, err := profile.ExportLedger(r.Context(), movements, productsBySKU, warehousesByID, period)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to build export")
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(out)
}

// parsePeriodRange parses a "YYYYMM" period into the half-open [from, to)
// range used to filter stock_movements.occurred_at for the PLE export.
func parsePeriodRange(period string) (time.Time, time.Time, error) {
	if len(period) != 6 {
		return time.Time{}, time.Time{}, errors.New(`period must be in "YYYYMM" format`)
	}
	from, err := time.Parse("200601", period)
	if err != nil {
		return time.Time{}, time.Time{}, errors.New(`period must be in "YYYYMM" format`)
	}
	return from, from.AddDate(0, 1, 0), nil
}
