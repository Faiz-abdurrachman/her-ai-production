# Video Conference Communication Network

Dokumen ini merangkum alur komunikasi fitur video conference yang sudah ada di HerAI.

## Ringkasan Komponen

```mermaid
flowchart LR
    Admin["Admin Dashboard<br/>#/video-conference"]
    Participant["Participant Meeting UI<br/>#/meeting"]
    BrowserMedia["Browser Media API<br/>getUserMedia / getDisplayMedia"]
    Signal["Go Signaling Server<br/>/ws, /rooms, /meeting-config"]
    STUN["STUN Servers<br/>Google + Cloudflare"]
    LiveKit["LiveKit Server<br/>optional, jika env lengkap"]
    Pion["Pion SFU in Go<br/>ada di server, client flag off"]

    Admin -->|"Generate room + copy invite link"| Participant
    Admin -->|"WebSocket signaling"| Signal
    Participant -->|"WebSocket signaling"| Signal
    Admin -->|"camera/mic tracks"| BrowserMedia
    Participant -->|"camera/mic/screen tracks"| BrowserMedia
    Admin -.->|"ICE discovery"| STUN
    Participant -.->|"ICE discovery"| STUN
    Admin <-->|"WebRTC media RTP/SRTP P2P"| Participant
    Participant -.->|"config/token only if enabled"| LiveKit
    Participant -.->|"sfu-* signaling only if USE_SFU_TRANSPORT true"| Pion
```

Jalur aktif default saat ini adalah **P2P mesh WebRTC**: server Go hanya menyimpan room dan meneruskan pesan signaling, sedangkan audio/video berjalan langsung antar browser.

## Alur Admin Membuat Room

```mermaid
sequenceDiagram
    autonumber
    participant A as Admin Dashboard
    participant LS as localStorage
    participant S as Signaling Server
    participant P as Participant

    A->>A: Klik Generate Room
    A->>A: generateHeraiRoomCode() 12 karakter
    A->>LS: Simpan herai_admin_meeting_rooms
    A->>A: Buat inviteUrl()
    Note over A: /#/meeting?room=ROOM&title=TITLE&signal=wss%3A%2F%2F...%2Fws
    A-->>P: Copy Link / Room Code
    A->>S: GET /rooms setiap 5 detik
    S-->>A: { ok, rooms: [{ room, clients, peers, transport }] }
```

## Alur Peserta Join Room P2P

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser Peserta Baru
    participant M as Media Devices
    participant S as Go Signaling /ws
    participant E as Existing Peer
    participant STUN as STUN Servers

    B->>M: getUserMedia({ audio, video })
    M-->>B: localStream
    B->>S: WebSocket connect /ws?room=ROOM&clientId=CLIENT_ID
    S-->>B: joined { clientId, peers }
    S-->>E: peer-joined from CLIENT_ID
    B->>E: peer-info + presence via S
    E->>B: peer-info + presence via S
    B->>STUN: ICE candidate discovery
    E->>STUN: ICE candidate discovery
    B->>E: offer / answer / ice via S
    B<<->>E: WebRTC media RTP/SRTP P2P
```

## Alur Signaling P2P Detail

```mermaid
flowchart TD
    Join["Client connect<br/>/ws?room=ROOM&clientId=ID"]
    ServerJoin["hub.join(client)"]
    Joined["Send to new client:<br/>type=joined<br/>payload.peers=[existing ids]"]
    Notify["Broadcast to old clients:<br/>type=peer-joined<br/>from=new id"]
    Mesh["Client ensurePeerReady(peer)"]
    Info["peer-info + presence"]
    SDP["offer / answer"]
    ICE["ice candidates"]
    Media["Browser-to-browser media"]
    Audit["Every 5s mesh audit:<br/>peer-list-request, peer-list, presence"]
    Leave["Socket close / leaveMeeting"]
    Left["Broadcast peer-left"]

    Join --> ServerJoin --> Joined --> Mesh
    ServerJoin --> Notify --> Mesh
    Mesh --> Info --> SDP --> ICE --> Media
    Audit --> Mesh
    Leave --> Left
