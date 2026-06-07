import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DIST = join(import.meta.dirname, 'dist');
const INDEX = join(DIST, 'index.html');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function sendFile(res, filePath, status = 200) {
  return readFile(filePath).then((data) => {
    res.writeHead(status, {
      'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
    });
    res.end(data);
  });
}

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = normalize(join(DIST, urlPath));

    // защита от path traversal: не выходим за пределы dist
    if (filePath !== DIST && !filePath.startsWith(DIST + '/')) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    let info = await stat(filePath).catch(() => null);
    if (info?.isDirectory()) {
      filePath = join(filePath, 'index.html');
      info = await stat(filePath).catch(() => null);
    }

    if (info?.isFile()) {
      await sendFile(res, filePath);
    } else {
      // SPA-fallback: любой неизвестный путь отдаёт index.html
      await sendFile(res, INDEX, 200);
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`frontend server listening on http://${HOST}:${PORT}`);
});
