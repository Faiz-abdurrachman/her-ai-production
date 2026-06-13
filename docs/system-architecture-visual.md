# Visual Arsitektur Sistem HerAI

Dokumen ini menggambarkan arsitektur sistem HerAI Fellowship 2026 yang dibangun di repo ini.

## 1. System Context

```mermaid
flowchart LR
    Participant["Peserta<br/>Browser / Mobile"]
    Admin["Admin / Panitia<br/>Browser"]
    SPA["HerAI SPA<br/>index.html + hash router"]
    Node["Node Gateway<br/>server.js"]
    GAS["Google Apps Script<br/>gas/Code.gs"]
    Sheets["Google Sheets Database"]
    GoSignal["Go Signaling Service<br/>signaling/main.go"]
    WebRTC["WebRTC P2P Media<br/>audio/video/screen"]
    STUN["STUN Servers"]
    Groq["Groq AI API<br/>AI prescreening"]
    LiveKit["LiveKit<br/>optional"]

    Participant -->|"akses halaman publik, register, announcement, competency, meeting"| SPA
    Admin -->|"akses dashboard admin"| SPA
    SPA -->|"POST /__gas atau direct GAS action"| Node
    Node -->|"proxy action"| GAS
    GAS -->|"read/write sheets"| Sheets
    GAS -->|"AI analysis jika API key ada"| Groq
    SPA -->|"WebSocket /ws"| GoSignal
    GoSignal -->|"room signaling: offer, answer, ICE, presence, chat"| SPA
    SPA <-->|"RTP/SRTP media P2P"| WebRTC
    WebRTC -.->|"ICE discovery"| STUN
    GoSignal -.->|"token/config jika enabled"| LiveKit
```

## 2. Layered Architecture

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        Router["js/router.js<br/>SPA routing + route guards"]
        PublicPages["pages/frontend/*<br/>Home, Register, Announcement, Profile, Meeting, Competency"]
        AdminPages["pages/dashboard/*<br/>Dashboard, Stage, Scoring, Bootcamp, Certificates, Assets"]
        ClientState["Browser Storage<br/>localStorage / sessionStorage"]
        Styles["css/* + components/*"]
    end

    subgraph FrontendLogic["Frontend Logic Layer"]
        RegisterJS["register.js"]
        AnnouncementJS["announcement.js"]
        CompetencyJS["competency-test.js"]
        MeetingJS["meeting.js"]
        DashboardJS["dashboard.js"]
        AdminModulesJS["admin-modules.js"]
        MainJS["main.js<br/>global settings client"]
    end

    subgraph Gateway["Gateway / Runtime Layer"]
        StaticServer["server.js static server"]
        GasProxy["/__gas proxy"]
        LocalFallback["Local fallback data<br/>.cursor/competency-sessions.json"]
        SettingsAPI["/__settings"]
    end

    subgraph Backend["Backend Services"]
        GAS["Google Apps Script actions"]
        Sheets["Google Sheets tables"]
        Signaling["Go WebSocket signaling<br/>/ws, /rooms, /meeting-config"]
    end

    subgraph External["External Services"]
        Groq["Groq API"]
        STUN["STUN servers"]
        LiveKit["LiveKit optional"]
    end

    Router --> PublicPages
    Router --> AdminPages
    PublicPages --> RegisterJS
    PublicPages --> AnnouncementJS
    PublicPages --> CompetencyJS
    PublicPages --> MeetingJS
    AdminPages --> DashboardJS
    AdminPages --> AdminModulesJS
    RegisterJS --> GasProxy
    AnnouncementJS --> GasProxy
    CompetencyJS --> GasProxy
    DashboardJS --> GasProxy
    AdminModulesJS --> GasProxy
    MainJS --> SettingsAPI
    MeetingJS --> Signaling
    GasProxy --> GAS
    GasProxy --> LocalFallback
    GAS --> Sheets
    GAS --> Groq
    MeetingJS -.-> STUN
    Signaling -.-> LiveKit
    ClientState --- PublicPages
    ClientState --- AdminPages
    Styles --- PublicPages
    Styles --- AdminPages
