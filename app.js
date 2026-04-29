const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello from Kubernetes! This is the app.js file. and its my test msg 0026....");
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});