const DEFAULT_SETTINGS = {};

function sendJson(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(JSON.stringify(payload));
}

module.exports = function handler(req, res) {
  if (req.method === 'GET') {
    sendJson(res, 200, { ok: true, settings: DEFAULT_SETTINGS });
    return;
  }

  if (req.method === 'POST') {
    sendJson(res, 200, { ok: true, settings: req.body?.settings || req.body || DEFAULT_SETTINGS });
    return;
  }

  sendJson(res, 405, { ok: false, message: 'Method not allowed' });
};
