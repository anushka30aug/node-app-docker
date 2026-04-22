const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.end("Hello from Kubernetes! This is the app.js file. and its my test msg 004. 😊");
});

server.listen(port, '0.0.0.0');