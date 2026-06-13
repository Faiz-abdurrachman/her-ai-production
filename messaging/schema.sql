CREATE TABLE chat_users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  public_key JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('direct', 'group')),
  created_by TEXT NOT NULL REFERENCES chat_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE chat_room_members (
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES chat_users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  key_packet JSONB,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_read_message_id UUID,
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL REFERENCES chat_users(id),
  ciphertext TEXT NOT NULL,
  nonce TEXT NOT NULL,
  alg TEXT NOT NULL DEFAULT 'AES-GCM-256',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE chat_message_reads (
  message_id UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES chat_users(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, user_id)
);

CREATE INDEX idx_chat_messages_room_time ON chat_messages(room_id, created_at);
CREATE INDEX idx_chat_room_members_user ON chat_room_members(user_id);
