import { Client } from '@prisma/client';

// Importamos SOLO la clase Repository
import { ClientRepository, clientRepository } from '../repositories/client.repository';

export class ClientService {
    // Inyeccion de dependencias (DI)
    // Si la aplicacion se hace grande, podemos cambiar el repositorio sin tocar el servicio.
    private clientRepository: ClientRepository;

    constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository;
    }


    /**
     * Logica del negocio: Obtener todos los servicios activos 
     */

    async getAllClients(): Promise<Client[]> {
        // Regla de Negocio simple: Solo queremos los servicios que esten activos (is_active: true)
        // El repositorio ya lo filtra , pero podemos agregar mas logica (ej: ordenar por precio)
        const clients = await this.clientRepository.findAll();

        if (clients.length === 0) {
            throw new Error('No hay clientes registrados');
        }

        return clients;
    }
    /**
       * Lógica de Negocio: Crear un nuevo servicio
    */

    async createClient(data: { name: string, phone: string, email: string }): Promise<Client> {
        // Validaciones básicas
        if (!data.name || data.name.trim().length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres');
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!data.phone || !phoneRegex.test(data.phone.replace(/[\s-]/g, ''))) {
            throw new Error('El teléfono debe tener entre 10 y 15 dígitos');
        }

        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                throw new Error('El formato del email no es válido');
            }
        }

        return this.clientRepository.create(data);
    }

    /**
    * Obtener un cliente por ID
    */
    async getClientById(id: number): Promise<Client> {
        const client = await this.clientRepository.findById(id)

        if (!client) {
            throw new Error(`Cliente con id ${id} no encontrado`);
        }

        return client
    }

    /**
     * Actualizar un cliente
     */

    async updateClient(id: number, data: { name?: string, phone?: string, email?: string }): Promise<Client> {
        // Verificamos que el cliente existe
        await this.getClientById(id);

        // Validaciones si vienen datos
        if (data.name !== undefined && data.name.trim().length < 2) {
            throw new Error(`El nombre debe tener al menos 2 caracteres.`);
        }

        if (data.phone !== undefined) {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s-]/g, ''))) {
                throw new Error('El teléfono debe tener entre 10 y 15 dígitos');
            }
        }

        if (data.email !== undefined && data.email !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                throw new Error('El formato del email no es válido');
            }
        }

        return this.clientRepository.update(id, data);
    }

    /**
     * Eliminar un cliente
     */
    async deleteClient(id: number): Promise<Client>{
        // Verificar si el cliente existe
        await this.getClientById(id);
        // TODO: Verificar que no tenga turnos activos antes de eliminar
        
        return this.clientRepository.delete(id)
    }

}

// Exportamos la instancia unica (Usando el repositorio que ya exportamos)
export const clientService = new ClientService(clientRepository);