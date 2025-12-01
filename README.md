# 💅 Nail Studio API - Gestión de Turnos y Servicios

## 🚀 Estado del Proyecto
![Badge de Estado](https://img.shields.io/badge/Estado-En%20Desarrollo%20(Fase%201)-blue)
![Badge de Versión](https://img.shields.io/badge/Versi%C3%B3n-0.1.0-orange)

API RESTful desarrollada con **Node.js y TypeScript** para la gestión de servicios y turnos de un estudio de uñas. El proyecto implementa una **arquitectura de capas** (Controlador, Servicio y Repositorio) para asegurar la escalabilidad y la separación de responsabilidades.

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

### Aplica la migración inicial de tablas (Service, Client, Appointment)
```bash
npm run prisma:migrate -- --name init_structure
```

### Genera el cliente de Prisma para TypeScript
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
```

### 🌎 Endpoints Actuales (Fase 1: Servicios)
Utiliza Postman o herramientas similares para probar los endpoints en la **URL base:** http://localhost:3000.

### 1. Crear un Servicio
| Propiedad       | Valor                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| **URL**         | `/services`                                                                      |
| **Método**      | `POST`                                                                           |
| **Body (JSON)** | `json { "name": "Esmaltado Semipermanente", "duration": 60, "price": 8500.00 } ` |
| **Función**     | Crea un nuevo servicio en el catálogo.                                           |
| **Respuesta**   | `201 Created`                                                                    |


### 2. Obtener Servicios Activos
| Propiedad     | Valor                                               |
| ------------- | --------------------------------------------------- |
| **URL**       | `/services`                                         |
| **Método**    | `GET`                                               |
| **Función**   | Devuelve un listado de todos los servicios activos. |
| **Respuesta** | `200 OK` (Array de servicios)                       |
