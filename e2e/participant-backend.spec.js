// @ts-check
const { test, expect } = require('@playwright/test');
const {
  canRunLiveMutations,
  canRunPasswordMutations,
  hasCredentials
} = require('./helpers/test-policy');
const { ACTIVE_DASHBOARD_MODULES } = require('./fixtures/active-modules');

/**
 * E2E Backend API Tests — HerAI Fellowship
 *
 * Test via fetch(POST /__gas) langsung, tanpa browser.
 * Semua test pure HTTP — tidak pakai page/browser/context.
 *
 * ⚠️  CRITICAL NOTES:
 * - Token field untuk protected actions: `participantToken` (BUKAN `token`)
 * - Login response field `token` benar
 * - getParticipantProgress response: `data` array (BUKAN `progress`)
 * - Dashboard modules TIDAK punya `module_id` — pakai `title` atau `href`
 * - Score Math.max hanya di dashboard query, BUKAN di saveProgress
 *
 * Live write tests require TEST_ALLOW_MUTATIONS=true in addition to credentials.
 * Keep the flag disabled for normal local/production smoke runs.
 */

const TEST_BASE = 'http://127.0.0.1:3000';
const TEST_NIK = process.env.TEST_PARTICIPANT_NIK || '';
const TEST_PASSWORD = process.env.TEST_PARTICIPANT_PASSWORD || '';
const TEST_MODULE = ACTIVE_DASHBOARD_MODULES[0].moduleId;

const liveTest = hasCredentials ? test : test.skip;
const mutatingTest = canRunLiveMutations ? test : test.skip;
const passwordMutatingTest = canRunPasswordMutations ? test : test.skip;

// ─── Helpers ──────────────────────────────────────────────

/**
 * POST ke GAS backend via proxy /__gas.
 * @param {object} payload - {action, ...fields}
 * @returns {Promise<object>} Parsed JSON response
 */
