const express = require('express');
const promBundle = require('express-prom-bundle');

const app = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: true
  }
});

app.use(metricsMiddleware);

const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello from Kubernetes! 030");
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});