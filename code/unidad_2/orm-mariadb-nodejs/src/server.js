require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./models/Producto');

const PORT = Number(process.env.PORT || 3000);

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con MariaDB establecida.');

    // Crea la tabla si todavía no existe. En producción, usar migraciones.
    await sequelize.sync();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor listo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar la aplicación:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
