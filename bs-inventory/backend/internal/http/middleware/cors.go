package middleware

import "net/http"

// CORS lets a browser-based client served from a different origin (the
// Next.js frontend on its own port) call this API. Without it, the
// browser blocks every cross-origin request before it ever reaches Auth
// or any handler — surfaced client-side as a bare "Failed to fetch", not
// any HTTP status this server sees (discovered by actually running the
// Playwright e2e suite against the docker-compose stack: whole-branch
// review flagged the e2e as never having been executed).
//
// allowedOrigin "*" is safe here even though requests carry an
// Authorization header: nothing in this API relies on cookies (the
// frontend sends the JWT via that header, never credentials: "include"),
// so there's no credential-leak risk a wildcard would normally create.
func CORS(allowedOrigin string) func(http.Handler) http.Handler {
	if allowedOrigin == "" {
		allowedOrigin = "*"
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
