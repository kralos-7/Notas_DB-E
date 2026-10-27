const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/v1/profesores', (req, res) => {
  const { nombre, departamento } = req.body;
  if (!nombre || !departamento) {
    return res.status(400).json({ error: 'El nombre y departamento son obligatorios.' });
  }

  res.status(201).json({
    id: Math.floor(Math.random() * 1000) + 1,
    nombre,
    departamento
  });
});

module.exports = app;
