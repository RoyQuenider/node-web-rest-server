import http2 from 'node:http2'
import fs from 'node:fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile)
  } else if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
  } else if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  }

  fs.readFile(`./public/${req.url}`, 'utf-8', (error, content) => {
    if (error) {
      // res.writeHead(404, { 'Content-Type': 'text/html' });
      // res.setHeader('Content-Type', 'text/html');
      res.statusCode = 404;
      return res.end('not fount');
    }
    res.end(content);
  });
})

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
})




