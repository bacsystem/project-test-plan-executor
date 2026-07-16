package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"factorial/internal/factorial"
)

type successResponse struct {
	N      int    `json:"n"`
	Result string `json:"result"`
}

type errorResponse struct {
	Error string `json:"error"`
}

// Factorial handles GET /factorial?n=<integer>, returning n! as JSON.
func Factorial(w http.ResponseWriter, r *http.Request) {
	raw := r.URL.Query().Get("n")
	if raw == "" {
		writeError(w, http.StatusBadRequest, "missing required query parameter 'n'")
		return
	}

	n, err := strconv.Atoi(raw)
	if err != nil {
		writeError(w, http.StatusBadRequest, "'n' must be a valid integer")
		return
	}

	result, err := factorial.Compute(n)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, successResponse{N: n, Result: result.String()})
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, errorResponse{Error: message})
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(body)
}
