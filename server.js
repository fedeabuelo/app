import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 10000;
const BUILD_DIR = path.join(process.cwd(), 'dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(BUILD_DIR, req.url);

  // If the request is for the root, serve index.html
  if (filePath === BUILD_DIR + '/') {
    filePath = path.join(BUILD_DIR, 'index.html');
  }

  // Determine the content type
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // File not found, serve index.html for SPA routing
        fs.readFile(path.join(BUILD_DIR, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});