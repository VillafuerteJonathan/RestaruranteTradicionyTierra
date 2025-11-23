const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  crearPlato,
  obtenerPlatos,
  actualizarPlato,
  eliminarPlato
} = require('../controllers/platosController');

// Configuración de subida de archivos
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadPath),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Rutas
router.post('/', upload.single('imagen'), crearPlato);
router.get('/', obtenerPlatos);
router.put('/:id', upload.single('imagen'), actualizarPlato);
router.delete('/:id', eliminarPlato);

module.exports = router;
