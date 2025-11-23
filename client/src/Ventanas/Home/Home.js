import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import logo from '../../assets/logon.png'; 
import publicidad from '../../assets/publicidad3.mp4'; // Asegúrate de que la ruta sea correcta
import "./Home.css";
import baner1 from '../../assets/carrusel/baner1.png';
import baner2 from '../../assets/carrusel/baner2.png';
import baner3 from '../../assets/carrusel/baner3.png';
import somos from '../../assets/imagen1.png';
import historia from '../../assets/imagen2.png';

const carouselImages = [baner1, baner2, baner3];


const ElegantDishesApp = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  // Estado para saber si usuario está logueado (token en localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/platos")
      .then((res) => {
        setDishes(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar los platos:", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // eliminar token
    setIsLoggedIn(false);
    navigate('/'); // o a la ruta que quieras de home
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Carousel data

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [carouselImages.length]);

  // History and About Us data
  const historyContent = {
    image: historia,
  text: ` El nombre “Raíces de Mi Tierra” fue
 seleccionado por su profundo simbolismo,
 ya que transmite un fuerte sentido de
 identidad cultural y pertenencia. Hace
 referencia a la herencia, la tradición y los
 sabores autóctonos de la cocina típica de
 Pinllo. Su tono emocional es cálido,
 nostálgico y familiar, apelando al orgullo
 por lo propio y a la conexión con las raíces.
 Además, refleja autenticidad y sugiere una
 propuesta gastronómica basada en platos
 tradicionales, caseros y representativos de
 la cultura local.
`
  };

 const aboutUsContent = {
  image: somos,
  text: `Raíces de Mi Tierra es un restaurante familiar que nace del amor por la tradición y el sabor auténtico de la parroquia Pinllo, ubicada en la ciudad de Ambato. Nuestra misión es rescatar
y compartir la riqueza gastronómica de nuestra tierra, ofreciendo platos típicos preparados
con recetas ancestrales y productos frescos de la región.

Nos especializamos en delicias tradicionales como el llapingacho, la fritada, el mote con
chicharrón, y otras joyas culinarias que representan el alma y la identidad de nuestro
pueblo. Cada plato es una experiencia que conecta con la historia, los aromas y los sabores
de nuestros antepasados.

En Raíces de Mi Tierra no solo servimos comida: celebramos nuestras raíces, valoramos
nuestras costumbres y ofrecemos un ambiente cálido donde cada cliente se sienta como en casa.`
};


  return (
    <>
      <style>{`
         @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

        :root {
          --color-bg: #000000;
          --color-bg-secondary: #111111;
          --color-text-primary: #ffffff;
          --color-text-secondary: #b0b0b0;
          --color-accent: #ffffff;
          --border-radius: 0.75rem;
          --transition-speed: 0.3s;
          --card-shadow: rgba(255,255,255,0.1);
        }
        body, html, #root {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          color: var(--color-text-primary);
          background: var(--color-bg);
          scroll-behavior: smooth;
        }

        header {
          position: sticky;
          top: 0;
          background: var(--color-bg-secondary);
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;

        }

        header img.logo {
          height: 100px;
          width: 200;
         margin-top: -10px
        }

        nav {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          
        }

        nav button {
         font-family: 'DM Serif Display', serif;
          background: transparent;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-text-primary);
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          transition: color var(--transition-speed), background-color var(--transition-speed);
        }

        nav button:hover,
        nav button:focus {
          background-color: var(--color-text-primary);
          color: var(--color-bg-secondary);
          outline: none;
        }

        .login-button, .admin-button {
          background-color: var(--color-text-primary);
          color: var(--color-bg-secondary);
          border: none;
          border-radius: var(--border-radius);
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: background-color var(--transition-speed);
        }
        .login-button:hover, .admin-button:hover,
        .login-button:focus, .admin-button:focus{
          background-color: #ccc;
          color: var(--color-bg-secondary);
          outline: none;
        }

        /* Carousel styles */
        .carousel {
          position: relative;
          max-width: 1200px;
          height: 320px;
          margin: 2rem auto;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 8px 24px var(--card-shadow);
          background: var(--color-bg-secondary);
        }

        .carousel-image {
          position: absolute;
          width: 100%;
          height: 320px;
          object-fit: cover;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          user-select:none;
          filter: brightness(0.7);
        }

        .carousel-image.active {
          opacity: 1;
          position: relative;
        }

        /* Dishes listing */
        .dishes-list {
          max-width: 1200px;
          margin: 2rem auto 4rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
          gap: 2rem;
          padding: 0 1rem;
        }

        .card {
          background: var(--color-bg-secondary);
          border-radius: var(--border-radius);
          box-shadow: 0 4px 12px var(--card-shadow);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: box-shadow var(--transition-speed), transform var(--transition-speed);
          user-select:none;
        }
        .card:hover, .card:focus-within {
          box-shadow: 0 12px 36px rgba(255 255 255 / 0.3);
          transform: translateY(-4px);
          outline:none;
        }

        .image-wrapper {
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(255 255 255 / 0.15);
          margin-bottom: 1rem;
          height: 180px;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-speed);
          border-radius: var(--border-radius);
          user-select:none;
        }
        .card:hover img {
          transform: scale(1.05);
        }

        h2, h3 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-primary);
          font-weight: 700;
          user-select:none;
          font-family: 'DM Serif Display', serif;
        }
        h2 {
          font-size: 1.5rem;
          font-family: 'DM Serif Display', serif;
        }
        h3 {
          font-size: 1.3rem;
          font-family: 'DM Serif Display', serif;
        }

        p {
          margin: 0 0 0.75rem 0;
          color: var(--color-text-secondary);
          font-weight: 500;
          user-select:none;
          font-family: 'Quicksand', sans-serif;
          text-align: justify;
        }

        /* History and About Us styles */
        .info-section {
          max-width: 1200px;
          margin: 2rem auto 4rem auto;
          background: var(--color-bg-secondary);
          border-radius: var(--border-radius);
          box-shadow: 0 6px 20px var(--card-shadow);
          display: flex;
          align-items: center;
          padding: 2rem;
          gap: 2rem;
          user-select:none;
          color: var(--color-text-primary);
        }
        .info-left {
          flex-direction: row;
        }
        .info-right {
          flex-direction: row-reverse;
        }
        .info-section img {
          width: 50%;
          border-radius: var(--border-radius);
          object-fit: cover;
          width: 300px;
  
       }
        .info-section div {
          width: 80%;
        }
        .info-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }
        .info-section p {
          font-weight: 500;
          color: var(--color-text-secondary);
          font-size: 1.1rem;
          margin: 0;
        }

        /* Hours Section minimal */
        .hours {
          max-width: 1200px;
          margin: 2rem auto 3rem auto;
          padding: 0 1rem;
          text-align: center;
          color: var(--color-text-secondary);
          user-select:none;
        }
        .hours h2 {
          font-size: 1.75rem;
          color: var(--color-text-primary);
          margin-bottom: 0.75rem;
          font-weight: 700;
          font-family: 'DM Serif Display', serif;
        }
        .hours p {
          font-weight: 500;
          font-size: 1.1rem;
          margin: 0.25rem 0;
          text-align: justify;
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .info-section {
            flex-direction: column !important;
          }
          .info-section img, .info-section div {
            width: 100% !important;
          }
          .dishes-list {
            grid-template-columns: 1fr !important;
          }
             @media (max-width: 768px) {
          .section {
            flex-direction: column;
          }
          header {
            flex-direction: column;
            height: auto;
            gap: 1rem;
          }
          nav {
            flex-wrap: wrap;
            justify-content: center;
          }
        .carousel {
  height: 220px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain; /* Evita recorte y distorsión */
  display: block;
  margin: 0 auto;
  filter: brightness(0.9); /* Puedes ajustar si quieres oscurecer */
  transition: opacity 0.8s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.carousel-image.active {
  opacity: 1;
  position: relative;
}

.image-wrapper {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.section .image-container,
.section .text-container {
  flex: 1 1 100%;
}

            
        }
      `}</style>

      {/* Header with nav buttons */}
      <header role="banner" aria-label="Encabezado principal">
        <img src={logo} alt="Logo" className="logo" />
        <nav role="navigation" aria-label="Navegación principal">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Inicio</button>
          <button
  type="button"
  onClick={() => {
    const section = document.getElementById('dishes-section');
    const offset = 150; // ajusta según la altura de tu header
    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }}
  
>
  
  Platos
</button>

<button
  type="button"
  onClick={() => {
    const section = document.getElementById('history-section');
    const offset = 100;
    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }}
>
  Historia
</button>

<button
  type="button"
  onClick={() => {
    const section = document.getElementById('aboutus-section');
    const offset = 100;
    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }}
>
  Quiénes Somos
</button>
<button
  type="button"
  onClick={() => {
    const section = document.getElementById('footer-section');
    const offset = 100;
    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }}
>
  Contactanos
</button>

          {isLoggedIn ? (
            <>
              <button className="admin-button" onClick={() => window.location.href = "/gestion"}>Administrador</button>
              <button className="login-button" onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <button className="login-button" onClick={handleLoginRedirect}>Iniciar sesión</button>
          )}
        </nav>
      </header>

      {/* Carousel (after header) */}
      <section id="carousel-section" className="carousel" aria-label="Carrusel de imágenes">
        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagen del carrusel número ${index + 1}`}
            className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
            aria-hidden={index !== currentImageIndex}
          />
        ))}
      </section>
<section className="hours" aria-label="Horarios de atención" id="dishes-section">
        <h2>MENU DEL DIA </h2> 
        </section>
      {/* Platos list (below carousel) */}
      <section  className="dishes-list" role="region" aria-label="Lista de platos">
        {dishes.map(({ id, nombre, descripcion, imagen, precio }) => (
          <article key={id} className="card" tabIndex={0} aria-labelledby={`dish-title-${id}`}>
            <div className="image-wrapper" aria-hidden="true">
              <img
                src={`http://localhost:3001${imagen}`}
                alt={`Foto de ${nombre}`}
                loading="lazy"
              />
            </div>
            <h3 id={`dish-title-${id}`}>{nombre}</h3>
            <p>{descripcion || "Sin descripción"}</p>
            <p><strong>Precio:</strong> {isNaN(Number(precio)) ? "N/A" : `$${Number(precio).toFixed(2)}`}</p>
          </article>
        ))}
      </section>
      <section className="video-section" aria-label="Video de presentación">
  <h2 className="video-title">Amor por la tradición y el sabor auténtico</h2>
  <div className="video-container">
      <video 
      src={publicidad}
      controls 
      autoPlay 
      muted 
      loop 
    />

  </div>
