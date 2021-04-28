const http = require('http');
const fs=require('fs');
const fileContent =fs.readFileSync('test.html')
const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(fileContent);
});

server.listen(port, hostname, () => {
  console.log(`Server running  at http://${hostname}:${port}/`);
});