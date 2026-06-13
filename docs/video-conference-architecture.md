# Arsitektur Video Conference HerAI

Dokumen ini hanya membahas arsitektur fitur **Video Conference** yang ada di sistem HerAI.

## 1. High-Level Architecture

```mermaid
flowchart LR
    Admin["Admin Browser<br/>#/video-conference"]
    ParticipantA["Participant Browser A<br/>#/meeting"]
    ParticipantB["Participant Browser B<br/>#/meeting"]
    Signal["Go Signaling Server<br/>Gorilla WebSocket<br/>/ws"]
    RoomAPI["Room Monitor API<br/>/rooms"]
    ConfigAPI["Meeting Config API<br/>/meeting-config"]
    MediaAPI["Browser Media APIs<br/>getUserMedia / getDisplayMedia"]
    STUN["STUN Servers<br/>Google + Cloudflare"]
    LiveKit["LiveKit<br/>optional jika env aktif"]
    PionSFU["Pion SFU Code Path<br/>tersedia, flag client off"]

    Admin -->|"generate room, copy invite"| ParticipantA
    Admin -->|"GET /rooms"| RoomAPI
    RoomAPI --> Signal

    Admin -->|"WS signaling"| Signal
    ParticipantA -->|"WS signaling"| Signal
    ParticipantB -->|"WS signaling"| Signal

    Admin --> MediaAPI
    ParticipantA --> MediaAPI
    ParticipantB --> MediaAPI

    Admin -.->|"ICE discovery"| STUN
    ParticipantA -.->|"ICE discovery"| STUN
    ParticipantB -.->|"ICE discovery"| STUN

    Admin <-->|"WebRTC RTP/SRTP P2P media"| ParticipantA
    Admin <-->|"WebRTC RTP/SRTP P2P media"| ParticipantB
    ParticipantA <-->|"WebRTC RTP/SRTP P2P media"| ParticipantB

    ParticipantA -->|"GET /meeting-config"| ConfigAPI
    ConfigAPI -.->|"transport=livekit jika env lengkap"| LiveKit
    Signal -.->|"sfu-* experimental path"| PionSFU
```

**Jalur aktif default:** WebRTC **P2P mesh**.  
**Fungsi server Go:** signaling, room registry, monitoring room, optional LiveKit token/config, optional SFU path.  
**Media audio/video:** tidak lewat WebSocket; media berjalan langsung antar browser lewat WebRTC.

## 2. Protocol Stack Punya Kita

Diagram ini adalah versi HerAI dari contoh protocol stack WebRTC yang kamu kirim.

```mermaid
flowchart TB
    subgraph Signalling["SIGNALLING / CONTROL PLANE"]
        direction TB
        SApp["HerAI JSON Signal<br/>type: joined, peer-info, presence,<br/>offer, answer, ice, chat, emoji,<br/>screen-start, screen-stop"]
        STransport["WebSocket WSS / WS<br/>/ws?room=ROOM&clientId=ID"]
        SHttp["HTTP/HTTPS<br/>/rooms, /meeting-config, /livekit-token"]
        STls["TLS<br/>wss:// atau https:// di production"]
        STcp["TCP"]
        SIp["IPv4 / IPv6"]

        SApp --> STransport
        SApp --> SHttp
        STransport --> STls
        SHttp --> STls
        STls --> STcp
        STcp --> SIp
    end

    subgraph Media["MEDIA PLANE"]
        direction TB
        MApp["Camera / Mic / Screen Track<br/>getUserMedia + getDisplayMedia"]
        Codec["Browser-negotiated Codec<br/>audio: Opus umum<br/>video: VP8/H264 tergantung browser"]
        RTP["SRTP / SRTCP<br/>encrypted audio-video media"]
        Data["SCTP DataChannel<br/>tidak dipakai di default P2P HerAI"]
        Dtls["DTLS / DTLS-SRTP"]
        Ice["ICE + STUN<br/>Google STUN + Cloudflare STUN<br/>TURN belum dikonfigurasi default"]
        MUdp["UDP preferred<br/>TCP fallback tergantung browser/network"]
        MIp["IPv4 / IPv6"]

        MApp --> Codec
        Codec --> RTP
        Data -. optional .-> Dtls
        RTP --> Dtls
        Dtls --> Ice
        Ice --> MUdp
        MUdp --> MIp
    end

    SApp -. "SDP offer/answer + ICE candidate dikirim sebagai payload JSON" .-> Codec
```

