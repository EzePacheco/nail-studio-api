import { Service } from '@prisma/client';
// Importamos SOLO la clase Repository, no la instancia db
import { ServiceRepository, serviceRepository } from '../repositories/service.repository';

export class ServiceService {
    // Inyeccion de dependencias (DI)
    // Si la aplicacion se hace grande, podemos cambiar el repositorio sin tocar el servicio.
    private serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }


    /**
     * Logica del negocio: Obtener todos los servicios activos 
     */

    async getAllActiveServices(): Promise<Service[]> {
        // Regla de Negocio simple: Solo queremos los servicios que esten activos (is_active: true)
        // El repositorio ya lo filtra , pero podemos agregar mas logica (ej: ordenar por precio)
        const services = await this.serviceRepository.findAll();

        if (services.length === 0) {
            throw new Error('No hay servicios activos disponibles');
        }

        return services;
    }

    /**
     * Obtener servicio por ID
     */

    async getServiceById(id: number): Promise<Service> {
        const service = await this.serviceRepository.findById(id);

        if (!service) {
            throw new Error(` Servicio con ID ${id} no encontrado`);
        }
        return service;
    }

    /**
     * Actualizar un servicio
     */

    async updateService(id: number, data: { name?: string, duration?: number, price?: number }): Promise<Service> {
        // Verificamos que el cliente existe
        await this.getServiceById(id);

        // Validaciones
        if (data.price !== undefined && data.price < 0) {
            throw new Error('El precio del servicio no puede ser negativo');
        }

        if (data.duration !== undefined && data.duration <= 0) {
            throw new Error('La duración debe ser mayor a 0 minutos');
        }

        if (data.name !== undefined && data.name.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres');
        }

        return this.serviceRepository.update(id, data);
    }

    /**
     * Eliminar un cliente
     */
    async deleteService(id: number): Promise<Service> {
        // Verificar si el cliente existe
        await this.getServiceById(id);
        
        // TODO: Verificar que no tenga turnos activos antes de eliminar

        return this.serviceRepository.delete(id)
    }

    /**
       * Lógica de Negocio: Crear un nuevo servicio
    */

    async createService(data: { name: string, duration: number, price: number }): Promise<Service> {
        // Regla de Negocio: Podemos validar que el precio no sea negativo
        if (data.price < 0) {
            throw new Error('El precio del servicio no puede ser negativo');
        }

        // Llamar al repositorio para la accion en la DB
        return this.serviceRepository.create(data);
    }
    // TODO: servicio update, servicio findById, servicio delete.

}

// Exportamos la instancia unica (Usando el repositorio que ya exportamos)
export const serviceService = new ServiceService(serviceRepository);