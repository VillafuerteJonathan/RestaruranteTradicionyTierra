# 🍽️ Restaurante Tradición y Tierra
Sistema Web Completo • React + Node.js + Express + Base de Datos

Este proyecto es un sistema web creado para gestionar la carta de un restaurante, mostrando al público los platos disponibles, su descripción, precio e imagen, y ofreciendo un panel de administración para modificar, agregar o eliminar la información de los platos.

El sistema está dividido en dos módulos:

Frontend (React) → Vista pública + Login + Panel de gestión

Backend (Node.js + Express) → API REST + conexión a base de datos + carga de imágenes

---

# 📁 Estructura del Proyecto

```txt
restaurant/
│
├── client/              # Frontend (React)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── Ventanas/
│       │   ├── Gestion/
│       │   ├── Home/
│       │   ├── Login/
│       │   └── QuienesSomos/
│       ├── App.js
│       └── ...
│
└── server/              # Backend (Node.js + Express)
    ├── controllers/
    ├── models/
    ├── routes/
    ├── uploads/
    ├── db.js
    ├── index.js
    └── .env

```
# 🚀 Funcionalidades Principales
🌐 Frontend (React)

-Página de inicio con presentación del restaurante.

-Sección de platos disponibles, imagen, precio e ingredientes.

-Página Quiénes Somos e Historia del Restaurante.

-Sección de Contáctanos.

  -Login para administradores.

-Panel de administración para:

-Crear platos

-Editar platos

-Eliminar platos

-Subir imágenes

-Diseño adaptable (responsive)

---

# 🛠️ Backend (Node.js + Express)
-API RESTful organizada por rutas, modelos y controladores.

-Gestión completa de platos (CRUD).

-Carga de imágenes con Multer.

-Conexión a base de datos.

-Variables de entorno con .env.

-Sistema de autenticación para administradores.

-Servidor optimizado para producción.

---

## 🧰 Tecnologías Utilizadas
-Frontend

-React

-React Router

-CSS / HTML

-Fetch API / Axios

-Backend

-Node.js

-Express.js

-Multer (subida de imágenes)

-MySQL / MongoDB (según tu implementación)

-dotenv

-CORS

---
# ⚙️ Instalación del Proyecto
#   1️⃣ Clonar el repositorio
```txt
git clone https://github.com/VillafuerteJonathan/RestaruranteTradicionyTierra.git
cd RestaruranteTradicionyTierra
```
---

# 🖥️ Instalación del Backend

```txt

cd server
npm install
```
Crear archivo .env:

```txt
JWT_SECRET=restaurante
```

Iniciar servidor:

```txt
npm start

```
---

# 💻 Instalación del Frontend

```txt
cd client
npm install
npm start

```

---

👨‍💻 Autor

Jonathan Villafuerte
📧 Eduardovillaquis2@gmail.com