```

## Payload WebSocket

Semua pesan WebSocket memakai envelope dasar:

```json
{
  "type": "offer",
  "room": "ABCD-EFGH-JK2M",
  "from": "diisi server dari clientId",
  "to": "target-client-id atau kosong untuk broadcast",
  "payload": {}
}
```

Payload utama yang dipakai client:

| Type | Arah | Payload |
| --- | --- | --- |
| `joined` | server -> client baru | `{ "clientId": "...", "peers": ["peer-id"] }` |
| `peer-joined` | server -> peer lama | kosong, `from` berisi client baru |
| `peer-left` | server -> peer lain | kosong |
| `peer-info` | client -> peer/broadcast | `{ "name": "Nama Tampilan" }` |
| `presence` | client -> peer/broadcast | `{ "id": "...", "name": "...", "mic": true, "camera": true, "hand": false, "screen": false }` |
| `peer-list-request` | client -> server | `{ "name": "Nama Tampilan" }` |
| `peer-list` | server -> client | `{ "peers": ["peer-id"] }` |
| `offer` | client -> peer | `RTCSessionDescription`, contoh `{ "type": "offer", "sdp": "v=0..." }` |
| `answer` | client -> peer | `RTCSessionDescription`, contoh `{ "type": "answer", "sdp": "v=0..." }` |
| `ice` | client -> peer | `RTCIceCandidate`, contoh `{ "candidate": "...", "sdpMid": "0", "sdpMLineIndex": 0 }` |
| `media-reconnect` | client -> peer | `{ "name": "Nama Tampilan" }` |
| `screen-start` | client -> broadcast | `{ "name": "Nama Tampilan", "streamId": "..." }` |
| `screen-stop` | client -> broadcast | `{ "name": "Nama Tampilan" }` |
| `chat` | client -> broadcast | `{ "name": "Nama Tampilan", "text": "pesan", "at": "ISO timestamp" }` |
| `emoji` | client -> broadcast | `{ "emoji": "👍", "name": "Nama Tampilan" }` |
| `room-deleted` | server -> room clients | `{ "message": "Room ditutup oleh admin" }` |

## Endpoint HTTP

```mermaid
flowchart LR
    Admin["Admin Dashboard"] -->|"GET /rooms"| Rooms["Room Monitor"]
    Admin -->|"DELETE /rooms?room=ROOM"| Delete["Delete active room"]
    Meeting["Meeting UI"] -->|"GET /meeting-config"| Config["Transport + ICE config"]
    Meeting -->|"GET /livekit-token?room=&identity=&name="| Token["LiveKit JWT, optional"]
```

Payload HTTP penting:

```json
// GET /meeting-config
{
  "ok": true,
  "transport": "p2p",
  "livekit": { "enabled": false, "url": "" },
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" },
    { "urls": "stun:stun1.l.google.com:19302" },
    { "urls": "stun:stun.cloudflare.com:3478" }
  ]
}
```

```json
// GET /rooms
{
  "ok": true,
  "rooms": [
    {
      "room": "ABCD-EFGH-JK2M",
      "clients": 2,
      "peers": ["client-a", "client-b"],
      "transport": "websocket"
    }
  ]
}
```

```json
// GET /livekit-token, jika LIVEKIT_URL/API_KEY/API_SECRET tersedia
{
  "ok": true,
  "url": "wss://livekit.example.com",
  "token": "jwt"
}
```

## Apa Yang Dibangun

- Admin room generator di `#/video-conference`: membuat Room ID 12 karakter, invite link, menyimpan daftar room di `localStorage`, monitor room via `/rooms`, dan bisa delete room aktif.
- Meeting room UI di `#/meeting`: preview kamera/mic, join room, grid video, participants panel, chat, emoji reaction, raise hand, mic/camera toggle, screen share, active speaker indicator, reconnect/watchdog.
- Signaling server Go: WebSocket `/ws`, room hub, broadcast/direct routing, ping/pong, room list `/rooms`, delete room, `/meeting-config`, `/livekit-token`, optional static app serving.
- WebRTC P2P mesh default: setiap peserta membuat `RTCPeerConnection` ke peer lain, memakai STUN untuk ICE, lalu media berjalan langsung antar browser.
- Optional LiveKit path: aktif otomatis kalau env `LIVEKIT_URL`, `LIVEKIT_API_KEY`, dan `LIVEKIT_API_SECRET` tersedia.
- Optional Pion SFU path: server sudah punya handler `sfu-offer`, `sfu-answer`, `sfu-ice`, dan relay RTP track, tetapi client saat ini menyetel `USE_SFU_TRANSPORT = false`.
