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