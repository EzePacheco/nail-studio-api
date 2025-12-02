import express, { Application } from 'express';
import { envs } from './config/envs';
import clientRouter from './routes/client.routes'
import serviceRouter from './routes/service.routes'

import { db } from './config/prisma';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.json()); // ? Permite a Express leer el cuerpo de las peticiones en formato JSON
app.use('/services', serviceRouter)
app.use('/clients', clientRouter)

// Ruta de prueba
app.get('/', (req, res) => {
    res.send(' Nail Studio API - Status OK')
});

// Conexión a la base de datos (solo para verificar)
db.$connect()
    .then(() => {
        console.log('✅ Conexion a PostgreSQL establecida con exito.');

        // Iniciamos el servidor SOLO despues de conectar a la DB
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on ${envs.PORT} (${envs.NODE_ENV})`);
        });
    })
    .catch((e)=>{
        console.error('Error al conectar a PostgreSQL:', e.message);
        process.exit(1); //! Detiene la app si la conexion a la DB falla.
    })
