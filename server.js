// Simple development server untuk SPA routing
// Jalankan dengan: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const DEBUG_LOG_PATH = path.join(__dirname, '.cursor', 'debug-86a842.log');

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/__debug') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body || '{}');
                const line = JSON.stringify(parsed) + '\n';
                fs.mkdir(path.dirname(DEBUG_LOG_PATH), { recursive: true }, (mkdirErr) => {
                    if (mkdirErr) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ ok: false, error: 'mkdir_failed', detail: mkdirErr.message, code: mkdirErr.code }));
                        return;
                    }
                    fs.appendFile(DEBUG_LOG_PATH, line, (appendErr) => {
                        if (appendErr) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ ok: false, error: 'append_failed', detail: appendErr.message, code: appendErr.code }));
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ ok: true }));
                    });
                });
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, error: 'invalid_json' }));
            }
        });
        return;
    }

    let filePath = '.' + req.url;
    
    // SPA Routing: jika bukan file static, serve index.html
    let ext = path.extname(filePath);
    
    // Jika tidak ada extension, kemungkinan ini route SPA
    if (!ext && req.url !== '/') {
        filePath = './index.html';
    } else if (req.url === '/') {
        filePath = './index.html';
    }

    // Recompute extension after potential SPA path rewrite.
    ext = path.extname(filePath);
    
    // Baca file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File tidak ditemukan, serve index.html untuk SPA routing
                fs.readFile('./index.html', (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            // Success
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
    console.log(`📝 Press Ctrl+C to stop`);
});
