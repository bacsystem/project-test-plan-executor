package http

import (
	"encoding/json"
	"net/http/httptest"
	"testing"
)

func TestWriteJSON_NilSliceSerializesAsEmptyArray(t *testing.T) {
	var nilStrings []string

	rec := httptest.NewRecorder()
	writeJSON(rec, 200, nilStrings)

	body := rec.Body.String()
	if body != "[]\n" {
		t.Errorf("body = %q, want %q (a fresh tenant's list response must never be null)", body, "[]\n")
	}

	var decoded []string
	if err := json.Unmarshal(rec.Body.Bytes(), &decoded); err != nil {
		t.Fatalf("decode error = %v", err)
	}
	if decoded == nil {
		t.Error("decoded slice is nil, want a non-nil empty slice")
	}
}

func TestWriteJSON_NonSliceBodyUnaffected(t *testing.T) {
	rec := httptest.NewRecorder()
	writeJSON(rec, 200, map[string]string{"status": "ok"})

	if got, want := rec.Body.String(), "{\"status\":\"ok\"}\n"; got != want {
		t.Errorf("body = %q, want %q", got, want)
	}
}
