# 💅 Nail Studio API - Gestión de Turnos y Servicios

## 🚀 Estado del Proyecto
![Badge de Estado](https://img.shields.io/badge/Estado-En%20Desarrollo%20(Fase%201%20Completada)-green)
![Badge de Versión](https://img.shields.io/badge/Versi%C3%B3n-0.2.0-orange)

API RESTful desarrollada con **Node.js y TypeScript** para la gestión de servicios, clientes y turnos de un estudio de uñas. El proyecto implementa una **arquitectura de capas** (Controlador, Servicio y Repositorio) para asegurar la escalabilidad y la separación de responsabilidades.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Lenguaje** | **TypeScript** | Desarrollo tipado y robusto. |
| **Framework** | **Express** | Servidor web y gestión de rutas HTTP. |
| **Base de Datos** | **PostgreSQL** | Base de datos relacional para persistencia. |
| **ORM** | **Prisma** | Cliente de base de datos y herramienta de migración. |
| **Contenedor** | **Docker Compose** | Entorno local y aislado para la DB. |
| **Arquitectura** | **Capas** | Patrón Repository y Service para la lógica de negocio. |

---

## 📊 Modelo de Datos

El proyecto cuenta con tres entidades principales:

- **Service**: Servicios ofrecidos por el estudio (ej: esmaltado, manicura, etc.)
- **Client**: Clientes registrados en el sistema
- **Appointment**: Turnos agendados (relaciona Cliente + Servicio + Fecha/Hora)

---

## ⚙️ Instalación y Puesta en Marcha

Sigue estos pasos para levantar el entorno de desarrollo:

### 1. Requisitos Previos

Asegúrate de tener instalado:
* **Node.js** (v18+)
* **npm**
* **Docker** y **Docker Compose**

### 2. Variables de Entorno y Seguridad

Crea un archivo llamado **`.env`** en la raíz del proyecto. **Este archivo está en el `.gitignore` y NUNCA debe subirse a GitHub.**

Utiliza la siguiente estructura para las variables de conexión local (los valores deben coincidir con tu `docker-compose.yml`):
```env
# Servidor Express
PORT=3000

# Configuración de la Base de Datos (PostgreSQL - Docker)
DB_HOST=localhost
DB_PORT=5432
DB_USER=user_nails
DB_PASSWORD=secret_password
DB_NAME=nail_studio_db

# Prisma
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
```

### 3. 🐳 Levantar la Base de Datos con Docker
Inicia el contenedor de PostgreSQL con Docker Compose:
```bash
docker compose up -d
```

### 4. 📦 Instalación de Dependencias e Inicialización
Instala los paquetes de Node y aplica la estructura de la base de datos:
```bash
npm install
```

Aplica las migraciones de la base de datos:
```bash
npm run prisma:migrate dev
```

Genera el cliente de Prisma para TypeScript:
```bash
npm run prisma:generate
```

### 5. 🚀 Iniciar el Servidor de Desarrollo
Ejecuta la aplicación. El servidor se iniciará solo si la conexión a PostgreSQL es exitosa:
```bash
npm run dev
```

Deberías ver la confirmación en la terminal: 
```bash
✅ Conexión a PostgreSQL establecida con éxito.
🚀 Servidor corriendo en http://localhost:3000
```

---

## 🌎 Endpoints Disponibles

Utiliza **Postman**, **Thunder Client** o herramientas similares para probar los endpoints.

**URL Base:** `http://localhost:3000`

### 📋 Servicios (`/services`)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/services` | Obtener todos los servicios | - |
| `GET` | `/services/:id` | Obtener un servicio por ID | - |
| `POST` | `/services` | Crear un nuevo servicio | `{ "name": "Manicura", "duration": 60, "price": 5000 }` |
| `PATCH` | `/services/:id` | Actualizar un servicio | `{ "name": "...", "duration": ..., "price": ... }` |
| `DELETE` | `/services/:id` | Eliminar un servicio | - |

### 👤 Clientes (`/clients`)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/clients` | Obtener todos los clientes | - |
| `GET` | `/clients/:id` | Obtener un cliente por ID | - |
| `POST` | `/clients` | Crear un nuevo cliente | `{ "name": "María García", "phone": "1145678901", "email": "maria@mail.com" }` |
| `PATCH` | `/clients/:id` | Actualizar un cliente | `{ "name": "...", "phone": "...", "email": "..." }` |
| `DELETE` | `/clients/:id` | Eliminar un cliente | - |

**Nota:** El campo `email` es opcional en clientes.

### 📅 Turnos (`/appointments`) - Próximamente

En desarrollo para la próxima versión.

---

## 🗂️ Estructura del Proyecto
```
src/
├── controllers/      # Manejo de peticiones HTTP
├── services/         # Lógica de negocio
├── repositories/     # Acceso a datos (Prisma)
├── routes/           # Definición de endpoints
├── models/           # Tipos e interfaces
└── config/           # Configuración (DB, etc.)
```

---

## 🚧 Roadmap

- [x] **Fase 1**: CRUD completo de Servicios y Clientes
- [ ] **Fase 2**: Implementar gestión de Turnos (Appointments)
- [ ] **Fase 3**: Agregar validaciones con Zod
- [ ] **Fase 4**: Autenticación y autorización
- [ ] **Fase 5**: Notificaciones y recordatorios

---

## 👨‍💻 Desarrollo

Este proyecto es parte de mi aprendizaje en desarrollo backend. Cualquier feedback o sugerencia es bienvenida.

**Universidad:** Universidad Nacional de Quilmes  
**Inicio de cursada:** Febrero 2026