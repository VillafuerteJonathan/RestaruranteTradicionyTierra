import { useEffect, useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

function Home() {
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/platos")
      .then((res) => setPlatos(res.data))
      .catch((err) => console.error("Error al cargar platos:", err));
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Encabezado */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
        <img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
        <button className="btn btn-outline-primary">Iniciar Sesión</button>
      </header>

      {/* Sección de demostración de platos */}
      <section className="p-4">
        <h2 className="text-center mb-4">Platos Destacados</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {platos.map((plato) => (
            <div className="col" key={plato.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:3001${plato.imagen}`}
                  className="card-img-top"
                  alt={plato.nombre}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{plato.nombre}</h5>
                  <p className="card-text text-success">${parseFloat(plato.precio).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
