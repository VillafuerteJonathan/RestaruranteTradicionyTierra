import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Ventanas/Home/Home';
import Login from './Ventanas/Login/login';
import Gestion from './Ventanas/Gestion/gestion';
// Puedes agregar más ventanas aquí cuando las crees, como QuienesSomos, Gestion, etc.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gestion" element={<Gestion />} /> 
        {/* Otras rutas futuras:
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