Ringkasnya:

| Area | Punya HerAI |
| --- | --- |
| Signaling transport | `WebSocket` lewat endpoint `/ws`. Production memakai `wss://`. |
| Signaling payload | JSON custom berisi `offer`, `answer`, `ice`, `presence`, `chat`, `emoji`, dan event screen share. |
| SDP | Dibuat browser lewat `RTCPeerConnection.createOffer()` / `createAnswer()`, lalu dikirim via WebSocket. |
| ICE | Candidate dikirim via WebSocket type `ice`; STUN default: Google dan Cloudflare. |
| TURN | Belum ada default TURN server di kode. Bisa ditambahkan lewat env `HERAI_ICE_SERVERS`. |
| Media | WebRTC P2P mesh antar browser, bukan lewat server Go. |
| Media encryption | WebRTC memakai DTLS-SRTP, sehingga audio/video terenkripsi antar peer. |
| Codec | Tidak dipaksa manual; dinegosiasikan browser. Umumnya Opus untuk audio, VP8/H264 untuk video. |
| SCTP/DataChannel | Tidak dipakai di mode P2P default. Chat, emoji, dan presence dikirim lewat WebSocket signaling. |
| LiveKit optional | Kalau LiveKit aktif, data meeting bisa lewat LiveKit data publish dan media lewat LiveKit SFU. |

## 3. Protocol Flow P2P

```mermaid
sequenceDiagram
    autonumber
    participant A as Peer A Browser
    participant WS as Go WebSocket Signaling
    participant B as Peer B Browser
    participant STUN as STUN Server

    A->>WS: connect /ws?room=ROOM&clientId=A
    B->>WS: connect /ws?room=ROOM&clientId=B
    WS-->>B: joined { peers: ["A"] }
    WS-->>A: peer-joined from B

    B->>WS: peer-info / presence
    WS-->>A: peer-info / presence
    A->>WS: peer-info / presence
    WS-->>B: peer-info / presence

    A->>A: createOffer()
    A->>WS: offer { type: "offer", sdp: "v=0..." }
    WS-->>B: offer from A
    B->>B: setRemoteDescription(offer)
    B->>B: createAnswer()
    B->>WS: answer { type: "answer", sdp: "v=0..." }
    WS-->>A: answer from B
    A->>A: setRemoteDescription(answer)

    A->>STUN: ICE discovery
    B->>STUN: ICE discovery
    A->>WS: ice candidate
    WS-->>B: ice candidate
    B->>WS: ice candidate
    WS-->>A: ice candidate

    A<<->>B: SRTP/SRTCP media P2P
```

## 4. Network Path Yang Sebenarnya

```mermaid
flowchart LR
    A["Peer A Browser"]
    B["Peer B Browser"]
    Go["Go Signaling Server<br/>/ws"]
    STUN["STUN Server"]

    A -. "WSS: JSON signaling<br/>SDP + ICE + presence + chat" .-> Go
    B -. "WSS: JSON signaling<br/>SDP + ICE + presence + chat" .-> Go
    A -. "STUN binding request" .-> STUN
    B -. "STUN binding request" .-> STUN
    A == "WebRTC media<br/>SRTP/SRTCP over ICE" ==> B
```

Jadi server Go **tidak menjadi media relay** pada mode default. Kalau NAT peserta tidak bisa ditembus STUN dan tidak ada TURN, koneksi media bisa gagal walaupun WebSocket signaling berhasil.

## 5. Komponen Yang Dibangun

