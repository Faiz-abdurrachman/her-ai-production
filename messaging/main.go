package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID           string `json:"id"`
	DisplayName  string `json:"display_name"`
	Password     string `json:"password,omitempty"`
	PasswordHash string `json:"password_hash,omitempty"`
	PublicKey    string `json:"public_key,omitempty"`
	Role         string `json:"role,omitempty"`
	CreatedAt    string `json:"created_at"`
}

type Room struct {
	ID        string            `json:"id"`
	Title     string            `json:"title"`
	Type      string            `json:"type"`
	CreatedBy string            `json:"created_by"`
	Members   []string          `json:"members"`
	KeyPacket map[string]KeyBox `json:"key_packet,omitempty"`
	CreatedAt string            `json:"created_at"`
}

type KeyBox struct {
	SenderID        string          `json:"sender_id"`
	SenderPublicKey json.RawMessage `json:"sender_public_key"`
	Nonce           string          `json:"nonce"`
	Ciphertext      string          `json:"ciphertext"`
}

type Message struct {
	ID         string            `json:"id"`
	RoomID     string            `json:"room_id"`
	SenderID   string            `json:"sender_id"`
	Kind       string            `json:"kind"`
	FileName   string            `json:"file_name,omitempty"`
	MimeType   string            `json:"mime_type,omitempty"`
	FileSize   int64             `json:"file_size,omitempty"`
	Ciphertext string            `json:"ciphertext"`
	Nonce      string            `json:"nonce"`
	Alg        string            `json:"alg"`
	CreatedAt  string            `json:"created_at"`
	Reads      map[string]string `json:"reads,omitempty"`
}

type Session struct {
	Token     string
	UserID    string
	ExpiresAt time.Time
}

type Store struct {
	mu       sync.RWMutex
	dataFile string
	hub      *Hub
	users    map[string]User
	sessions map[string]Session
	rooms    map[string]Room
	messages map[string][]Message
	reads    map[string]map[string]string
	friends  map[string]map[string]bool
}

type Client struct {
	userID string
	hub    *Hub
	conn   *websocket.Conn
	send   chan WSEvent
}

type Hub struct {
	mu      sync.RWMutex
	clients map[string]map[*Client]bool
	store   *Store
}

type WSEvent struct {
	Type    string          `json:"type"`
	RoomID  string          `json:"room_id,omitempty"`
	UserID  string          `json:"user_id,omitempty"`
	Payload json.RawMessage `json:"payload,omitempty"`
}

type persistedState struct {
	Users    map[string]User              `json:"users"`
	Rooms    map[string]Room              `json:"rooms"`
	Messages map[string][]Message         `json:"messages"`
	Reads    map[string]map[string]string `json:"reads"`
	Friends  map[string]map[string]bool   `json:"friends"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  4096,
	WriteBufferSize: 4096,
	CheckOrigin: func(r *http.Request) bool {
		return isAllowedOrigin(r)
	},
}

const maxAttachmentBytes int64 = 8 * 1024 * 1024
const sessionTTL = 24 * time.Hour

func main() {
	store := newStore()
	hub := &Hub{clients: map[string]map[*Client]bool{}, store: store}
	store.hub = hub

	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "service": "herai-messaging"})
	})
	mux.HandleFunc("/api/config", store.handleConfig)
	mux.HandleFunc("/api/register/validate", store.handleRegisterValidate)
	mux.HandleFunc("/api/register", store.handleRegister)
	mux.HandleFunc("/api/login", store.handleLogin)
	mux.HandleFunc("/api/users", store.auth(store.handleUsers))
	mux.HandleFunc("/api/friends", store.auth(store.handleFriends))
	mux.HandleFunc("/api/rooms", store.auth(store.handleRooms))
	mux.HandleFunc("/api/rooms/", store.auth(store.handleRoomDetail))
	mux.HandleFunc("/ws", hub.handleWS)

	addr := ":" + getenv("PORT", getenv("MESSAGING_PORT", "8091"))
	log.Printf("HerAI messaging service running at http://127.0.0.1%s", addr)
	log.Fatal(http.ListenAndServe(addr, cors(mux)))
}

func (s *Store) handleConfig(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":                   true,
		"allowed_roles":        []string{"fellow", "mentor", "volunteer", "partner"},
		"max_attachment_bytes": maxAttachmentBytes,
		"attachment_kinds":     []string{"text", "image", "video", "document"},
	})
}

func (s *Store) handleRegisterValidate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	var req struct {
		ID          string `json:"id"`
		DisplayName string `json:"display_name"`
		Password    string `json:"password"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	id := normalizeID(req.ID)
	if id == "" || strings.TrimSpace(req.DisplayName) == "" || len(req.Password) < 6 {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "ID, nama, dan password minimal 6 karakter wajib diisi."})
		return
	}
	s.mu.RLock()
	_, exists := s.users[id]
	s.mu.RUnlock()
	if exists {
		writeJSON(w, http.StatusConflict, map[string]any{"ok": false, "message": "ID sudah dipakai."})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "normalized_id": id})
}

