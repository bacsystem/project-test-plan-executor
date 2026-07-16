package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestFactorial_Valid(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=5", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		N      int    `json:"n"`
		Result string `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.N != 5 || body.Result != "120" {
		t.Errorf("body = %+v, want {N:5 Result:120}", body)
	}
}

func TestFactorial_Zero(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=0", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Result string `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Result != "1" {
		t.Errorf("Result = %q, want %q", body.Result, "1")
	}
}

func TestFactorial_MissingParam(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestFactorial_NonNumeric(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=abc", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestFactorial_Negative(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=-1", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestFactorial_ExceedsMax(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=10001", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}
