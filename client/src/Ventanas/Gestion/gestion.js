import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './gestion.css';
import logo from '../../assets/logo.png';

function App() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [platos, setPlatos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const limpiarCampos = () => {
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setImagen(null);
    setEditar(false);
    setId(null);
  };

  const getListado = () => {
    Axios.get("http://localhost:3001/api/platos")
      .then((response) => {
        setPlatos(response.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error al obtener platos",
          text: "Verifique que el backend esté activo",
        });
      });
  };

  const add = () => {
    if (!nombre || !precio || !descripcion || !imagen) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de registrar.'
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);

    Axios.post("http://localhost:3001/api/platos", formData)
      .then(() => {
        getListado();
        limpiarCampos();
        Swal.fire({
          title: "Registro exitoso",
          html: `El plato <strong>${nombre}</strong> se registró con éxito`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message === "Network Error"
            ? "Error de red. Intente más tarde."
            : error.message,
        });
      });
  };

  const update = () => {
    if (!nombre || !precio || !descripcion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Nombre, precio y descripción son obligatorios para actualizar.'
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);
    if (imagen) formData.append("imagen", imagen);

    Axios.put(`http://localhost:3001/api/platos/${id}`, formData)
      .then(() => {
        getListado();
        limpiarCampos();
        Swal.fire({
          title: "Actualización exitosa",
          html: `El plato <strong>${nombre}</strong> fue actualizado`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message === "Network Error"
            ? "Error de red. Intente más tarde."
            : error.message,
        });
      });
  };

  const eliminar = (plato) => {
    Swal.fire({
      title: "¿Eliminar plato?",
      html: `¿Está seguro de eliminar <strong>${plato.nombre}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/api/platos/${plato.id}`)
          .then(() => {
            getListado();
            Swal.fire("Eliminado", `${plato.nombre} fue eliminado`, "success");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message === "Network Error"
                ? "Error de red. Intente más tarde."
                : error.message,
            });
          });
      }
    });
  };

  const editarPlato = (plato) => {
    setEditar(true);
    setNombre(plato.nombre);
    setPrecio(plato.precio);
    setDescripcion(plato.descripcion || "");
    setImagen(null); // Deja imagen null para no forzar cambio si no se carga nueva
    setId(plato.id);
  };

  useEffect(() => {
    getListado();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className='container'>
      <header className="header-gestion">
        <img src={logo} alt="Logo" className="logo" />
        {isLoggedIn ? (
          <div className="btn-group">
            <button className="admin-buttong" onClick={() => navigate('/')}>
              Inicio
            </button>
            <button className="login-buttong" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button className="login-buttong" onClick={() => navigate('/login')}>
            Iniciar sesión
          </button>
        )}
      </header>

      <div className="card text-center mt-4">
        <div className="card-header">Gestión de Platos</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre:</span>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Precio:</span>
            <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Descripción:</span>
            <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Imagen:</span>
            <input type="file" className="form-control" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
          </div>
        </div>
        <div className="card-footer">
          {editar ? (
            <>
              <button className="btngestion" onClick={update}>Actualizar</button>
              <button className="btngestion" onClick={limpiarCampos}>Cancelar</button>
            </>
          ) : (
            <button className="btngestion" onClick={add}>Registrar</button>
          )}
        </div>
      </div>

      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => (
            <tr key={plato.id}>
              <td>{plato.id}</td>
              <td>{plato.nombre}</td>
              <td>${parseFloat(plato.precio).toFixed(2)}</td>
              <td>
                {plato.imagen ? (
                  <img src={`http://localhost:3001${plato.imagen}`} alt={plato.nombre} width="100" style={{ borderRadius: "8px" }} />
                ) : (
                  <span>No hay imagen</span>
                )}
              </td>
              <td>{plato.descripcion}</td>
              <td>
                <div className="btn-group">
                  <button className="btngestion" onClick={() => editarPlato(plato)}>Editar</button>
                  <button className="btngestion" onClick={() => eliminar(plato)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
