# HerAI QA Smoke Report

Generated: 2026-06-14T17:37:02.314Z

## Summary

- PASS: 44
- WARN: 6
- FAIL: 1
- Frontend URL: http://127.0.0.1:3000
- Messaging URL: http://127.0.0.1:8091
- Signaling URL: http://127.0.0.1:8080
- GAS live check: skipped

## Release Gate

Status: BLOCKED

Masih ada FAIL yang harus diperbaiki sebelum dianggap aman untuk deploy.

## Failed Checks

- Go Services / signaling: go test ./...: # github.com/pion/webrtc/v4
compile: writing output: write $WORK/b190/_pkg_.a: no space left on device

## Warnings

- Runtime Endpoint / Frontend http://127.0.0.1:3000: Not reachable or not OK: 0 fetch failed
- Runtime Endpoint / Messaging http://127.0.0.1:8091/healthz: Not reachable or not OK: 0 fetch failed
- Runtime Endpoint / Messaging http://127.0.0.1:8091/api/config: Not reachable or not OK: 0 fetch failed
- Runtime Endpoint / Signaling http://127.0.0.1:8080/healthz: Not reachable or not OK: 0 fetch failed
- Runtime Endpoint / Signaling http://127.0.0.1:8080/meeting-config: Not reachable or not OK: 0 fetch failed
- Runtime Endpoint / GAS Web App: GAS_WEB_APP_URL not provided in environment; skipped live GAS check

## Detailed Results

| Area | Check | Status | Detail |
|---|---|---|---|
| Required Files | index.html | PASS | Found |
| Required Files | server.js | PASS | Found |
| Required Files | render.yaml | PASS | Found |
| Required Files | gas/Code.gs | PASS | Found |
| Required Files | js/router.js | PASS | Found |
| Required Files | components/navbar.html | PASS | Found |
| Required Files | components/sidebar.html | PASS | Found |
| Required Files | components/footer.html | PASS | Found |
| Required Files | messaging/main.go | PASS | Found |
| Required Files | signaling/main.go | PASS | Found |
| Required Files | docs/DEVELOPER_HANDOVER_AND_ROADMAP.md | PASS | Found |
| Required Files | docs/DEVELOPER_HANDOVER_AND_ROADMAP.pdf | PASS | Found |
| Required Files | docs/HerAI_Developer_Prompt_Templates.pdf | PASS | Found |
| SPA Routes | Route count | PASS | 41 routes detected |
| SPA Routes | Every route points to existing HTML | PASS | All route files exist |
| JavaScript Syntax | js/dashboard/admin-modules.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/ai-prescreening.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/audit-trail.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/competency-monitor.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/dashboard.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/data-visualization.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/retest-monitor.js | PASS | Syntax OK |
| JavaScript Syntax | js/dashboard/skoring.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/announcement.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/competency-test.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/data-penduduk.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/fellow-dashboard/settings.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/meeting.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/messaging.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/profile.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/projects.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/register.js | PASS | Syntax OK |
| JavaScript Syntax | js/frontend/twibbon.js | PASS | Syntax OK |
| JavaScript Syntax | js/main.js | PASS | Syntax OK |
| JavaScript Syntax | js/router.js | PASS | Syntax OK |
| JavaScript Syntax | server.js | PASS | Syntax OK |
| Go Services | messaging: go test ./... | PASS | ?   	herai-messaging	[no test files] |
| Go Services | signaling: go test ./... | FAIL | # github.com/pion/webrtc/v4<br>compile: writing output: write $WORK/b190/_pkg_.a: no space left on device |
| GAS | Sheet registry count | PASS | 58 sheets detected |
| GAS | Action route count | PASS | 44 actions detected |
| GAS | Duplicate actions | PASS | None |
| GAS | Critical actions available | PASS | All critical actions found |
| Documentation | docs/DEVELOPER_HANDOVER_AND_ROADMAP.md | PASS | 21 KB |
| Documentation | docs/DEVELOPER_HANDOVER_AND_ROADMAP.pdf | PASS | 36 KB |
| Documentation | docs/HerAI_Developer_Prompt_Templates.pdf | PASS | 15 KB |
| Runtime Endpoint | Frontend http://127.0.0.1:3000 | WARN | Not reachable or not OK: 0 fetch failed |
| Runtime Endpoint | Messaging http://127.0.0.1:8091/healthz | WARN | Not reachable or not OK: 0 fetch failed |
| Runtime Endpoint | Messaging http://127.0.0.1:8091/api/config | WARN | Not reachable or not OK: 0 fetch failed |
| Runtime Endpoint | Signaling http://127.0.0.1:8080/healthz | WARN | Not reachable or not OK: 0 fetch failed |
| Runtime Endpoint | Signaling http://127.0.0.1:8080/meeting-config | WARN | Not reachable or not OK: 0 fetch failed |
| Runtime Endpoint | GAS Web App | WARN | GAS_WEB_APP_URL not provided in environment; skipped live GAS check |

## How To Re-run

```bash
node scripts/qa-smoke.mjs

# Optional live endpoint override
QA_FRONTEND_URL=http://127.0.0.1:3000 \
QA_MESSAGING_URL=http://127.0.0.1:8091 \
QA_SIGNALING_URL=http://127.0.0.1:8080 \
GAS_WEB_APP_URL=https://script.google.com/macros/s/.../exec \
node scripts/qa-smoke.mjs
```
