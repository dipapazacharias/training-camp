const http = require('http');

const host = "127.0.0.1";
const port = 8000;

http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });
  res.end("Hello, world!\n");
}).listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}/`);
});
