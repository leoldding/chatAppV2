package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

// Test the ping endpoint
func TestPingHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/ping", nil)
	if err != nil {
		t.Fatal(err)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ping)

	handler.ServeHTTP(recorder, req)

	if status := recorder.Code; status != http.StatusOK {
		t.Errorf("Ping handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}
}
