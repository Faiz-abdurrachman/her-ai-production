# E2E Backend Test Plan — `e2e/participant-backend.spec.js`

> **File**: `e2e/participant-backend.spec.js` (NEW)
> **Scope**: Direct GAS API tests via `POST /__gas` — tanpa browser
> **Priority**: P1 (backend wajib benar sebelum frontend di-test)
> **Total**: 20 tests, 5 groups

---

## Arsitektur Test

```
test (Node.js fetch)
  → POST http://127.0.0.1:3000/__gas
  → body: JSON.stringify({action, ...payload})
  → server.js proxy
  → forward ke GAS Web App URL (https://script.google.com/macros/...)
  → GAS doPost() → authorize → route → return JSON
  → response diteruskan apa adanya ke test
```

**Test runner**: Playwright (konsisten dengan suite yang ada), tapi test-only pakai `fetch()` — tidak pakai browser/page.

---

## Credentials

```js
const TEST_BASE = 'http://127.0.0.1:3000';
const TEST_NIK = '8204086711010003';
const TEST_PASSWORD = 'brenda123';
const TEST_MODULE = 'deep-learning'; // module_id yang ada di seed dashboard
```

---

## Helpers

```js
/**
 * POST ke GAS backend via proxy.
 * @param {object} payload - {action, ...fields}
 * @returns {object} - Parsed JSON response
 */
async function gasPost(payload) {
  const res = await fetch(`${TEST_BASE}/__gas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/**
 * Login dan dapatkan token. Cache token di variable global.
 */
async function getToken() {
  const res = await gasPost({
    action: 'participantLogin',
    nik: TEST_NIK,
    password: TEST_PASSWORD
  });
  if (res.status === 'success' && res.token) {
    return { token: res.token, nama_lengkap: res.nama_lengkap };
  }
  throw new Error(`Login gagal: ${JSON.stringify(res)}`);
}
```

---

## Payload Reference (Exact Shapes)

### `participantLogin`
```js
// Request
{ action: 'participantLogin', nik: '8204086711010003', password: 'brenda123' }

// Success response
{ status: 'success', token: 'eyJ...', nama_lengkap: '...', nik: '...', ... }

// Error response
{ status: 'error', message: '...' }
```

### `saveParticipantProgress`
```js
// Request — chapter
{ action: 'saveParticipantProgress', token: '...', module_id: 'deep-learning', chapter_id: '1', status: 'completed' }

// Request — quiz
{ action: 'saveParticipantProgress', token: '...', module_id: 'deep-learning', chapter_id: 'quiz', status: 'completed', score: 15 }

// Request — practice
{ action: 'saveParticipantProgress', token: '...', module_id: 'deep-learning', chapter_id: 'practice', status: 'completed' }

// Success response
{ status: 'success' }

// Error response
{ status: 'error', message: '...' }
```

### `getParticipantProgress`
```js
// Request
{ action: 'getParticipantProgress', token: '...' }

// Success response
{ status: 'success', progress: [
  { module_id: '...', chapter_id: '...', status: '...', score: null|number, ... }
]}

// Error response
{ status: 'error', message: '...' }
```

### `getParticipantDashboardData`
```js
// Request
{ action: 'getParticipantDashboardData', token: '...' }

// Success response
{ status: 'success', modules: [
  { module_id: '...', title: '...', quiz_score: 75, ... }
], discussionTrails: [...], tracks: [...], journey: [...], events: [...], leaderboard: [...] }

// Error response
{ status: 'error', message: '...' }
```

### `changeParticipantPassword`
```js
// Request
{ action: 'changeParticipantPassword', token: '...', oldPassword: 'brenda123', newPassword: 'testbaru456' }

// Success response
{ status: 'success' }

// Error response
{ status: 'error', message: '...' }
```

### `updateParticipantProfile`
```js
// Request
{ action: 'updateParticipantProfile', token: '...', whatsapp: '081234567890' }

// Success response
{ status: 'success', participant: { ... } }

