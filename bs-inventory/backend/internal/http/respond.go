package http

import (
	"encoding/json"
	"net/http"
	"reflect"
)

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(nonNilSlice(body))
}

// nonNilSlice replaces a nil slice with an empty one of the same type so
// list endpoints always serialize as `[]`, never `null` — repositories
// return nil for "no rows", but frontend pages call .map() on the
// response, which throws on null for a freshly registered tenant.
func nonNilSlice(body any) any {
	v := reflect.ValueOf(body)
	if v.Kind() == reflect.Slice && v.IsNil() {
		return reflect.MakeSlice(v.Type(), 0, 0).Interface()
	}
	return body
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
