package http

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/auth"
	"bs-inventory/internal/events"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

// Dependencies bundles everything NewRouter needs to wire the full API.
// Publisher may be nil (StockServer no-ops event publishing in that
// case) — useful for tests that don't need a RabbitMQ container.
type Dependencies struct {
	Pool      *pgxpool.Pool
	Issuer    *auth.TokenIssuer
	Publisher *events.Publisher
	// AllowedOrigin is the CORS origin the frontend is served from;
	// empty defaults to "*" (see middleware.CORS).
	AllowedOrigin string
}

func NewRouter(deps Dependencies) chi.Router {
	tenants := postgres.NewTenantRepository(deps.Pool)
	users := postgres.NewUserRepository(deps.Pool)
	warehouses := postgres.NewWarehouseRepository(deps.Pool)
	sections := postgres.NewSectionRepository(deps.Pool)
	products := postgres.NewProductRepository(deps.Pool)
	stock := postgres.NewStockRepository(deps.Pool)

	authServer := &AuthServer{Tenants: tenants, Users: users, Issuer: deps.Issuer}
	catalogServer := &CatalogServer{Warehouses: warehouses, Sections: sections, Products: products, Stock: stock}
	stockServer := &StockServer{Stock: stock, Products: products, Tenants: tenants, Events: deps.Publisher}
	reportsServer := &ReportsServer{Stock: stock}
	complianceServer := &ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}

	r := chi.NewRouter()
	r.Use(middleware.CORS(deps.AllowedOrigin))
	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	// Each sub-router registers full absolute paths so it can be tested
	// standalone; r.Handle forwards the request unchanged (unlike Mount,
	// which would strip the prefix and break those absolute paths).

	// Unauthenticated.
	r.Handle("/api/v1/auth/*", authServer.Routes())

	// Everything else requires a valid JWT.
	r.Group(func(r chi.Router) {
		r.Use(middleware.Auth(deps.Issuer))
		r.Handle("/api/v1/warehouses", catalogServer.Routes())
		r.Handle("/api/v1/warehouses/*", catalogServer.Routes())
		r.Handle("/api/v1/products", catalogServer.Routes())
		r.Handle("/api/v1/products/*", catalogServer.Routes())
		r.Handle("/api/v1/stock/*", stockServer.Routes())
		r.Handle("/api/v1/reports/*", reportsServer.Routes())
		r.Handle("/api/v1/compliance/*", complianceServer.Routes())
	})

	return r
}
