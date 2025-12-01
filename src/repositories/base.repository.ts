import { db } from '../config/prisma';
import { Prisma } from '@prisma/client';

// Definimos los tipos de argumentos para las consultas de Prisma
type Model = Prisma.ModelName;

// Una interfaz generica que define las operaciones CRUD basicas
export interface BaseRepository<T, CreateInput, UpdateInput> {
    create(data: CreateInput): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    update(id: number, data: UpdateInput): Promise<T>;
    delete(id: number): Promise<T>;
}

export { db }