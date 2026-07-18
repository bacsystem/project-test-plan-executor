package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"subtract/internal/subtract"
)

type successResponse struct {
	Result int `json:"result"`
}

type errorResponse struct {
	Error string `json:"error"`
}

// Subtract handles GET /subtract?a=<int>&b=<int>, returning a-b as JSON.
func Subtract(w http.ResponseWriter, r *http.Request) {
	rawA := r.URL.Query().Get("a")
	if rawA == "" {
		writeError(w, http.StatusBadRequest, "missing required query parameter 'a'")
		return
	}
	rawB := r.URL.Query().Get("b")
	if rawB == "" {
		writeError(w, http.StatusBadRequest, "missing required query parameter 'b'")
		return
	}

	a, err := strconv.Atoi(rawA)
	if err != nil {
		writeError(w, http.StatusBadRequest, "'a' must be a valid integer")
		return
	}
	b, err := strconv.Atoi(rawB)
	if err != nil {
		writeError(w, http.StatusBadRequest, "'b' must be a valid integer")
		return
	}

	writeJSON(w, http.StatusOK, successResponse{Result: subtract.Compute(a, b)})
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, errorResponse{Error: message})
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(body)
}
