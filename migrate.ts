// migrate.ts
import 'dotenv/config'; 
import { spawn } from 'child_process';
import { resolve } from 'path';

// Comando a ejecutar
const args = process.argv.slice(2); 

// Ruta al binario de Prisma
const prismaBin = resolve(
  __dirname,
  'node_modules',
  '.bin',
  'prisma'
);

// Ejecutar el comando de Prisma
const child = spawn(
  'ts-node', // Usamos ts-node para ejecutar Prisma a través de Node
  [prismaBin, ...args],
  { stdio: 'inherit' }
);

child.on('error', (err) => {
  console.error(`Error al ejecutar Prisma: ${err.message}`);
  process.exit(1);
});