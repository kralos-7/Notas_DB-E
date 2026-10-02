import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("ERROR CRÍTICO: FALTA LA VARIABLE DATABASE_URL EN EL ENTORNO");
}

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiSecret: process.env.API_SECRET
};
