import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { conexion } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


// Middleware para parsear JSON
app.use(express.json());


// Servir archivos estáticos desde el directorio 'public'
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/imagenes', express.static(path.join(__dirname, '../public/imagenes')));
app.use('/html', express.static(path.join(__dirname, '../public/html')));

// Ruta para servir index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

// Ruta para servir cuadrante.html
app.get("/cuadrante", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/cuadrante.html'));
});

app.get("/validacion", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/validacion_gestion.html'));
});

// Ruta para server gestion.html
app.get("/gestion", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/gestion.html'));
});


// ------------------------------------------------

// Ruta para primera semana.html
app.get("/cuadrante/primera_semana", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Semanas/primera_semana.html'));
});

// Ruta para segunda semana.html
app.get("/cuadrante/segunda_semana", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/Semanas/segunda_semana.html'));
});

// Ruta para tercera semana.html
app.get("/cuadrante/tercera_semana", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/Semanas/tercera_semana.html'));
});

// Ruta para cuarta semana.html
app.get("/cuadrante/cuarta_semana", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/Semanas/cuarta_semana.html'));
});

// Ruta para quinta semana.html
app.get("/cuadrante/quinta_semana", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/Semanas/quinta_semana.html'));
});


// ------------------------------------------------

 // Ruta para obtener los datos para una fecha específica
 app.get('/api/cuadrante/:date', (req, res) => {
  const { date } = req.params;

  // Consulta SQL para obtener los datos para la fecha especificada
  const sql = `SELECT * FROM cuadrante WHERE day = ?`;

  // Ejecutar la consulta con la fecha como parámetro
  conexion.query(sql, [date], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ' + error.message);
      res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
      return;
    }

    if (results.length === 0) {
      // No se encontraron datos para la fecha especificada
      res.status(404).json({ error: 'No se encontraron datos para la fecha especificada' });
      return;
    }

    // Devolver los resultados como JSON
    res.json(results[0]);
  });
});

// Ruta para insertar o actualizar datos en la base de datos
app.post('/api/cuadrante', async (req, res) => {
  try {
    const { day, ...data } = req.body;
    if (!day) {
      return res.status(400).json({ error: 'Falta el campo "day"' });
    }
    const existingRecord = await new Promise((resolve, reject) => {
      conexion.query(`SELECT * FROM cuadrante WHERE day = ?`, [day], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    if (existingRecord.length > 0) {
      conexion.query(`UPDATE cuadrante SET ? WHERE day = ?`, [data, day], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Error al actualizar datos en la base de datos' });
        }
        res.status(200).json({ message: `Datos actualizados para el día ${day}` });
      });
    } else {
      conexion.query(`INSERT INTO cuadrante SET ?`, { day, ...data }, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Error al insertar datos en la base de datos' });
        }
        res.status(200).json({ message: `Datos insertados para el día ${day}` });
      });
    }
  } catch (err) {
    console.error('Error al insertar o actualizar datos en la base de datos:', err.message);
    res.status(500).json({ error: 'Error al insertar o actualizar datos en la base de datos' });
  }
});

export default app;