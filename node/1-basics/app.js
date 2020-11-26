const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  let html;

  switch (req.url) {
    case '/':
      html = '';
    case '/about':
      html = '';
    default:
      html = '';
  }

  res.write(html);
  res.end();
});

server.listen(3000);
