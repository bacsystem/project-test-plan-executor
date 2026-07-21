package http

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type CatalogServer struct {
	Warehouses *postgres.WarehouseRepository
	Sections   *postgres.SectionRepository
	Products   *postgres.ProductRepository
	Stock      *postgres.StockRepository
}

func (s *CatalogServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/api/v1/warehouses", s.handleCreateWarehouse)
	r.Get("/api/v1/warehouses", s.handleListWarehouses)
	r.Post("/api/v1/warehouses/{warehouseID}/sections", s.handleCreateSection)
	r.Get("/api/v1/warehouses/{warehouseID}/sections", s.handleListSections)
	r.Post("/api/v1/products", s.handleCreateProduct)
	r.Get("/api/v1/products", s.handleListProducts)
	r.Get("/api/v1/products/{sku}", s.handleGetProduct)
	r.Get("/api/v1/products/{sku}/movements", s.handleProductMovements)
	return r
}

type createWarehouseRequest struct {
	Name                 string `json:"name"`
	Code                 string `json:"code"`
	RucEstablishmentCode string `json:"rucEstablishmentCode"`
}

func (s *CatalogServer) handleCreateWarehouse(w http.ResponseWriter, r *http.Request) {
	var req createWarehouseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Name == "" || req.Code == "" {
		writeError(w, http.StatusBadRequest, "name and code are required")
		return
	}
	wh, err := s.Warehouses.Create(r.Context(), domain.Warehouse{
		TenantID:             middleware.TenantID(r.Context()),
		Name:                 req.Name,
		Code:                 req.Code,
		RucEstablishmentCode: req.RucEstablishmentCode,
	})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create warehouse")
		return
	}
	writeJSON(w, http.StatusCreated, wh)
}

func (s *CatalogServer) handleListWarehouses(w http.ResponseWriter, r *http.Request) {
	list, err := s.Warehouses.ListByTenant(r.Context(), middleware.TenantID(r.Context()))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list warehouses")
		return
	}
	writeJSON(w, http.StatusOK, list)
}

type createSectionRequest struct {
	Name string `json:"name"`
	Code string `json:"code"`
}

func (s *CatalogServer) handleCreateSection(w http.ResponseWriter, r *http.Request) {
	warehouseID := chi.URLParam(r, "warehouseID")
	if _, err := s.Warehouses.GetByID(r.Context(), middleware.TenantID(r.Context()), warehouseID); err != nil {
		writeError(w, http.StatusNotFound, "warehouse not found")
		return
	}
	var req createSectionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Name == "" || req.Code == "" {
		writeError(w, http.StatusBadRequest, "name and code are required")
		return
	}
	sec, err := s.Sections.Create(r.Context(), domain.Section{WarehouseID: warehouseID, Name: req.Name, Code: req.Code})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create section")
		return
	}
	writeJSON(w, http.StatusCreated, sec)
}

func (s *CatalogServer) handleListSections(w http.ResponseWriter, r *http.Request) {
	warehouseID := chi.URLParam(r, "warehouseID")
	list, err := s.Sections.ListByWarehouse(r.Context(), warehouseID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list sections")
		return
	}
	writeJSON(w, http.StatusOK, list)
}

type createProductRequest struct {
	SKU               string `json:"sku"`
	Name              string `json:"name"`
	Category          string `json:"category"`
	UnitOfMeasureCode string `json:"unitOfMeasureCode"`
}

func (s *CatalogServer) handleCreateProduct(w http.ResponseWriter, r *http.Request) {
	var req createProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.SKU == "" || req.Name == "" || req.UnitOfMeasureCode == "" {
		writeError(w, http.StatusBadRequest, "sku, name, and unitOfMeasureCode are required")
		return
	}
	p := domain.Product{
		TenantID:          middleware.TenantID(r.Context()),
		SKU:               req.SKU,
		Name:              req.Name,
		Category:          req.Category,
		UnitOfMeasureCode: req.UnitOfMeasureCode,
	}
	if err := s.Products.Create(r.Context(), p); err != nil {
		if err == postgres.ErrDuplicateSKU {
			writeError(w, http.StatusConflict, "a product with this SKU already exists")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to create product")
		return
	}
	writeJSON(w, http.StatusCreated, p)
}

func (s *CatalogServer) handleListProducts(w http.ResponseWriter, r *http.Request) {
	list, err := s.Products.List(r.Context(), middleware.TenantID(r.Context()), 100, 0)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list products")
		return
	}
	writeJSON(w, http.StatusOK, list)
}

func (s *CatalogServer) handleGetProduct(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	p, err := s.Products.GetBySKU(r.Context(), middleware.TenantID(r.Context()), sku)
	if err != nil {
		if err == postgres.ErrProductNotFound {
			writeError(w, http.StatusNotFound, "product not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to get product")
		return
	}
	writeJSON(w, http.StatusOK, p)
}

func (s *CatalogServer) handleProductMovements(w http.ResponseWriter, r *http.Request) {
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
	writeJSON(w, http.StatusOK, movements)
}