```

## 3. Data Store Map

```mermaid
erDiagram
    Participants {
        string rowId
        string nik
        string nama_lengkap
        string email
        string participant_stage
        string status_tahap_1
        string competency_status
        string bootcamp_status
        string final_project_status
        string certificate_status
    }

    Admins {
        string id_admin
        string password
        string peran_admin
        string nama_admin
        string permissions
        string status
    }

    AuditTrail {
        string timestamp
        string adminId
        string tindakan
        string perangkat
        string lokasi
    }

    Settings {
        string key
        string value
    }

    BootcampSessions {
        string session_id
        string title
        string session_date
        string mentor
        string meeting_url
        string status
    }

    FinalProjects {
        string project_id
        string nik
        string title
        string repo_url
        string status
    }

    CompetencyQuestions {
        string id
        string section
        string type
        string difficulty
        string question
        string answer
        number points
    }

    CompetencySessions {
        string session_id
        string nik
        string status
        number answered_count
        number score
        string answers
        string history_events
    }

    Certificates {
        string certificate_no
        string participant_rowId
        string nama_lengkap
        number final_score
        string status
        string certificate_url
    }

    Assets {
        string asset_id
        string title
        string type
        string url
        string visible_to
        string status
    }

    Participants ||--o{ CompetencySessions : takes
    Participants ||--o{ FinalProjects : submits
    Participants ||--o{ Certificates : receives
    Admins ||--o{ AuditTrail : writes
    Settings ||--o{ Participants : controls_stage
    BootcampSessions ||--o{ Assets : references
```

## 4. Main Operational Flow

```mermaid
flowchart TD
    Start["Peserta buka SPA"] --> Register["Registrasi<br/>#/register"]
    Register --> Submit["Submit form"]
    Submit --> GASRegister["GAS action: register"]
    GASRegister --> SheetParticipants["Participants sheet"]

    SheetParticipants --> AdminReview["Admin review<br/>#/dashboard / #/skoring"]
    AdminReview --> Prescreen["AI pre-screening<br/>optional Groq"]
    Prescreen --> Stage1["Decision tahap 1"]
    Stage1 --> Announcement1["Announcement stage 1"]

    Announcement1 --> Competency["Competency test<br/>#/competency-test"]
    Competency --> Session["CompetencySessions<br/>start, heartbeat, answers, submit"]
    Session --> Monitor["Admin monitor<br/>#/competency-monitor"]
    Monitor --> Stage2["Decision tahap 2"]

    Stage2 --> Bootcamp["Bootcamp + assets + meeting"]
    Bootcamp --> FinalProject["Final project submission"]
    FinalProject --> Certificate["Certificate generation"]
    Certificate --> Graduation["Announcement final / graduation"]
```

## 5. Admin Control Plane

```mermaid
flowchart LR
    Login["Admin login"]
    RBAC["RBAC permissions"]
    Stage["Stage Control"]
    Dashboard["Selection Dashboard"]
    Scoring["Skoring"]
    Fraud["Anti Fraud"]
    Comm["Communication Engine"]
    Meeting["Video Conference"]
    Bootcamp["Bootcamp Control"]
    Project["Final Project Tracker"]
    Cert["Certificate Manager"]
    Assets["Assets & Links"]
    Audit["Audit Trail"]
    Settings["Global Settings"]
    GAS["GAS / Sheets"]

    Login --> RBAC
    RBAC --> Dashboard
    RBAC --> Stage
    RBAC --> Scoring
    RBAC --> Fraud
    RBAC --> Comm
    RBAC --> Meeting
    RBAC --> Bootcamp
    RBAC --> Project
    RBAC --> Cert
    RBAC --> Assets
    Stage --> Settings
    Dashboard --> GAS
    Scoring --> GAS
    Fraud --> GAS
    Comm --> GAS
    Bootcamp --> GAS
    Project --> GAS
    Cert --> GAS
    Assets --> GAS
    Settings --> GAS
    GAS --> Audit
```

## 6. Deployment View

```mermaid
flowchart TB
    subgraph Local["Local Development"]
        LocalBrowser["Browser localhost"]
        LocalNode["node server.js<br/>static + /__gas + fallback"]
        LocalGo["go run ./signaling<br/>ws://127.0.0.1:8080/ws"]
        LocalFiles["Project files"]
    end

    subgraph Production["Production / Render"]
        Render["Render web service<br/>render.yaml"]
        PublicApp["Static public app<br/>hardened public build"]
        SignalProd["wss://herai-signaling.onrender.com/ws"]
    end

    subgraph Google["Google Workspace"]
        GAS["GAS Web App"]
        Sheets["Google Sheets"]
    end

    LocalBrowser --> LocalNode
    LocalNode --> LocalFiles
    LocalBrowser --> LocalGo
    LocalNode --> GAS
    Render --> PublicApp
    Render --> SignalProd
    PublicApp --> GAS
    SignalProd --> GAS
    GAS --> Sheets
```

## 7. Ringkasan Tanggung Jawab Komponen

| Komponen | Tanggung jawab |
| --- | --- |
| `index.html` + `js/router.js` | Entry point SPA, hash routing, route guard, load partial page. |
| `pages/frontend/*` | UI peserta dan halaman publik. |
| `pages/dashboard/*` | UI admin control panel. |
| `js/frontend/*` | Logic peserta: register, announcement, profile, meeting, competency, projects. |
| `js/dashboard/*` | Logic admin: login, selection, scoring, monitor, modules, audit. |
| `server.js` | Static server, `/__gas` proxy, `/__settings`, fallback lokal untuk beberapa action. |
| `gas/Code.gs` | Backend utama berbasis Google Apps Script untuk action dan schema Sheets. |
| Google Sheets | Database operasional: peserta, admin, settings, competency, assets, certificates. |
| `signaling/main.go` | WebSocket signaling video conference, room monitor, LiveKit token/config optional. |
| `render.yaml` | Build/deploy service Go + public static app ke Render. |