func newStore() *Store {
	store := &Store{
		dataFile: getenv("MESSAGING_DATA_FILE", "messaging-data.json"),
		users:    map[string]User{},
		sessions: map[string]Session{},
		rooms:    map[string]Room{},
		messages: map[string][]Message{},
		reads:    map[string]map[string]string{},
		friends:  map[string]map[string]bool{},
	}
	store.load()
	return store
}

func (s *Store) handleRegister(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	var req struct {
		ID          string `json:"id"`
		DisplayName string `json:"display_name"`
		Password    string `json:"password"`
		PublicKey   string `json:"public_key"`
		Role        string `json:"role"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	req.ID = normalizeID(req.ID)
	if req.ID == "" || req.DisplayName == "" || len(req.Password) < 6 {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "ID, nama, dan password minimal 6 karakter wajib diisi."})
		return
	}
	role := normalizeRole(req.Role)
	if role == "" {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "Role pendaftaran tidak valid."})
		return
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.users[req.ID]; exists {
		writeJSON(w, http.StatusConflict, map[string]any{"ok": false, "message": "ID sudah dipakai."})
		return
	}
	passwordHash, err := hashPassword(req.Password)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]any{"ok": false, "message": "Gagal mengamankan password."})
		return
	}
	user := User{ID: req.ID, DisplayName: req.DisplayName, PasswordHash: passwordHash, PublicKey: req.PublicKey, Role: role, CreatedAt: time.Now().UTC().Format(time.RFC3339)}
	s.users[user.ID] = user
	token := randomID("tok")
	s.sessions[token] = newSession(token, user.ID)
	s.persistLocked()
	user = sanitizeUser(user)
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "token": token, "user": user})
}

func (s *Store) handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	var req struct {
		ID        string `json:"id"`
		Password  string `json:"password"`
		PublicKey string `json:"public_key"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	req.ID = normalizeID(req.ID)
	s.mu.Lock()
	defer s.mu.Unlock()
	user, ok := s.users[req.ID]
	if !ok || !verifyPassword(user, req.Password) {
		writeJSON(w, http.StatusUnauthorized, map[string]any{"ok": false, "message": "ID atau password salah."})
		return
	}
	if needsPasswordMigration(user) {
		passwordHash, err := hashPassword(req.Password)
		if err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]any{"ok": false, "message": "Gagal memigrasikan password."})
			return
		}
		user.PasswordHash = passwordHash
		user.Password = ""
		s.users[user.ID] = user
		s.persistLocked()
	}
	if req.PublicKey != "" {
		user.PublicKey = req.PublicKey
		s.users[user.ID] = user
		s.persistLocked()
	}
	token := randomID("tok")
	s.sessions[token] = newSession(token, user.ID)
	user = sanitizeUser(user)
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "token": token, "user": user})
}

func (s *Store) handleUsers(w http.ResponseWriter, r *http.Request, user User) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	users := []User{sanitizeUser(user)}
	for friendID := range s.friends[user.ID] {
		if friend, ok := s.users[friendID]; ok {
			users = append(users, sanitizeUser(friend))
		}
	}
	sort.Slice(users, func(i, j int) bool { return users[i].DisplayName < users[j].DisplayName })
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "users": users})
}

