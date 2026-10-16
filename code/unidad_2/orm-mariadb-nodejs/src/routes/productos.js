const express = require('express');
const { Op } = require('sequelize');
const Producto = require('../models/Producto');

const router = express.Router();

// GET /api/productos?buscar=teclado
router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (req.query.buscar) {
      where.nombre = { [Op.like]: `%${req.query.buscar}%` };
    }
    const productos = await Producto.findAll({
      where,
      order: [['id', 'ASC']]
    });
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

// GET /api/productos/:id
router.get('/:id', async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

// POST /api/productos
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, existencia } = req.body;
    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      existencia
    });
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
});

// PUT /api/productos/:id
router.put('/:id', async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const camposPermitidos = ['nombre', 'descripcion', 'precio', 'existencia'];
    for (const campo of camposPermitidos) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        producto[campo] = req.body[campo];
      }
    }

    await producto.save();
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/productos/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    await producto.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
