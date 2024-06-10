import { createConnection } from "mysql2";

import { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } from './config.js';

export const conexion = createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT
  });

  conexion.connect(function(error) {
    if (error) {
      throw error;
    }else {
    console.log("Base de datos conectada");
    }
  });
  

 