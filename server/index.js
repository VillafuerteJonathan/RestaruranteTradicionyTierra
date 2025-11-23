// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const platosRoutes = require('./routes/platosRoutes');
const authRoutes = require('./routes/authRoutes'); // <- nuevo

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/platos', platosRoutes);
app.use('/api/auth', authRoutes); // <- nuevo

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