```mermaid
flowchart TB
    subgraph AdminSide["Admin Side"]
        VCPage["pages/dashboard/video-conference.html"]
        AdminModule["js/dashboard/admin-modules.js<br/>initVideoConference()"]
        AdminLocalStorage["localStorage<br/>herai_admin_meeting_rooms"]
    end

    subgraph ParticipantSide["Participant Side"]
        MeetingPage["pages/frontend/meeting.html"]
        MeetingJS["js/frontend/meeting.js<br/>initMeetingRoom()"]
        ParticipantStorage["localStorage/sessionStorage<br/>name, signal URL, client ID"]
    end

    subgraph ServerSide["Server Side"]
        GoServer["signaling/main.go"]
        Hub["Hub<br/>rooms map"]
        WS["/ws<br/>WebSocket"]
        Rooms["/rooms<br/>GET room list<br/>DELETE room"]
        Config["/meeting-config<br/>transport + ICE servers"]
        Token["/livekit-token<br/>optional LiveKit JWT"]
    end

    subgraph BrowserRuntime["Browser Runtime"]
        Camera["Camera + Microphone"]
        Screen["Screen Share"]
        RTCPeer["RTCPeerConnection"]
        DataUI["Chat, emoji, presence UI"]
    end

    VCPage --> AdminModule
    AdminModule --> AdminLocalStorage
    AdminModule --> WS
    AdminModule --> Rooms

    MeetingPage --> MeetingJS
    MeetingJS --> ParticipantStorage
    MeetingJS --> WS
    MeetingJS --> Config
    MeetingJS -.-> Token
    MeetingJS --> Camera
    MeetingJS --> Screen
    MeetingJS --> RTCPeer
    MeetingJS --> DataUI

    WS --> GoServer
    Rooms --> GoServer
    Config --> GoServer
    Token --> GoServer
    GoServer --> Hub
```

## 6. Admin Generate Room

```mermaid
sequenceDiagram
    autonumber
    participant Admin as Admin Dashboard
    participant LS as localStorage
    participant API as Go Server /rooms
    participant User as Participant

    Admin->>Admin: Klik Generate Room
    Admin->>Admin: generateHeraiRoomCode()
    Admin->>Admin: format ROOM menjadi XXXX-XXXX-XXXX
    Admin->>Admin: build invite URL
    Note over Admin: #/meeting?room=ROOM&title=TITLE&signal=WSS_URL
    Admin->>LS: simpan room ke herai_admin_meeting_rooms
    Admin->>API: GET /rooms setiap 5 detik
    API-->>Admin: daftar room aktif + jumlah client
    Admin-->>User: Copy link atau room code
```

## 7. Participant Join Room

```mermaid
sequenceDiagram
    autonumber
    participant P as Participant Browser
    participant Media as Browser Media API
    participant Config as /meeting-config
    participant WS as /ws Signaling Server
    participant Peer as Existing Peer
    participant STUN as STUN

    P->>P: Baca room, title, signal dari URL
    P->>Media: getUserMedia({audio, video})
    Media-->>P: localStream
    P->>Config: GET /meeting-config
    Config-->>P: transport + iceServers
    P->>WS: connect /ws?room=ROOM&clientId=CLIENT_ID
    WS-->>P: joined { clientId, peers }
    WS-->>Peer: peer-joined
    P->>Peer: peer-info + presence via WS
    Peer->>P: peer-info + presence via WS
    P->>STUN: kumpulkan ICE candidates
    Peer->>STUN: kumpulkan ICE candidates
    P->>Peer: offer / answer / ice via WS
    P<<->>Peer: media audio/video via WebRTC P2P
```

## 8. Signaling Server Flow