async function gasPost(payload) {
  const res = await fetch(`${TEST_BASE}/__gas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': TEST_BASE
    },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/** @type {{token: string, nama_lengkap: string} | null} */
let cachedSession = null;

/**
 * Login dan dapatkan session. Cache untuk reuse antar test.
 * @returns {Promise<{token: string, nama_lengkap: string}>}
 */
async function getSession() {
  if (cachedSession) return cachedSession;
  const res = await gasPost({
    action: 'participantLogin',
    nik: TEST_NIK,
    password: TEST_PASSWORD
  });
  if (res.status === 'success' && res.token) {
    cachedSession = { token: res.token, nama_lengkap: res.profile?.nama_lengkap || '' };
    return cachedSession;
  }
  throw new Error(`Login gagal: ${JSON.stringify(res)}`);
}

// ─── Group 1: Authentication ──────────────────────────────

test.describe('Auth — participantLogin', () => {
  liveTest('valid login returns token + profile', async () => {
    const res = await gasPost({
      action: 'participantLogin',
      nik: TEST_NIK,
      password: TEST_PASSWORD
    });

    expect(res.status).toBe('success');
    expect(typeof res.token).toBe('string');
    expect(res.token.length).toBeGreaterThan(0);
    expect(res.profile).toBeDefined();
    expect(typeof res.profile.nama_lengkap).toBe('string');
    // nama_lengkap may be empty string if not yet filled in profile
    expect(res.expires_at).toBeDefined();
  });

  test('unregistered NIK returns error', async () => {
    const res = await gasPost({
      action: 'participantLogin',
      nik: '9999999999999999',
      password: 'anything'
    });

    expect(res.status).toBe('error');
    expect(res.message).toBeDefined();
    expect(res.message).toMatch(/NIK|password|tidak valid/i);
  });

  liveTest('wrong password returns error', async () => {
    const res = await gasPost({
      action: 'participantLogin',
      nik: TEST_NIK,
      password: 'wrongpassword123'
    });

    expect(res.status).toBe('error');
    expect(res.message).toBeDefined();
  });

  liveTest('empty NIK returns error', async () => {
    const res = await gasPost({
      action: 'participantLogin',
      nik: '',
      password: TEST_PASSWORD
    });

    expect(res.status).toBe('error');
    expect(res.message).toBeDefined();
  });

  liveTest('empty password returns error', async () => {
    const res = await gasPost({
      action: 'participantLogin',
      nik: TEST_NIK,
      password: ''
    });

    expect(res.status).toBe('error');
    expect(res.message).toBeDefined();
  });

  test('protected endpoint without token returns error', async () => {
    const res = await gasPost({
      action: 'getParticipantDashboardData'
    });

    expect(res.status).toBe('error');
    expect(res.message).toBeDefined();
    expect(res.message).toMatch(/tidak valid|kedaluwarsa/i);
  });

  test('protected endpoint with invalid token returns error', async () => {
    const res = await gasPost({
      action: 'getParticipantDashboardData',
      participantToken: 'garbage_invalid_token'
    });

    expect(res.status).toBe('error');
    expect(res.message).toBeDefined();
    expect(res.message).toMatch(/tidak valid|kedaluwarsa/i);
  });
});

// ─── Group 2: Progress CRUD ───────────────────────────────

test.describe('Progress — save + get', () => {
  mutatingTest('save chapter progress returns success', async () => {
    const session = await getSession();
    const res = await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: '1',
      status: 'completed'
    });

    expect(res.status).toBe('success');
  });

  mutatingTest('save quiz score returns success', async () => {
    const session = await getSession();
    const res = await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: 'quiz',
      status: 'completed',
      score: 15
    });

    expect(res.status).toBe('success');
  });

  mutatingTest('save practice returns success', async () => {
    const session = await getSession();
    const res = await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: 'practice',
      status: 'completed'
    });

    expect(res.status).toBe('success');
  });

  mutatingTest('get progress returns saved data', async () => {
    const session = await getSession();

    // Save chapter 1 first to ensure data exists
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: '1',
      status: 'completed'
    });

    const res = await gasPost({
      action: 'getParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE
    });

    expect(res.status).toBe('success');
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);

    // chapter_id returned as number from sheet (not string)
    const chapterEntry = res.data.find(
      e => e.module_id === TEST_MODULE && String(e.chapter_id) === '1'
    );
    expect(chapterEntry).toBeDefined();
    expect(chapterEntry.status).toBe('completed');

    const quizEntry = res.data.find(
      e => e.module_id === TEST_MODULE && String(e.chapter_id) === 'quiz'
    );
    if (quizEntry) {
      expect(quizEntry.score).toBeDefined();
    }
  });

  mutatingTest('idempotent save — no duplicate entries', async () => {
    const session = await getSession();

    // Save chapter 1 twice
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: '1',
      status: 'completed'
    });
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: '1',
      status: 'completed'
    });

    const res = await gasPost({
      action: 'getParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE
    });

    expect(res.status).toBe('success');
    const chapter1Entries = res.data.filter(
      e => e.module_id === TEST_MODULE && String(e.chapter_id) === '1'
    );
    expect(chapter1Entries.length).toBe(1);
  });
});

// ─── Group 3: Dashboard Data ──────────────────────────────

test.describe('Dashboard — getParticipantDashboardData', () => {
  liveTest('returns full dashboard data', async () => {
    const session = await getSession();

    const res = await gasPost({
      action: 'getParticipantDashboardData',
      participantToken: session.token
    });

    expect(res.status).toBe('success');
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data.modules)).toBe(true);
    expect(res.data.modules.length).toBeGreaterThan(0);

    const mod = res.data.modules[0];
    expect(typeof mod.title).toBe('string');
    expect(typeof mod.subtitle).toBe('string');
    expect(typeof mod.icon).toBe('string');
    expect(typeof mod.href).toBe('string');
    // quiz_score may be undefined if no quiz taken yet for this module
    const qs = mod.quiz_score;
    expect(qs === undefined || qs === null || typeof qs === 'number').toBe(true);

    if (typeof qs === 'number') {
      expect(qs).toBeGreaterThanOrEqual(0);
      expect(qs).toBeLessThanOrEqual(100);
    }

    // Secondary sections
    expect(res.data.tracks).toBeDefined();
    expect(res.data.journey).toBeDefined();
    expect(res.data.events).toBeDefined();
    expect(res.data.leaderboard).toBeDefined();
  });

  mutatingTest('quiz score is percentage (not raw count)', async () => {
    const session = await getSession();

    // Submit quiz to ensure data
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: 'quiz',
      status: 'completed',
      score: 18
    });

    const res = await gasPost({
      action: 'getParticipantDashboardData',
      participantToken: session.token
    });

    expect(res.status).toBe('success');
    expect(res.data).toBeDefined();

    // Find module by href (no module_id in dashboard response)
    const dlModule = res.data.modules.find(
      m => m.href && m.href.includes(TEST_MODULE)
    );

    if (dlModule && dlModule.quiz_score != null) {
      expect(typeof dlModule.quiz_score).toBe('number');
      expect(dlModule.quiz_score).toBeGreaterThanOrEqual(0);
      expect(dlModule.quiz_score).toBeLessThanOrEqual(100);
      // 18/20 should be 90%
      expect(dlModule.quiz_score).toBe(90);
    }
  });
});

// ─── Group 4: Password Management ─────────────────────────

test.describe('Password — changeParticipantPassword', () => {
  passwordMutatingTest('valid password change full cycle', async () => {
    const session = await getSession();
    const tempPass = `Qa-${Date.now()}-Z9!`;

    // Step 1: Ganti password
    const changeRes = await gasPost({
      action: 'changeParticipantPassword',
      participantToken: session.token,
      oldPassword: TEST_PASSWORD,
      newPassword: tempPass
    });
    expect(changeRes.status).toBe('success');

    // Step 2: Login dengan password baru
    const loginRes = await gasPost({
      action: 'participantLogin',
      nik: TEST_NIK,
      password: tempPass
    });
    expect(loginRes.status).toBe('success');
    expect(loginRes.token).toBeDefined();

    // Step 3: Ganti balik ke password asli
    const revertRes = await gasPost({
      action: 'changeParticipantPassword',
      participantToken: loginRes.token,
      oldPassword: tempPass,
      newPassword: TEST_PASSWORD
    });
    expect(revertRes.status).toBe('success');

    // Step 4: Verifikasi login dengan password asli
    const finalLogin = await gasPost({
      action: 'participantLogin',
      nik: TEST_NIK,
      password: TEST_PASSWORD
    });
    expect(finalLogin.status).toBe('success');

    // Refresh cached session (token lama invalid setelah password change)
    cachedSession = { token: finalLogin.token, nama_lengkap: finalLogin.profile?.nama_lengkap || '' };
  });

  liveTest('wrong old password returns error', async () => {
    const session = await getSession();

    const res = await gasPost({
      action: 'changeParticipantPassword',
      participantToken: session.token,
      oldPassword: 'wrongoldpassword',
      newPassword: 'anything123'
    });

    expect(res.status).toBe('error');
    expect(res.message).toMatch(/Password lama tidak sesuai/i);
  });

  liveTest('empty fields return validation error', async () => {
    const session = await getSession();

    const res = await gasPost({
      action: 'changeParticipantPassword',
      participantToken: session.token,
      oldPassword: '',
      newPassword: ''
    });

    expect(res.status).toBe('error');
    expect(res.message).toMatch(/wajib diisi/i);
  });
});

// ─── Group 5: Edge Cases ──────────────────────────────────

test.describe('Edge Cases — profile + score + multi-module', () => {
  mutatingTest('update profile returns updated participant', async () => {
    const session = await getSession();

    const res = await gasPost({
      action: 'updateParticipantProfile',
      participantToken: session.token,
      whatsapp: '081234567890'
    });

    expect(res.status).toBe('success');
    expect(res.profile).toBeDefined();
    expect(typeof res.profile.nama_lengkap).toBe('string');
  });

  mutatingTest('quiz score — dashboard Math.max vs sheet last-write', async () => {
    const session = await getSession();

    // Submit scores: 10, then 20 (highest), then 12
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: 'quiz',
      status: 'completed',
      score: 10
    });
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: 'quiz',
      status: 'completed',
      score: 20
    });
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: 'quiz',
      status: 'completed',
      score: 12
    });

    // getParticipantProgress returns raw sheet data (last write: 12)
    const progressRes = await gasPost({
      action: 'getParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE
    });
    expect(progressRes.status).toBe('success');
    const quizEntry = progressRes.data.find(e => e.chapter_id === 'quiz');
    expect(quizEntry).toBeDefined();
    // Sheet stores the last-written score (12), not Math.max
    expect(Number(quizEntry.score)).toBe(12);

    // getParticipantDashboardData applies Math.max (20)
    const dashRes = await gasPost({
      action: 'getParticipantDashboardData',
      participantToken: session.token
    });
    expect(dashRes.status).toBe('success');
    expect(dashRes.data).toBeDefined();
    const dlModule = dashRes.data.modules.find(
      m => m.href && m.href.includes(TEST_MODULE)
    );
    if (dlModule && dlModule.quiz_score != null) {
      // 20/20 = 100% via Math.max
      expect(dlModule.quiz_score).toBe(100);
    }
  });

  mutatingTest('multiple module progress tracked independently', async () => {
    const session = await getSession();

    // Save progress for 2 different modules
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: TEST_MODULE,
      chapter_id: '1',
      status: 'completed'
    });
    await gasPost({
      action: 'saveParticipantProgress',
      participantToken: session.token,
      module_id: 'ui-ux',
      chapter_id: '1',
      status: 'completed'
    });

    const res = await gasPost({
      action: 'getParticipantProgress',
      participantToken: session.token
    });

    expect(res.status).toBe('success');

    const dlEntries = res.data.filter(e => e.module_id === TEST_MODULE);
    const uxEntries = res.data.filter(e => e.module_id === 'ui-ux');

    expect(dlEntries.length).toBeGreaterThan(0);
    expect(uxEntries.length).toBeGreaterThan(0);
  });
});
