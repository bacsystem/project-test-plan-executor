package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSubtract_Valid(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5&b=3", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Result int `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Result != 2 {
		t.Errorf("Result = %d, want 2", body.Result)
	}
}

func TestSubtract_NegativeResult(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=3&b=5", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Result int `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Result != -2 {
		t.Errorf("Result = %d, want -2", body.Result)
	}
}

func TestSubtract_MissingA(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?b=3", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}

	var body struct {
		Error string `json:"error"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Error == "" {
		t.Error("expected a non-empty error message")
	}
}

func TestSubtract_MissingB(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestSubtract_NonNumericA(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=abc&b=3", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestSubtract_NonNumericB(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5&b=xyz", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}