func (s *Store) handleFriends(w http.ResponseWriter, r *http.Request, user User) {
	if r.Method == http.MethodGet {
		s.mu.RLock()
		defer s.mu.RUnlock()
		friends := []User{}
		for friendID := range s.friends[user.ID] {
			if friend, ok := s.users[friendID]; ok {
				friend.Password = ""
				friends = append(friends, friend)
			}
		}
		sort.Slice(friends, func(i, j int) bool { return friends[i].DisplayName < friends[j].DisplayName })
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "friends": friends})
		return
	}
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	var req struct {
		FriendID string `json:"friend_id"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	req.FriendID = normalizeID(req.FriendID)
	s.mu.Lock()
	defer s.mu.Unlock()
	if req.FriendID == user.ID {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "Tidak bisa menambahkan diri sendiri."})
		return
	}
	friend, ok := s.users[req.FriendID]
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]any{"ok": false, "message": "User ID tidak ditemukan."})
		return
	}
	if s.friends[user.ID] == nil {
		s.friends[user.ID] = map[string]bool{}
	}
	if s.friends[req.FriendID] == nil {
		s.friends[req.FriendID] = map[string]bool{}
	}
	s.friends[user.ID][req.FriendID] = true
	s.friends[req.FriendID][user.ID] = true
	s.persistLocked()
	friend.Password = ""
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "friend": friend})
}

func (s *Store) handleRooms(w http.ResponseWriter, r *http.Request, user User) {
	if r.Method == http.MethodGet {
		s.mu.RLock()
		defer s.mu.RUnlock()
		rooms := []Room{}
		for _, room := range s.rooms {
			if contains(room.Members, user.ID) {
				if room.KeyPacket != nil {
					room.KeyPacket = map[string]KeyBox{user.ID: room.KeyPacket[user.ID]}
				}
				rooms = append(rooms, room)
			}
		}
		sort.Slice(rooms, func(i, j int) bool { return rooms[i].CreatedAt > rooms[j].CreatedAt })
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "rooms": rooms})
		return
	}
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	var req struct {
		Title     string            `json:"title"`
		Type      string            `json:"type"`
		Members   []string          `json:"members"`
		KeyPacket map[string]KeyBox `json:"key_packet"`
	}
	if !decodeJSON(w, r, &req) {
		return
	}
	members := uniqueIDs(append(req.Members, user.ID))
	if len(members) < 2 {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "Room butuh minimal 2 member."})
		return
	}
	if req.Title == "" {
		req.Title = "Secure Chat"
	}
	if req.Type == "" {
		req.Type = "direct"
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, member := range members {
		if _, ok := s.users[member]; !ok {
			writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "Member tidak ditemukan: " + member})
			return
		}
		if member != user.ID && !s.areFriendsLocked(user.ID, member) {
			writeJSON(w, http.StatusForbidden, map[string]any{"ok": false, "message": "Member harus ditambahkan sebagai teman terlebih dahulu: " + member})
			return
		}
	}
	room := Room{
		ID:        randomID("room"),
		Title:     req.Title,
		Type:      req.Type,
		CreatedBy: user.ID,
		Members:   members,
		KeyPacket: req.KeyPacket,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}
	s.rooms[room.ID] = room
	for _, member := range members {
		if s.friends[user.ID] == nil {
			s.friends[user.ID] = map[string]bool{}
		}
		if s.friends[member] == nil {
			s.friends[member] = map[string]bool{}
		}
		s.friends[user.ID][member] = true
		s.friends[member][user.ID] = true
	}
	s.persistLocked()
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "room": room})
}

func (s *Store) handleRoomDetail(w http.ResponseWriter, r *http.Request, user User) {
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/api/rooms/"), "/")
	if len(parts) < 2 || parts[1] != "messages" {
		writeJSON(w, http.StatusNotFound, map[string]any{"ok": false, "message": "not found"})
		return
	}
	roomID := parts[0]
	s.mu.RLock()
	room, ok := s.rooms[roomID]
	if !ok || !contains(room.Members, user.ID) {
		s.mu.RUnlock()
		writeJSON(w, http.StatusNotFound, map[string]any{"ok": false, "message": "Room tidak ditemukan."})
		return
	}
	if r.Method == http.MethodPost {
		s.mu.RUnlock()
		var req struct {
			Kind       string `json:"kind"`
			FileName   string `json:"file_name"`
			MimeType   string `json:"mime_type"`
			FileSize   int64  `json:"file_size"`
			Ciphertext string `json:"ciphertext"`
			Nonce      string `json:"nonce"`
			Alg        string `json:"alg"`
		}
		if !decodeJSON(w, r, &req) {
			return
		}
		if req.Ciphertext == "" || req.Nonce == "" {
			writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "Payload pesan tidak lengkap."})
			return
		}
		if message := validateMessagePayload(req.Kind, req.FileSize); message != "" {
			writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": message})
			return
		}
		msg := s.saveMessage(user.ID, struct {
			RoomID     string `json:"room_id"`
			Kind       string `json:"kind"`
			FileName   string `json:"file_name"`
			MimeType   string `json:"mime_type"`
			FileSize   int64  `json:"file_size"`
			Ciphertext string `json:"ciphertext"`
			Nonce      string `json:"nonce"`
			Alg        string `json:"alg"`
		}{
			RoomID:     roomID,
			Kind:       req.Kind,
			FileName:   req.FileName,
			MimeType:   req.MimeType,
			FileSize:   req.FileSize,
			Ciphertext: req.Ciphertext,
			Nonce:      req.Nonce,
			Alg:        req.Alg,
		})
		if s.hub != nil {
			payload, _ := json.Marshal(msg)
			s.hub.broadcastRoom(roomID, WSEvent{Type: "message.new", RoomID: roomID, UserID: user.ID, Payload: payload})
		}
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "message": msg})
		return
	}
	if r.Method != http.MethodGet {
		s.mu.RUnlock()
		writeJSON(w, http.StatusMethodNotAllowed, map[string]any{"ok": false, "message": "method not allowed"})
		return
	}
	messages := append([]Message{}, s.messages[roomID]...)
	for i := range messages {
		messages[i].Reads = s.reads[messages[i].ID]
	}
	s.mu.RUnlock()
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "messages": messages})
}

func (h *Hub) handleWS(w http.ResponseWriter, r *http.Request) {
	token := strings.TrimSpace(r.URL.Query().Get("token"))
	user, ok := h.store.userByToken(token)
	if !ok {
		writeJSON(w, http.StatusUnauthorized, map[string]any{"ok": false, "message": "invalid token"})
		return
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	client := &Client{userID: user.ID, hub: h, conn: conn, send: make(chan WSEvent, 32)}
	h.add(client)
	go client.writeLoop()
	client.readLoop()
}

func (h *Hub) add(c *Client) {
	h.mu.Lock()
	if h.clients[c.userID] == nil {
		h.clients[c.userID] = map[*Client]bool{}
	}
	h.clients[c.userID][c] = true
	visible := h.store.visibleUserIDs(c.userID)
	onlineUsers := make([]string, 0, len(visible))
	for userID := range visible {
		if len(h.clients[userID]) > 0 {
			onlineUsers = append(onlineUsers, userID)
		}
	}
	h.mu.Unlock()
	payload, _ := json.Marshal(map[string][]string{"users": onlineUsers})
	c.enqueue(WSEvent{Type: "presence.snapshot", UserID: c.userID, Payload: payload})
	h.broadcastPresence(c.userID, "online")
}

func (h *Hub) remove(c *Client) {
	h.mu.Lock()
	if h.clients[c.userID] != nil {
		delete(h.clients[c.userID], c)
		if len(h.clients[c.userID]) == 0 {
			delete(h.clients, c.userID)
		}
	}
	_, stillOnline := h.clients[c.userID]
	h.mu.Unlock()
	close(c.send)
	if !stillOnline {
		h.broadcastPresence(c.userID, "offline")
	}
}

func (h *Hub) broadcastPresence(userID, status string) {
	payload, _ := json.Marshal(map[string]string{"user_id": userID, "status": status})
	event := WSEvent{Type: "presence.update", UserID: userID, Payload: payload}
	visibleRecipients := h.store.visibleUserIDs(userID)
	h.mu.RLock()
	defer h.mu.RUnlock()
	for recipient := range visibleRecipients {
		for client := range h.clients[recipient] {
			client.enqueue(event)
		}
	}
}

func (h *Hub) broadcastRoom(roomID string, event WSEvent) {
	h.store.mu.RLock()
	room := h.store.rooms[roomID]
	members := append([]string{}, room.Members...)
	h.store.mu.RUnlock()
	h.mu.RLock()
	defer h.mu.RUnlock()
	for _, member := range members {
		for client := range h.clients[member] {
			client.enqueue(event)
		}
	}
}

func (c *Client) readLoop() {
	defer func() {
		c.hub.remove(c)
		_ = c.conn.Close()
	}()
	c.conn.SetReadLimit(32 << 20)
	for {
		var event WSEvent
		if err := c.conn.ReadJSON(&event); err != nil {
			return
		}
		c.handle(event)
	}
}

func (c *Client) writeLoop() {
	for event := range c.send {
		_ = c.conn.WriteJSON(event)
	}
}

func (c *Client) enqueue(event WSEvent) {
	select {
	case c.send <- event:
	default:
	}
}

func (c *Client) handle(event WSEvent) {
	switch event.Type {
	case "message.send":
		var req struct {
			RoomID     string `json:"room_id"`
			Kind       string `json:"kind"`
			FileName   string `json:"file_name"`
			MimeType   string `json:"mime_type"`
			FileSize   int64  `json:"file_size"`
			Ciphertext string `json:"ciphertext"`
			Nonce      string `json:"nonce"`
			Alg        string `json:"alg"`
		}
		if json.Unmarshal(event.Payload, &req) != nil || req.RoomID == "" || req.Ciphertext == "" || req.Nonce == "" {
			return
		}
		if !c.hub.store.canAccessRoom(req.RoomID, c.userID) {
			return
		}
		if validateMessagePayload(req.Kind, req.FileSize) != "" {
			return
		}
		msg := c.hub.store.saveMessage(c.userID, req)
		payload, _ := json.Marshal(msg)
		c.hub.broadcastRoom(req.RoomID, WSEvent{Type: "message.new", RoomID: req.RoomID, UserID: c.userID, Payload: payload})
	case "receipt.read":
		var req struct {
			RoomID    string `json:"room_id"`
			MessageID string `json:"message_id"`
		}
		if json.Unmarshal(event.Payload, &req) != nil || req.RoomID == "" || req.MessageID == "" {
			return
		}
		if !c.hub.store.canAccessRoom(req.RoomID, c.userID) {
			return
		}
		c.hub.store.markRead(req.MessageID, c.userID)
		payload, _ := json.Marshal(map[string]string{"message_id": req.MessageID, "user_id": c.userID, "read_at": time.Now().UTC().Format(time.RFC3339)})
		c.hub.broadcastRoom(req.RoomID, WSEvent{Type: "receipt.read", RoomID: req.RoomID, UserID: c.userID, Payload: payload})
	case "typing":
		if !c.hub.store.canAccessRoom(event.RoomID, c.userID) {
			return
		}
		c.hub.broadcastRoom(event.RoomID, WSEvent{Type: "typing", RoomID: event.RoomID, UserID: c.userID, Payload: event.Payload})
	case "call.invite", "call.accept", "call.end", "call.signal":
		if !c.hub.store.canAccessRoom(event.RoomID, c.userID) {
			return
		}
		c.hub.broadcastRoom(event.RoomID, WSEvent{Type: event.Type, RoomID: event.RoomID, UserID: c.userID, Payload: event.Payload})
	}
}

func (s *Store) saveMessage(senderID string, req struct {
	RoomID     string `json:"room_id"`
	Kind       string `json:"kind"`
	FileName   string `json:"file_name"`
	MimeType   string `json:"mime_type"`
	FileSize   int64  `json:"file_size"`
	Ciphertext string `json:"ciphertext"`
	Nonce      string `json:"nonce"`
	Alg        string `json:"alg"`
}) Message {
	s.mu.Lock()
	defer s.mu.Unlock()
	msg := Message{
		ID:         randomID("msg"),
		RoomID:     req.RoomID,
		SenderID:   senderID,
		Kind:       firstNonEmpty(req.Kind, "text"),
		FileName:   req.FileName,
		MimeType:   req.MimeType,
		FileSize:   req.FileSize,
		Ciphertext: req.Ciphertext,
		Nonce:      req.Nonce,
		Alg:        req.Alg,
		CreatedAt:  time.Now().UTC().Format(time.RFC3339),
	}
	s.messages[req.RoomID] = append(s.messages[req.RoomID], msg)
	s.persistLocked()
	return msg
}

func (s *Store) markRead(messageID, userID string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.reads[messageID] == nil {
		s.reads[messageID] = map[string]string{}
	}
	s.reads[messageID][userID] = time.Now().UTC().Format(time.RFC3339)
	s.persistLocked()
}

func (s *Store) load() {
	if s.dataFile == "" {
		return
	}
	raw, err := os.ReadFile(s.dataFile)
	if err != nil {
		return
	}
	var data persistedState
	if json.Unmarshal(raw, &data) != nil {
		return
	}
	if data.Users != nil {
		s.users = data.Users
	}
	if data.Rooms != nil {
		s.rooms = data.Rooms
	}
	if data.Messages != nil {
		s.messages = data.Messages
	}
	if data.Reads != nil {
		s.reads = data.Reads
	}
	if data.Friends != nil {
		s.friends = data.Friends
	}
	migrated := false
	for id, user := range s.users {
		if user.PasswordHash == "" && user.Password != "" {
			if passwordHash, err := hashPassword(user.Password); err == nil {
				user.PasswordHash = passwordHash
				user.Password = ""
				s.users[id] = user
				migrated = true
			}
		}
	}
	if migrated {
		s.mu.Lock()
		s.persistLocked()
		s.mu.Unlock()
	}
}

func (s *Store) persistLocked() {
	if s.dataFile == "" {
		return
	}
	data := persistedState{
		Users:    s.users,
		Rooms:    s.rooms,
		Messages: s.messages,
		Reads:    s.reads,
		Friends:  s.friends,
	}
	raw, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		log.Printf("failed to encode messaging data: %v", err)
		return
	}
	if err := os.WriteFile(s.dataFile, raw, 0600); err != nil {
		log.Printf("failed to persist messaging data: %v", err)
	}
}

func (s *Store) userByToken(token string) (User, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	session, ok := s.sessions[token]
	if !ok {
		return User{}, false
	}
	if !session.ExpiresAt.IsZero() && time.Now().After(session.ExpiresAt) {
		delete(s.sessions, token)
		return User{}, false
	}
	user, ok := s.users[session.UserID]
	user = sanitizeUser(user)
	return user, ok
}

func (s *Store) auth(next func(http.ResponseWriter, *http.Request, User)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		auth := strings.TrimSpace(r.Header.Get("Authorization"))
		token := strings.TrimPrefix(auth, "Bearer ")
		user, ok := s.userByToken(token)
		if !ok {
			writeJSON(w, http.StatusUnauthorized, map[string]any{"ok": false, "message": "Sesi chat tidak valid."})
			return
		}
		next(w, r, user)
	}
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := strings.TrimSpace(r.Header.Get("Origin"))
		if origin != "" && isAllowedOrigin(r) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
		if r.Method == http.MethodOptions {
			if origin != "" && !isAllowedOrigin(r) {
				w.WriteHeader(http.StatusForbidden)
				return
			}
			w.WriteHeader(http.StatusNoContent)
			return
		}
		if isProtectedBrowserEndpoint(r) && !isAllowedOrigin(r) {
			writeJSON(w, http.StatusForbidden, map[string]any{"ok": false, "message": "Origin request tidak diizinkan."})
			return
		}
		next.ServeHTTP(w, r)
	})
}

func decodeJSON(w http.ResponseWriter, r *http.Request, dest any) bool {
	defer r.Body.Close()
	if err := json.NewDecoder(r.Body).Decode(dest); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "JSON tidak valid."})
		return false
	}
	return true
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func randomID(prefix string) string {
	buf := make([]byte, 10)
	_, _ = rand.Read(buf)
	return prefix + "_" + hex.EncodeToString(buf)
}

func normalizeID(value string) string {
	value = strings.ToLower(strings.TrimSpace(value))
	value = strings.ReplaceAll(value, " ", "-")
	return value
}

func normalizeRole(value string) string {
	role := strings.ToLower(strings.TrimSpace(value))
	if role == "" {
		return "fellow"
	}
	switch role {
	case "fellow", "mentor", "volunteer", "partner":
		return role
	default:
		return ""
	}
}

func hashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func verifyPassword(user User, password string) bool {
	if user.PasswordHash != "" {
		return bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)) == nil
	}
	return user.Password != "" && user.Password == password
}

func needsPasswordMigration(user User) bool {
	return user.PasswordHash == "" && user.Password != ""
}

func newSession(token, userID string) Session {
	return Session{Token: token, UserID: userID, ExpiresAt: time.Now().Add(sessionTTL)}
}

func (s *Store) areFriendsLocked(a, b string) bool {
	return s.friends[a] != nil && s.friends[a][b]
}

func (s *Store) canAccessRoom(roomID, userID string) bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	room, ok := s.rooms[roomID]
	return ok && contains(room.Members, userID)
}

func (s *Store) visibleUserIDs(userID string) map[string]bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	visible := map[string]bool{userID: true}
	for friendID := range s.friends[userID] {
		visible[friendID] = true
	}
	for _, room := range s.rooms {
		if !contains(room.Members, userID) {
			continue
		}
		for _, member := range room.Members {
			visible[member] = true
		}
	}
	return visible
}

func isStateChanging(method string) bool {
	return method == http.MethodPost || method == http.MethodPut || method == http.MethodPatch || method == http.MethodDelete
}

func isProtectedBrowserEndpoint(r *http.Request) bool {
	if r.URL.Path == "/healthz" || r.URL.Path == "/api/config" {
		return false
	}
	return strings.HasPrefix(r.URL.Path, "/api/") || strings.HasPrefix(r.URL.Path, "/ws") || isStateChanging(r.Method)
}

func isAllowedOrigin(r *http.Request) bool {
	origin := strings.TrimSpace(r.Header.Get("Origin"))
	if origin == "" {
		if getenv("HERAI_STRICT_ORIGIN", "true") == "false" {
			return true
		}
		return r.URL.Path == "/healthz"
	}
	allowed := strings.Split(getenv("HERAI_ALLOWED_ORIGINS", "http://127.0.0.1:3000,http://localhost:3000,https://her-ai.data-sorcerers.com,https://herai-signaling.onrender.com"), ",")
	for _, item := range allowed {
		if strings.TrimSpace(item) == origin {
			return true
		}
	}
	return false
}

func validateMessagePayload(kind string, fileSize int64) string {
	switch firstNonEmpty(kind, "text") {
	case "text":
		return ""
	case "image", "video", "document":
		if fileSize <= 0 {
			return "Metadata lampiran tidak lengkap."
		}
		if fileSize > maxAttachmentBytes {
			return "Ukuran file maksimal 8MB."
		}
		return ""
	default:
		return "Jenis pesan tidak didukung."
	}
}

func uniqueIDs(values []string) []string {
	seen := map[string]bool{}
	out := []string{}
	for _, value := range values {
		id := normalizeID(value)
		if id == "" || seen[id] {
			continue
		}
		seen[id] = true
		out = append(out, id)
	}
	return out
}

func contains(values []string, needle string) bool {
	for _, value := range values {
		if value == needle {
			return true
		}
	}
	return false
}

func sanitizeUser(user User) User {
	user.Password = ""
	user.PasswordHash = ""
	return user
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return value
		}
	}
	return ""
}

func getenv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