```mermaid
flowchart TD
    Connect["Client connect<br/>/ws?room=ROOM&clientId=ID"]
    Validate["Validasi room + clientId"]
    Join["hub.join(client)"]
    CreateRoom["Create room jika belum ada"]
    SendJoined["Send joined ke client baru<br/>payload.peers = existing clients"]
    NotifyOld["Broadcast peer-joined ke client lama"]
    ReadPump["client.readPump()"]
    Direct["Jika to != empty<br/>forward ke target peer"]
    Broadcast["Jika to empty<br/>broadcast ke semua peer di room"]
    PeerList["peer-list-request<br/>server balas peer-list"]
    SFU["Jika type sfu-*<br/>handleSFUMessage()"]
    Leave["disconnect / close"]
    Cleanup["hub.leave(client)<br/>hapus client + track milik client"]
    NotifyLeft["broadcast peer-left"]
    DeleteRoom["hapus room jika kosong"]

    Connect --> Validate --> Join
    Join --> CreateRoom --> SendJoined --> ReadPump
    Join --> NotifyOld --> ReadPump
    ReadPump --> PeerList
    ReadPump --> SFU
    ReadPump --> Direct
    ReadPump --> Broadcast
    ReadPump --> Leave --> Cleanup --> NotifyLeft --> DeleteRoom
```

## 9. P2P Mesh Media Topology

```mermaid
flowchart LR
    A["Peer A"]
    B["Peer B"]
    C["Peer C"]
    S["Signaling Server<br/>control plane only"]

    A -.->|"offer/answer/ice"| S
    B -.->|"offer/answer/ice"| S
    C -.->|"offer/answer/ice"| S

    A <-->|"media stream"| B
    A <-->|"media stream"| C
    B <-->|"media stream"| C
```

Dalam mode default, setiap peer membuat koneksi WebRTC ke setiap peer lain. Kalau ada 3 peserta, terbentuk 3 koneksi media. Kalau ada 4 peserta, terbentuk 6 koneksi media.

## 10. Payload WebSocket

Envelope umum:

```json
{
  "type": "presence",
  "room": "ABCD-EFGH-JK2M",
  "from": "diisi server",
  "to": "target-peer-id atau kosong",
  "payload": {}
}
```

Payload yang dipakai:

| Type | Arah | Fungsi | Payload |
| --- | --- | --- | --- |
| `joined` | server -> client baru | client berhasil masuk room | `{ "clientId": "...", "peers": ["peer-id"] }` |
| `peer-joined` | server -> peer lama | notifikasi peer baru masuk | kosong |
| `peer-left` | server -> peer lain | notifikasi peer keluar | kosong |
| `peer-info` | client -> peer/broadcast | sinkron nama peserta | `{ "name": "Nama" }` |
| `presence` | client -> peer/broadcast | status peserta | `{ "id": "...", "name": "...", "mic": true, "camera": true, "hand": false, "screen": false }` |
| `peer-list-request` | client -> server | audit mesh berkala | `{ "name": "Nama" }` |
| `peer-list` | server -> client | daftar peer aktif | `{ "peers": ["peer-id"] }` |
| `offer` | client -> peer | SDP offer WebRTC | `{ "type": "offer", "sdp": "v=0..." }` |
| `answer` | client -> peer | SDP answer WebRTC | `{ "type": "answer", "sdp": "v=0..." }` |
| `ice` | client -> peer | ICE candidate | `{ "candidate": "...", "sdpMid": "0", "sdpMLineIndex": 0 }` |
| `media-reconnect` | client -> peer | minta renegosiasi media | `{ "name": "Nama" }` |
| `screen-start` | client -> broadcast | mulai screen share | `{ "name": "Nama", "streamId": "..." }` |
| `screen-stop` | client -> broadcast | stop screen share | `{ "name": "Nama" }` |
| `chat` | client -> broadcast | pesan chat | `{ "name": "Nama", "text": "pesan", "at": "2026-05-21T..." }` |
| `emoji` | client -> broadcast | reaction | `{ "emoji": "👍", "name": "Nama" }` |
| `room-deleted` | server -> room clients | admin menutup room | `{ "message": "Room ditutup oleh admin" }` |

## 11. HTTP API Video Conference

