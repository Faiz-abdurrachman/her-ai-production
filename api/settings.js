const DEFAULT_GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxivp4g8mVai8rZcei4w9pblh8s2Kks84CnRshveD_IR69erw_Ffbn_TwithrpNTEj_yw/exec';

function sendJson(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(JSON.stringify(payload));
}

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body || '{}');
    } catch {
      return {};
    }
  }
  return body;
}

async function postGas(payload) {
  const target = process.env.GAS_WEB_APP_URL || DEFAULT_GAS_WEB_APP_URL;
  const response = await fetch(target, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow'
  });
  const text = await response.text();

  try {
    return {
      status: response.status,
      body: text ? JSON.parse(text) : {}
    };
  } catch {
    return {
      status: 502,
      body: {
        ok: false,
        status: 'error',
        message: 'Google Apps Script mengembalikan respons non-JSON.',
        detail: text.trim().slice(0, 160)
      }
    };
  }
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await postGas({ action: 'getSettings' });
      sendJson(res, result.status, {
        ok: result.body.status === 'success',
        settings: result.body.settings || {}
      });
      return;
    }

    if (req.method === 'POST') {
      const body = normalizeBody(req.body);
      const settings = body.settings || body || {};
      const result = await postGas({ action: 'saveSettings', settings });
      sendJson(res, result.status, {
        ok: result.body.status === 'success',
        settings: result.body.settings || settings,
        message: result.body.message
      });
      return;
    }

    sendJson(res, 405, { ok: false, message: 'Method not allowed' });
  } catch (error) {
    sendJson(res, 502, {
      ok: false,
      message: error.message || 'Gagal menghubungi Google Apps Script.'
    });
  }
};
