const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status_code'],
  registers: [register],
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      path: req.path,
      status_code: String(res.statusCode),
    });
  });
  next();
});

const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello from Kubernetes! 36.");
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});