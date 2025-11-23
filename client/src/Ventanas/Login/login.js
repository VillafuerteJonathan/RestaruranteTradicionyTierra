import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, EyeOff } from 'react-feather';
import logo from '../../assets/logon.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      // Suponiendo que te devuelve un token si todo va bien
      localStorage.setItem('token', response.data.token);
      navigate('/gestion'); // Redirige a la ventana de gestión o donde desees
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setError(data.message || 'Todos los campos son obligatorios');
        } else if (status === 404) {
          setError('Usuario no encontrado');
        } else if (status === 401) {
          setError('Credenciales inválidas');
        } else {
          setError('Error en el servidor. Inténtalo de nuevo más tarde.');
        }
      } else {
        setError('No se pudo conectar con el servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };
    

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
      </header>
      
      <div className="login-container">
        <div className="login-card">
          <h4 className="card-title">Iniciar Sesión</h4>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group d-flex align-items-center">
              <input
                type={mostrarContrasenia ? 'text' : 'password'}
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                onClick={toggleMostrarContrasenia}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              >
                {mostrarContrasenia ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {error && <div className="alert alert-danger mt-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 mt-2" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            <button
              type="button"
              className="btn btn-secondary w-100 mt-3"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;