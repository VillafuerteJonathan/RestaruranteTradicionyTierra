const path = require('path');
const fs = require('fs');
const db = require('../db');

// Crear nuevo plato
const crearPlato = (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nombre || !precio || !imagen || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = 'INSERT INTO platos (nombre, imagen, precio, descripcion) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, imagen, precio, descripcion], (err) => {
    if (err) {
      console.error('Error al insertar plato:', err);
      return res.status(500).json({ error: 'Error al registrar el plato' });
    }

    res.status(201).json({ message: 'Plato creado exitosamente' });
  });
};

// Obtener todos los platos
const obtenerPlatos = (_, res) => {
  db.query('SELECT * FROM platos', (err, results) => {
    if (err) {
      console.error('Error al obtener platos:', err);
      return res.status(500).json({ error: 'Error al obtener los platos' });
    }

    res.json(results);
  });
};

// Actualizar plato
const actualizarPlato = (req, res) => {
  const { id } = req.params;
  const { nombre, precio , descripcion } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  const sql = imagen
    ? 'UPDATE platos SET nombre = ?, precio = ?, imagen = ? , descripcion = ? WHERE id = ?'
    : 'UPDATE platos SET nombre = ?, precio = ? , descripcion = ? WHERE id = ?';
  const params = imagen ? [nombre, precio,  descripcion, imagen, id] : [nombre, precio,descripcion, id];

  db.query(sql, params, (err) => {
    if (err) {
      console.error('Error al actualizar plato:', err);
      return res.status(500).json({ error: 'Error al actualizar el plato' });
    }

    res.json({ message: 'Plato actualizado correctamente' });
  });
};

// Eliminar plato
const eliminarPlato = (req, res) => {
  const { id } = req.params;

  db.query('SELECT imagen FROM platos WHERE id = ?', [id], (err, result) => {
    if (err || result.length === 0) {
      console.error('Error al encontrar el plato:', err);
      return res.status(500).json({ error: 'No se pudo encontrar el plato' });
    }

    const imagenRelativa = result[0].imagen;
    const imagenPath = path.join(__dirname, '..', imagenRelativa);

    fs.access(imagenPath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(imagenPath, (err) => {
          if (err) {
            console.warn(`Error al eliminar imagen ${imagenRelativa}:`, err.message);
          } else {
            console.log(`Imagen ${imagenRelativa} eliminada correctamente.`);
          }
        });
      }
    });

    db.query('DELETE FROM platos WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Error al eliminar plato de la base de datos:', err);
        return res.status(500).json({ error: 'Error al eliminar el plato' });
      }

      res.json({ message: 'Plato eliminado correctamente' });
    });
  });
};

module.exports = {
  crearPlato,
  obtenerPlatos,
  actualizarPlato,
  eliminarPlato,
};
