package main

import (
	"crypto/subtle"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

type portalSettings struct {
	Enabled bool `json:"enabled"`
	Pages   struct {
		Dashboard    bool `json:"dashboard"`
		Modules      bool `json:"modules"`
		Chatroom     bool `json:"chatroom"`
		Mentor       bool `json:"mentor"`
		Tasks        bool `json:"tasks"`
		Projects     bool `json:"projects"`
		Events       bool `json:"events"`
		Community    bool `json:"community"`
		Certificates bool `json:"certificates"`
		Leaderboard  bool `json:"leaderboard"`
		FAQ          bool `json:"faq"`
		Settings     bool `json:"settings"`
	} `json:"pages"`
	UpdatedAt string `json:"updated_at"`
}

var (
	settingsMu sync.Mutex
	dataFile   = env("PARTICIPANT_PORTAL_SETTINGS_FILE", filepath.Join("..", ".cursor", "participant-portal-settings.json"))
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "service": "herai-participant-portal"})
	})
	mux.HandleFunc("/api/participant-portal/settings", settingsHandler)

	addr := env("PARTICIPANT_PORTAL_ADDR", "127.0.0.1:8092")
	log.Printf("HerAI participant portal service running at http://%s", addr)
	log.Fatal(http.ListenAndServe(addr, withSecurity(mux)))
}

func settingsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	switch r.Method {
	case http.MethodGet:
		settings, err := loadSettings()
		if err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]any{"status": "error", "message": err.Error()})
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"status": "success", "settings": settings})
	case http.MethodPost, http.MethodPut:
		if !validAdminRequest(r) {
			writeJSON(w, http.StatusForbidden, map[string]any{"status": "error", "message": "admin access required"})
			return
		}
		var payload struct {
			Settings portalSettings `json:"settings"`
		}
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]any{"status": "error", "message": "invalid json payload"})
			return
		}
		next := normalizeSettings(payload.Settings)
		if err := saveSettings(next); err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]any{"status": "error", "message": err.Error()})
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"status": "success", "settings": next})
	default:
		w.Header().Set("Allow", "GET, POST, PUT, OPTIONS")
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"status": "error", "message": "method not allowed"})
	}
}

func loadSettings() (portalSettings, error) {
	settingsMu.Lock()
	defer settingsMu.Unlock()

	defaults := defaultSettings()
	raw, err := os.ReadFile(dataFile)
	if errors.Is(err, os.ErrNotExist) {
		if err := persistSettings(defaults); err != nil {
			return defaults, err
		}
		return defaults, nil
	}
	if err != nil {
		return defaults, err
	}

	var saved portalSettings
	if err := json.Unmarshal(raw, &saved); err != nil {
		return defaults, err
	}
	return normalizeSettings(saved), nil
}

func saveSettings(settings portalSettings) error {
	settingsMu.Lock()
	defer settingsMu.Unlock()
	return persistSettings(settings)
}

func persistSettings(settings portalSettings) error {
	if err := os.MkdirAll(filepath.Dir(dataFile), 0o755); err != nil {
		return err
	}
	raw, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(dataFile, raw, 0o600)
}

func defaultSettings() portalSettings {
	var s portalSettings
	s.Enabled = true
	s.Pages.Dashboard = true
	s.Pages.Modules = true
	s.Pages.Chatroom = true
	s.Pages.Mentor = true
	s.Pages.Tasks = true
	s.Pages.Projects = true
	s.Pages.Events = true
	s.Pages.Community = true
	s.Pages.Certificates = true
	s.Pages.Leaderboard = true
	s.Pages.FAQ = true
	s.Pages.Settings = true
	s.UpdatedAt = time.Now().UTC().Format(time.RFC3339)
	return s
}

func normalizeSettings(settings portalSettings) portalSettings {
	defaults := defaultSettings()
	if settings.UpdatedAt == "" {
		settings.UpdatedAt = defaults.UpdatedAt
	}
	settings.UpdatedAt = time.Now().UTC().Format(time.RFC3339)
	return settings
}

func withSecurity(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if isAllowedOrigin(origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-HerAI-Admin-Key")
		}
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

		if r.Method != http.MethodGet && r.Method != http.MethodOptions && !isAllowedOrigin(origin) {
			writeJSON(w, http.StatusForbidden, map[string]any{"status": "error", "message": "origin not allowed"})
			return
		}
		next.ServeHTTP(w, r)
	})
}

func validAdminRequest(r *http.Request) bool {
	key := os.Getenv("PARTICIPANT_PORTAL_ADMIN_KEY")
	if key == "" {
		return true
	}
	got := r.Header.Get("X-HerAI-Admin-Key")
	return subtle.ConstantTimeCompare([]byte(got), []byte(key)) == 1
}

func isAllowedOrigin(origin string) bool {
	if origin == "" {
		return false
	}
	for _, allowed := range strings.Split(env("HERAI_ALLOWED_ORIGINS", "http://127.0.0.1:3000,http://localhost:3000,https://her-ai.data-sorcerers.com,https://herai-signaling.onrender.com"), ",") {
		if strings.TrimSpace(allowed) == origin {
			return true
		}
	}
	return false
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func env(key, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		return value
	}
	return fallback
}
