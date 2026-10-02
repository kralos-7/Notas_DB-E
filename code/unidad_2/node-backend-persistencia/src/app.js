import express from 'express';
import { config } from './config/env.js';
import { obtenerUsuarioPorId } from './db/pgPool.js';
import { initRedis, obtenerConCache } from './services/cacheService.js';

const app = express();
app.use(express.json());

app.get('/usuarios/:id', async (req, res) => {
  try {
    await initRedis();
    const userId = req.params.id;
    const cacheKey = `user:${userId}`;

    const usuario = await obtenerConCache(cacheKey, 3600, () => obtenerUsuarioPorId(userId));
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ status: 'success', data: usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(config.port, () => {
  console.log(`Servidor Node.js ejecutandose en puerto ${config.port}`);
});
