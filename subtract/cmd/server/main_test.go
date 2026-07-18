package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewMux_RoutesSubtract(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5&b=3", nil)
	rec := httptest.NewRecorder()

	newMux().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
}

func TestNewMux_UnknownRouteReturns404(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/unknown", nil)
	rec := httptest.NewRecorder()

	newMux().ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusNotFound)
	}
}
