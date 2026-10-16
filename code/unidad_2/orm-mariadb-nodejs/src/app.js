const express = require('express');
const productosRouter = require('./routes/productos');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de ejemplo con Node.js, Sequelize y MariaDB',
    endpoints: {
      listar: 'GET /api/productos',
      buscar: 'GET /api/productos?buscar=texto',
      consultar: 'GET /api/productos/:id',
      crear: 'POST /api/productos',
      actualizar: 'PUT /api/productos/:id',
      eliminar: 'DELETE /api/productos/:id'
    }
  });
});

app.use('/api/productos', productosRouter);

// Errores de validación y errores generales.
app.use((error, req, res, next) => {
  if (error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Datos inválidos.',
      detalles: error.errors.map(item => ({
        campo: item.path,
        mensaje: item.message
      }))
    });
  }

  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

module.exports = app;
