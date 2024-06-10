import express from 'express';
import { port } from './config.js';
import app from './app.js';

const server = express();

server.use(app);

server.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});