</section>


      {/* History section */}
      <section id="history-section" className="info-section info-left" aria-label="Nuestra historia">
        <img src={historyContent.image} alt="Imagen historia" />
        <div>
          <h2>Nuestra Historia</h2>
          <p>{historyContent.text}</p>
        </div>
      </section>

      {/* Quienes somos section */}
      <section id="aboutus-section" className="info-section info-right" aria-label="Quiénes somos">
        <img src={aboutUsContent.image} alt="Imagen quienes somos" />
        <div>
          <h2>Quiénes Somos</h2>
          <p>{aboutUsContent.text}</p>
        </div>
      </section>

      {/* Hours section */}
      <footer role="contentinfo" class="footer" id="footer-section" aria-label="Pie de página">
    <div class="footer-container">
      <section class="footer-section" aria-label="Redes sociales">
        <h4>Síguenos</h4>
        <div class="social-links">
          <a href="https://facebook.com" target="_blank"  aria-label="Facebook" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
  <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
  </svg></a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48"> 
  <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
  </svg></a>
          <a href="https://instagram.com" target="_blank"  aria-label="Instagram" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
  <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
  </svg></a>
          <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" tabindex="0">
          
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 256 256">
    
    <g fill="#000000" fill-rule="nonzero">
      <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
    </g>
    
    
    <g fill="#ffffff" fill-rule="nonzero">
      <g transform="scale(5.12,5.12)">
        <path d="M41,4h-32c-2.757,0 -5,2.243 -5,5v32c0,2.757 2.243,5 5,5h32c2.757,0 5,-2.243 5,-5v-32c0,-2.757 -2.243,-5 -5,-5zM37.006,22.323c-0.227,0.021 -0.457,0.035 -0.69,0.035c-2.623,0 -4.928,-1.349 -6.269,-3.388c0,5.349 0,11.435 0,11.537c0,4.709 -3.818,8.527 -8.527,8.527c-4.709,0 -8.527,-3.818 -8.527,-8.527c0,-4.709 3.818,-8.527 8.527,-8.527c0.178,0 0.352,0.016 0.527,0.027v4.202c-0.175,-0.021 -0.347,-0.053 -0.527,-0.053c-2.404,0 -4.352,1.948 -4.352,4.352c0,2.404 1.948,4.352 4.352,4.352c2.404,0 4.527,-1.894 4.527,-4.298c0,-0.095 0.042,-19.594 0.042,-19.594h4.016c0.378,3.591 3.277,6.425 6.901,6.685z"></path>
      </g>
    </g>
  </svg>

          </a>
        </div>
      </section>
      <section class="footer-section" aria-label="Información y ubicación">
        <h4>Información</h4>
        <p>Dirección: Calle schuarts y la crónica</p>
        <p>Pinllo - Ambato</p>
        <p>Horario: Sabado y Domingo 08:00 - 18:00</p>
         <p>Email: raicesdemitierra@gmail.com</p>
        
      </section>
      <section class="footer-section footer-contact" aria-label="Contacto">
  <h4>Pedidos a domicilio</h4>
  <a href="https://wa.me/593979000679" target="_blank" aria-label="Contactar por WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 5 48 48">
      <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/>
      <path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"/>
      <path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5"/>
      <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/>
      <path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"/>
    </svg>
  </a>
  <h6>No te quedes sin tu menú, WhatsApp disponible</h6>
  <p>Contacto: <a href="https://wa.me/593979000679" target="_blank">+593 979 000 679</a></p>
</section>

    </div>
  </footer>
    </>
  );
};

export default ElegantDishesApp;
