import express from 'express';
import { config } from './config/env.js';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: "OK", port: config.port });
});

app.use('/users', userRoutes);

app.listen(config.port, () => {
  console.log(`Servidor Node.js iniciado en puerto ${config.port}`);
});
