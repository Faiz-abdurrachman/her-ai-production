const DEFAULT_GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec';

// In-memory response cache — survives until cold restart (~10 min idle).
// Keyed by action+nik to isolate participants. Only caches read actions.
const cache = new Map();

const CACHE_TTL_SEC = {
  getParticipantDashboardData: 120,
  getParticipantProgress: 180,
  getParticipantDiscussions: 180,
  getParticipantExerciseSubmissions: 120
};

const CACHED_ACTIONS = new Set(Object.keys(CACHE_TTL_SEC));

function cacheKey(action, nik) {
  return action + ':' + (String(nik || '').replace(/\D/g, '') || 'anon');
}

function readCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > (entry.ttl || 120) * 1000) {
    cache.delete(key);
    return null;
  }
  return entry;
}

function writeCache(key, body, status, ttl) {
  cache.set(key, { body, status, ts: Date.now(), ttl });
}

function sendJson(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.send(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { status: 'error', message: 'Method not allowed' });
    return;
  }

  const target = process.env.GAS_WEB_APP_URL || DEFAULT_GAS_WEB_APP_URL;
  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});

  // Parse action+nik for cache routing (best-effort, non-destructive)
  let action = '', nik = '';
  try { const p = JSON.parse(body); action = p.action || ''; nik = p.nik || ''; } catch (_) {}

  // Cache hit — return cached response immediately
  if (CACHED_ACTIONS.has(action)) {
    const key = cacheKey(action, nik);
    const cached = readCache(key);
    if (cached) {
      sendJson(res, cached.status, JSON.parse(cached.body));
      return;
    }
  }

  try {
    const gasResponse = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      redirect: 'follow'
    });
    const text = await gasResponse.text();

    try {
      const payload = text ? JSON.parse(text) : {};

      // Cache successful read responses
      if (CACHED_ACTIONS.has(action) && payload.status === 'success') {
        writeCache(cacheKey(action, nik), text, gasResponse.status, CACHE_TTL_SEC[action] || 120);
      }

      sendJson(res, gasResponse.status, payload);
    } catch {
      sendJson(res, 502, {
        status: 'error',
        message: 'Google Apps Script mengembalikan respons non-JSON.',
        detail: text.trim().slice(0, 160)
      });
    }
  } catch (error) {
    sendJson(res, 502, {
      status: 'error',
      message: error.message || 'Gagal menghubungi Google Apps Script.'
    });
  }
};
