# 💅 Nail Studio API - Gestión de Turnos y Servicios

## 🚀 Estado del Proyecto
![Badge de Estado](https://img.shields.io/badge/Estado-En%20Desarrollo%20(Fase%202%20Completada)-green)
![Badge de Versión](https://img.shields.io/badge/Versi%C3%B3n-0.3.0-orange)

API RESTful desarrollada con **Node.js y TypeScript** para la gestión de servicios, clientes y turnos de un estudio de uñas. El proyecto implementa una **arquitectura de capas** (Controlador, Servicio y Repositorio) para asegurar la escalabilidad y la separación de responsabilidades. 

[Image of layered architecture request flow nodejs]

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
Crear archivo .env basado en .env.example:

```bash
cp .env.example .env
```

### 3. 📦 Instalación de Dependencias e Inicialización
Instala los paquetes de Node y aplica la estructura de la base de datos:
```bash
npm install
```

### 4. 🐳 Levantar la Base de Datos con Docker
⚠️ Asegurate de que el puerto 5432 esté libre.

Inicia el contenedor de PostgreSQL con Docker Compose:
```bash
docker compose up -d
```

Aplica las migraciones de la base de datos:
```bash
npm run prisma:migrate
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

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/appointments` | Obtener todos los turnos | - |
| `GET` | `/appointments/:id` | Obtener un turno por ID | - |
| `POST` | `/appointments` | Crear un nuevo turno | `{ "client_id": 1, "service_id": 1, "start_time": "2025-12-05T10:00:00Z" }` |
| `PATCH` | `/appointments/:id` | Actualizar un turno | `{ "start_time": "...", "status": "CONFIRMED" }` |
| `DELETE` | `/appointments/:id` | Eliminar un turno | 

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
- [x] **Fase 2**: Implementar gestión de Turnos (Appointments)
- [ ] **Fase 3**: Agregar validaciones con Zod
- [ ] **Fase 4**: Autenticación y autorización (JWT)
- [ ] **Fase 5**: Documentación con Swagger / OpenAPI
- [ ] **Fase 6**: Implementaion de Testing
- [ ] **Fase 7**: Logs estructurados
- [ ] **Fase 8**: Deploy productivo

---

## 👤 Autor y Agradecimientos

**Desarrollado por:** Ezequiel Pacheco

Este proyecto es parte de mi **aprendizaje en desarrollo backend** con Node.js, TypeScript y la arquitectura de capas. Cualquier *feedback* o sugerencia sobre la implementación es bienvenida.