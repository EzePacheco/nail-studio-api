import { Client } from '@prisma/client';
import { BaseRepository, db } from './base.repository';

// 1. Definimos los tipos de entrada
type ClientCreateInput = { name: string, phone: string, email: string };
type ClientUpdateInput = Partial<ClientCreateInput>;

// 2. Definimos y exportamos la clase Repositorio
export class ClientRepository implements BaseRepository<Client, ClientCreateInput, ClientUpdateInput> {
    async create(data: ClientCreateInput): Promise<Client> {
        return db.client.create({ data });
    }

    async findAll(): Promise<Client[]> {
        return db.client.findMany();
    }

    async findById(id: number): Promise<Client | null> {
        return db.client.findUnique({ where: { id } });
    }

    async update(id: number, data: ClientUpdateInput): Promise<Client> {
        return db.client.update({
            where: {id},
            data
        });
    }

    async delete(id: number): Promise<Client> {
        return db.client.delete({
            where: {id}
        });
    }
}

// Exportamos la instancia
export const clientRepository = new ClientRepository();