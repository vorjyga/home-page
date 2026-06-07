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

// Файлы в /assets Vite именует по хэшу содержимого — имя меняется при изменении,
// поэтому их можно кэшировать навсегда. Всё остальное (index.html, фавиконка и т.п.)
// сохраняет имя между деплоями, поэтому всегда ревалидируем, чтобы изменения
// подхватывались сразу.
function cacheControlFor(urlPath) {
  return urlPath.startsWith('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';
}

function makeEtag(info) {
  return `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;
}

async function sendFile(req, res, filePath, urlPath, status = 200) {
  const info = await stat(filePath);
  const etag = makeEtag(info);
  const lastModified = info.mtime.toUTCString();
  const cacheControl = cacheControlFor(urlPath);

  // Условный запрос -> 304 (If-None-Match приоритетнее If-Modified-Since, RFC 7232)
  const inm = req.headers['if-none-match'];
  const ims = req.headers['if-modified-since'];
  let notModified = false;
  if (inm !== undefined) {
    notModified = inm === etag;
  } else if (ims !== undefined) {
    notModified =
      Math.floor(new Date(ims).getTime() / 1000) >= Math.floor(info.mtimeMs / 1000);
  }

  const validators = {
    'Cache-Control': cacheControl,
    'ETag': etag,
    'Last-Modified': lastModified,
  };

  if (notModified) {
    res.writeHead(304, validators);
    res.end();
    return;
  }

  const data = await readFile(filePath);
  res.writeHead(status, {
    'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
    ...validators,
  });
  res.end(data);
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
      await sendFile(req, res, filePath, urlPath);
    } else {
      // SPA-fallback: любой неизвестный путь отдаёт index.html (всегда ревалидируем)
      await sendFile(req, res, INDEX, '/index.html', 200);
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
