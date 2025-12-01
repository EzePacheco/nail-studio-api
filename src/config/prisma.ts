import { PrismaClient } from "@prisma/client";

// Creamos una variable global para el cliente
let prisma: PrismaClient;

// Condicional para que en desarrollo use la variable global
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma
}

export const db = prisma;