// Error response
{ status: 'error', message: '...' }
```

---

## Test Groups

### Group 1: Authentication (7 tests)

| # | Test | Payload | Assertions |
|---|------|---------|------------|
| 1 | **Login valid** | `{action:'participantLogin', nik, password}` | `status==='success'`, `token` is string & non-empty, `nama_lengkap` is string |
| 2 | **NIK tidak terdaftar** | `{action:'participantLogin', nik:'9999999999999999', password:'x'}` | `status==='error'`, `message` contains error text |
| 3 | **Password salah** | `{action:'participantLogin', nik, password:'wrongpassword123'}` | `status==='error'` |
| 4 | **NIK kosong** | `{action:'participantLogin', nik:'', password}` | `status==='error'` |
| 5 | **Password kosong** | `{action:'participantLogin', nik, password:''}` | `status==='error'` |
| 6 | **Protected endpoint tanpa token** | `{action:'getParticipantDashboardData'}` | `status==='error'` |
| 7 | **Protected endpoint token invalid** | `{action:'getParticipantDashboardData', token:'garbage_invalid'}` | `status==='error'` |

### Group 2: Progress CRUD (5 tests)

> Semua test di group ini pakai token valid dari helper `getToken()`.

| # | Test | Steps | Assertions |
|---|------|-------|------------|
| 8 | **Save chapter progress** | POST `saveParticipantProgress`, `module_id:'deep-learning'`, `chapter_id:'1'`, `status:'completed'` | `status==='success'` |
| 9 | **Save quiz score** | POST `saveParticipantProgress`, `module_id:'deep-learning'`, `chapter_id:'quiz'`, `status:'completed'`, `score:15` | `status==='success'` |
| 10 | **Save practice** | POST `saveParticipantProgress`, `module_id:'deep-learning'`, `chapter_id:'practice'`, `status:'completed'` | `status==='success'` |
| 11 | **Get progress returns saved data** | POST `getParticipantProgress` → cari entries untuk module deep-learning | Array `progress` exists, contains entries with `module_id:'deep-learning'`, at least 1 entry with `chapter_id:'quiz'` and `score:15` |
| 12 | **Idempotent save** | POST `saveParticipantProgress` (chapter 1) dua kali → GET progress → filter entries dengan `module_id + chapter_id:'1'` | Tidak ada duplikat (max 1 entry per module_id+chapter_id combo) |

### Group 3: Dashboard Data (2 tests)

| # | Test | Assertions |
|---|------|------------|
| 13 | **Dashboard returns full data** | `status==='success'`, `modules` is array with length > 0, tiap module punya `module_id`, `title`, `quiz_score` (number), `quiz_score` between 0-100 |
| 14 | **Quiz score is percentage** | Ambil module deep-learning dari dashboard, `quiz_score` adalah angka 0-100 (bukan raw 0-20) |

### Group 4: Password Management (3 tests)

| # | Test | Steps | Cleanup |
|---|------|-------|---------|
| 15 | **Change password valid** | Ganti `oldPassword:TEST_PASSWORD` → `newPassword:'testbaru456'` | Ganti balik: `oldPassword:'testbaru456'` → `newPassword:TEST_PASSWORD` |
| | | Assert: `status==='success'` | Assert: `status==='success'` |
| | | Login dengan password baru | Login dengan password asli |
| | | Assert: `status==='success'` | Assert: `status==='success'` |
| 16 | **Wrong old password** | POST `changeParticipantPassword`, `oldPassword:'wrongold'`, `newPassword:'anything'` | — |
| | | Assert: `status==='error'` | |
| 17 | **Empty fields** | POST `changeParticipantPassword`, `oldPassword:''`, `newPassword:''` | — |
| | | Assert: `status==='error'` | |

### Group 5: Edge Cases (2 tests)

| # | Test | Steps | Assertions |
|---|------|-------|------------|
| 18 | **Update profile** | POST `updateParticipantProfile`, `whatsapp:'081234567890'` | `status==='success'` atau `status==='error'` (tergantung apakah field bisa diupdate via API — jika error, pastikan bukan crash) |
| 19 | **Quiz score persistence** | Save quiz score=10 → save quiz score=15 → save quiz score=12 → GET progress untuk chapter_id:'quiz' | Score tertinggi (15) yang tersimpan (GAS pakai Math.max) |
| 20 | **Multiple module progress** | Save progress untuk 2 module berbeda (deep-learning + ui-ux) → GET progress → filter by module_id | Kedua module punya entries terpisah |

---

## Assertion Patterns

```js
// Success pattern
expect(res.status).toBe('success');
expect(res.token).toBeDefined();
expect(typeof res.token).toBe('string');
expect(res.token.length).toBeGreaterThan(0);

// Error pattern  
expect(res.status).toBe('error');
expect(res.message).toBeDefined();

// Progress data pattern
expect(res.status).toBe('success');
expect(Array.isArray(res.progress)).toBe(true);

// Dashboard data pattern
expect(res.status).toBe('success');
expect(Array.isArray(res.modules)).toBe(true);
expect(res.modules.length).toBeGreaterThan(0);
const dlModule = res.modules.find(m => m.module_id === 'deep-learning');
if (dlModule) {
  expect(typeof dlModule.quiz_score).toBe('number');
  expect(dlModule.quiz_score).toBeGreaterThanOrEqual(0);
  expect(dlModule.quiz_score).toBeLessThanOrEqual(100);
}
```

---

## Run Command

```bash
# Pastikan server jalan
node server.js &

# Run backend tests only
TEST_PARTICIPANT_NIK="8204086711010003" \
TEST_PARTICIPANT_PASSWORD="brenda123" \
npx playwright test e2e/participant-backend.spec.js

# Run all tests
TEST_PARTICIPANT_NIK="8204086711010003" \
TEST_PARTICIPANT_PASSWORD="brenda123" \
npx playwright test
```

---

## Notes

1. **Token**: Semua protected actions (save/get progress, dashboard, change password, update profile) WAJIB kirim `token` di payload. Token didapat dari `participantLogin` response.
2. **GAS response format**: Semua response punya `{status: 'success'|'error', ...}`. Error responses punya `message` field.
3. **No browser needed**: Test ini pure HTTP — tidak pakai `page`, `browser`, atau `context`. Hanya `fetch()`.
4. **Password change side effect**: Test 15 mengubah password BRIEFLY lalu mengembalikan. Jika test crash di tengah, password test participant bisa berubah. Cleanup di `afterAll()` atau `finally` block.
5. **Idempotent save**: GAS `saveParticipantProgress` pakai UPSERT — jika entry sudah ada untuk module_id+chapter_id combo, dia update, bukan insert baru. Jadi tidak akan ada duplikat.
6. **Quiz score**: GAS compute `Math.max` — submit 3x dengan score berbeda, hanya score tertinggi yang disimpan.
7. **Dashboard quiz_score**: Sudah dalam bentuk persentase (0-100) hasil dari `Math.round((raw/quiz_total)*100)`. Quiz total default 20, math-for-ai=100.
8. **Server.js proxy**: Proxy forward request ke GAS dengan `Content-Type: text/plain;charset=utf-8`. Response GAS diteruskan apa adanya tanpa transformasi.
