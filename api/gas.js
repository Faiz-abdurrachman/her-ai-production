const DEFAULT_GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxivp4g8mVai8rZcei4w9pblh8s2Kks84CnRshveD_IR69erw_Ffbn_TwithrpNTEj_yw/exec';

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
