const sqlite3 = require('sqlite3').verbose();
const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde el directorio 'public'
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));

// Ruta para servir index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Ruta para servir cuadrante.html
app.get("/cuadrante", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/cuadrante.html'));
});

// Ruta para server gestion.html
app.get("/gestion", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/gestion.html'));
});

// ------------------------------------------------

// Ruta para primera semana.html
app.get("/cuadrante/primera_semana", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/Semanas/primera_semana.html'));
});

// Ruta para segunda semana.html
app.get("/cuadrante/segunda_semana", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/Semanas/segunda_semana.html'));
});

// Ruta para tercera semana.html
app.get("/cuadrante/tercera_semana", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/Semanas/tercera_semana.html'));
});

// Ruta para cuarta semana.html
app.get("/cuadrante/cuarta_semana", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/Semanas/cuarta_semana.html'));
});

// Ruta para quinta semana.html
app.get("/cuadrante/quinta_semana", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/Semanas/quinta_semana.html'));
});

// ------------------------------------------------

// Abre una base de datos
let db = new sqlite3.Database('./cuadrante.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
  });
  
  // Crear una tabla (ejemplo)
  db.run(`CREATE TABLE IF NOT EXISTS cuadrante (
    day TEXT PRIMARY KEY,
    acousticGuitar TEXT,
    electricGuitar TEXT,
    bass TEXT,
    drums TEXT,
    trumpet TEXT,
    acousticGuitar2 TEXT,
    piano TEXT,
    director TEXT,
    voz1 TEXT,
    voz2 TEXT,
    voz3 TEXT,
    voz4 TEXT,
    song1 TEXT,
    song2 TEXT,
    song3 TEXT
  )`);
  
  // Ruta para insertar o actualizar datos en la base de datos
  app.post('/api/cuadrante', (req, res) => {
    const { day, acousticGuitar, electricGuitar, bass, drums, trumpet, acousticGuitar2, piano, director, voz1, voz2, voz3, voz4, song1, song2, song3 } = req.body;

    // Verifica si ya existe un registro con la misma clave primaria (day)
    db.get('SELECT * FROM cuadrante WHERE day = ?', [day], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (row) {
        // Si el registro ya existe, actualiza los campos con los nuevos valores
        db.run(`UPDATE cuadrante SET 
          acousticGuitar = ?,
          electricGuitar = ?,
          bass = ?,
          drums = ?,
          trumpet = ?,
          acousticGuitar2 = ?,
          piano = ?,
          director = ?,
          voz1 = ?,
          voz2 = ?,
          voz3 = ?,
          voz4 = ?,
          song1 = ?,
          song2 = ?,
          song3 = ?
          WHERE day = ?`,
          [
            acousticGuitar,
            electricGuitar,
            bass,
            drums,
            trumpet,
            acousticGuitar2,
            piano,
            director,
            voz1,
            voz2,
            voz3,
            voz4,
            song1,
            song2,
            song3,
            day
          ],
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: `Datos actualizados para el día ${day}` });
          }
        );
      } else {
        // Si el registro no existe, inserta un nuevo registro en la base de datos
        const insert = `INSERT INTO cuadrante (
          day,
          acousticGuitar,
          electricGuitar,
          bass,
          drums,
          trumpet,
          acousticGuitar2,
          piano,
          director,
          voz1,
          voz2,
          voz3,
          voz4,
          song1,
          song2,
          song3
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(insert, [day, acousticGuitar, electricGuitar, bass, drums, trumpet, acousticGuitar2, piano, director, voz1, voz2, voz3, voz4, song1, song2, song3], function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ message: `Datos insertados para el día ${day}` });
        });
      }
    });
  });
  
  // Ruta para obtener datos de la base de datos
  app.get('/api/cuadrante/:day', (req, res) => {
    const day = req.params.day;
    db.get(`SELECT * FROM cuadrante WHERE day = ?`, [day], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(row);
    });
  });

// Escuchar el puerto
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
