import { Service } from '@prisma/client';
import { BaseRepository, db } from './base.repository';

// 1. Definimos los tipos de entrada (solo necesitamos el nombre para crear)
type ServiceCreateInput = { name: string, duration: number, price: number };
type ServiceUpdateInput = Partial<ServiceCreateInput>; // ! Usamos Partial para hacer todos los campos opcionales al actualizar

// 2. Definimos y exportamos la clase Repositorio
export class ServiceRepository implements BaseRepository<Service, ServiceCreateInput, ServiceUpdateInput> {
    // Implementacion de cada metodo
    async create(data: ServiceCreateInput): Promise<Service> {
        return db.service.create({ data });
    }

    async findAll(): Promise<Service[]> {
        return db.service.findMany({ where: { is_active: true } });
    }

    async findById(id: number): Promise<Service | null> {
        return db.service.findUnique({ where: { id } });
    }

    async update(id: number, data: ServiceUpdateInput): Promise<Service> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<Service> {
        throw new Error("Method not implemented.");
    }
}

// Exportamos la instancia
export const serviceRepository = new ServiceRepository();