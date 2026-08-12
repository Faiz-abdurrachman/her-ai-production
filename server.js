/**
 * Lightweight local server for the HerAI SPA.
 *
 * Usage:
 *   source .env && node server.js
 *
 * GAS proxy auto-enables when GAS_WEB_APP_URL is available (from .env or default).
 * Disable with: HERAI_ALLOW_LIVE_GAS_PROXY=false node server.js
 */

'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const ROOT = path.resolve(__dirname);
const HOST = process.env.HERAI_LOCAL_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 3000);
const LIVE_PROXY_ENABLED = process.env.HERAI_ALLOW_LIVE_GAS_PROXY !== 'false';
const GAS_WEB_APP_URL = String(process.env.GAS_WEB_APP_URL || '').trim()
  || 'https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec';

const MIME_TYPES = Object.freeze({
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
});

function setSecurityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Frame-Options', 'SAMEORIGIN');
  response.setHeader('Cache-Control', 'no-store');
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': MIME_TYPES['.json'] });
  response.end(JSON.stringify(payload));
}

function safeFilePath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decoded.includes('\0') || decoded.split('/').some(segment => segment.startsWith('.'))) {
    return null;
  }

  const relativePath = decoded.replace(/^\/+/, '');
  const resolved = path.resolve(ROOT, relativePath || 'index.html');
  return resolved === ROOT || resolved.startsWith(`${ROOT}${path.sep}`) ? resolved : null;
}

async function readRequestBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1024 * 1024) throw new Error('Request body exceeds 1 MB.');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function proxyGas(request, response) {
  if (!LIVE_PROXY_ENABLED || !GAS_WEB_APP_URL) {
    sendJson(response, 503, {
      status: 'error',
      code: 'local_gas_proxy_disabled',
      message: 'Proxy GAS lokal dinonaktifkan agar testing tidak mengubah data live.'
    });
    return;
  }

  try {
    const body = await readRequestBody(request);
    const https = require('node:https');
    const text = await new Promise((resolve, reject) => {
      const doRequest = (urlStr, method, bodyData, retries) => {
        console.log(`[PROXY] ${method} ${urlStr} (retries: ${retries})`);
        if (retries <= 0) return reject(new Error('GAS redirect loop'));
        const url = new URL(urlStr);
        const headers = {};
        if (bodyData) {
          headers['Content-Type'] = 'text/plain;charset=utf-8';
          headers['Content-Length'] = Buffer.byteLength(bodyData);
        }
        const opts = { hostname: url.hostname, path: url.pathname + url.search, method, headers, timeout: 30000 };
        const proxyReq = https.request(opts, gasRes => {
          let data = '';
          gasRes.on('data', chunk => data += chunk);
          gasRes.on('end', () => {
            if (gasRes.statusCode >= 300 && gasRes.statusCode < 400 && gasRes.headers.location) {
              console.log(`[PROXY] Redirecting to ${gasRes.headers.location}`);
              return doRequest(gasRes.headers.location, 'GET', null, retries - 1);
            }
            console.log(`[PROXY] Done. Status: ${gasRes.statusCode}, Length: ${data.length}`);
            resolve(data);
          });
        });
        proxyReq.on('error', reject);
        proxyReq.on('timeout', () => { proxyReq.destroy(); reject(new Error('GAS request timeout')); });
        if (bodyData) proxyReq.write(bodyData);
        proxyReq.end();
      };
      doRequest(GAS_WEB_APP_URL, 'POST', body, 3);
    });
    response.writeHead(200, { 'Content-Type': MIME_TYPES['.json'] });
    response.end(text);
  } catch (error) {
    sendJson(response, 502, {
      status: 'error',
      message: error.message || 'Gagal menghubungi GAS.'
    });
  }
}

function serveFile(request, response, filePath) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      sendJson(response, 404, { status: 'error', message: 'File tidak ditemukan.' });
      return;
    }

    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size
    });
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
}

const server = http.createServer(async (request, response) => {
  setSecurityHeaders(response);
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || HOST}`);

  if (requestUrl.pathname === '/healthz' && request.method === 'GET') {
    sendJson(response, 200, {
      status: 'success',
      service: 'HerAI local frontend',
      gasProxy: LIVE_PROXY_ENABLED && Boolean(GAS_WEB_APP_URL) ? 'enabled' : 'disabled'
    });
    return;
  }

  if (requestUrl.pathname === '/__gas' && request.method === 'POST') {
    await proxyGas(request, response);
    return;
  }

  if (requestUrl.pathname === '/__settings') {
    if (request.method === 'GET') {
      sendJson(response, 200, { ok: true, settings: {} });
    } else {
      sendJson(response, 503, {
        ok: false,
        message: 'Penyimpanan settings dinonaktifkan pada server lokal read-only.'
      });
    }
    return;
  }

  if (!['GET', 'HEAD'].includes(request.method || '')) {
    sendJson(response, 405, { status: 'error', message: 'Method not allowed.' });
    return;
  }

  const requestedPath = safeFilePath(requestUrl.pathname);
  if (!requestedPath) {
    sendJson(response, 404, { status: 'error', message: 'Path tidak diizinkan.' });
    return;
  }

  fs.stat(requestedPath, (error, stats) => {
    if (!error && stats.isFile()) {
      serveFile(request, response, requestedPath);
      return;
    }

    const hasExtension = Boolean(path.extname(requestedPath));
    if (hasExtension) {
      sendJson(response, 404, { status: 'error', message: 'File tidak ditemukan.' });
      return;
    }
    serveFile(request, response, path.join(ROOT, 'index.html'));
  });
});

server.on('error', error => {
  console.error(`Gagal menjalankan localhost: ${error.message}`);
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`HerAI local frontend: http://${HOST}:${PORT}/`);
  console.log(`GAS proxy: ${LIVE_PROXY_ENABLED && GAS_WEB_APP_URL ? 'enabled' : 'disabled (safe mode)'}`);
  console.log('Tekan Ctrl+C untuk berhenti.');
});
