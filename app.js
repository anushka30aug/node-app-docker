const express = require('express');
const promBundle = require('express-prom-bundle');

const app = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,

  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(metricsMiddleware);

const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello from Kubernetes!");
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});