```mermaid
flowchart LR
    Admin["Admin Dashboard"] -->|"GET /rooms"| RoomsList["List active rooms"]
    Admin -->|"DELETE /rooms?room=ROOM"| RoomsDelete["Delete active room"]
    Meeting["Meeting Page"] -->|"GET /meeting-config"| Config["Transport + ICE servers"]
    Meeting -.->|"GET /livekit-token"| Token["LiveKit token optional"]

    RoomsList --> Go["Go Server"]
    RoomsDelete --> Go
    Config --> Go
    Token --> Go
```

Contoh response `/meeting-config`:

```json
{
  "ok": true,
  "transport": "p2p",
  "livekit": {
    "enabled": false,
    "url": ""
  },
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" },
    { "urls": "stun:stun1.l.google.com:19302" },
    { "urls": "stun:stun.cloudflare.com:3478" }
  ]
}
```

Contoh response `/rooms`:

```json
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

## 12. Screen Share Flow

```mermaid
sequenceDiagram
    autonumber
    participant A as Presenter
    participant Media as getDisplayMedia
    participant WS as Signaling Server
    participant B as Peer

    A->>Media: getDisplayMedia({ video: true, audio: false })
    Media-->>A: screenStream + screenTrack
    A->>A: addTrack(screenTrack) ke semua RTCPeerConnection
    A->>B: screen-start via WS
    A->>B: renegotiate offer/answer via WS
    A-->>B: screen media via WebRTC
    A->>A: screenTrack.onended
    A->>B: screen-stop via WS
    A->>B: renegotiate tanpa screen track
```

## 13. Mode Transport

```mermaid
flowchart TD
    LoadConfig["Meeting load /meeting-config"]
    IsLiveKit{"LIVEKIT_URL + API key + secret ada?"}
    LiveKitMode["LiveKit mode<br/>SFU managed by LiveKit"]
    P2PMode["P2P mode default<br/>browser-to-browser mesh"]
    ClientFlag{"USE_SFU_TRANSPORT true?"}
    PionMode["Pion SFU mode<br/>kode server ada, client flag saat ini false"]

    LoadConfig --> IsLiveKit
    IsLiveKit -- yes --> LiveKitMode
    IsLiveKit -- no --> ClientFlag
    ClientFlag -- false --> P2PMode
    ClientFlag -- true --> PionMode
```

Status saat ini:

- `USE_SFU_TRANSPORT = false` di `js/frontend/meeting.js`, jadi Pion SFU tidak aktif dari client.
- Jika env LiveKit lengkap, `/meeting-config` mengembalikan `transport: "livekit"` dan client memakai LiveKit.
- Jika LiveKit tidak aktif, client memakai P2P mesh.

## 14. Deployment Video Conference

```mermaid
flowchart TB
    subgraph Local["Local Development"]
        LocalSPA["SPA localhost<br/>node server.js / static server"]
        LocalSignal["Go signaling local<br/>ws://127.0.0.1:8080/ws"]
        LocalBrowser["Admin + peserta browser"]
    end

    subgraph Production["Production"]
        StaticApp["Static SPA hosting"]
        RenderSignal["Render Go service<br/>wss://herai-signaling.onrender.com/ws"]
        RoomMonitor["/rooms"]
        Config["/meeting-config"]
    end

    LocalBrowser --> LocalSPA
    LocalBrowser --> LocalSignal
    StaticApp --> RenderSignal
    RenderSignal --> RoomMonitor
    RenderSignal --> Config
```

## 15. File Utama

| File | Peran |
| --- | --- |
| `pages/dashboard/video-conference.html` | UI admin untuk generate room, copy link, status signaling, room monitor. |
| `js/dashboard/admin-modules.js` | Logic admin video conference: generate room, connect manual media, monitor `/rooms`, delete room. |
| `pages/frontend/meeting.html` | UI peserta meeting: join, preview, video grid, chat, people, controls. |
| `js/frontend/meeting.js` | Core WebRTC client: media, WebSocket signaling, peer connection, presence, chat, emoji, screen share. |
| `signaling/main.go` | Go server: WebSocket hub, room lifecycle, `/rooms`, `/meeting-config`, `/livekit-token`, optional SFU relay. |
| `render.yaml` | Build dan deploy Go signaling service + public static app ke Render. |
