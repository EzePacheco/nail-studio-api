import { Appointment } from "@prisma/client";
import { AppointmentRepository, appointmentRepository, AppointmentWithRelations } from "../repositories/appointment.repository";
import { clientService } from "./client.service";
import { serviceService } from "./service.service";

export class AppointmentService {

    private appointmentRepository: AppointmentRepository

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    /**
     * Obtener todos los turnos
     */  
    async getAllAppointments(): Promise<Appointment[]> {
        const appointments = await this.appointmentRepository.findAll();

        if (appointments.length === 0) {
            throw new Error(`No hay turnos registrados.`);
        }

        return appointments;
    }

    /**
     * Obtener un turno por su ID
     */    
    async getAppointmentById(id: number): Promise<AppointmentWithRelations> {
        const appointment = await this.appointmentRepository.findById(id);
        if (!appointment) {
            throw new Error(`Turno con ID ${id} no encontrado`);
        }

        return appointment;
    }

    /**
     * Crear un turno
     */
    async createAppointment(data: {
        client_id: number,
        service_id: number,
        start_time: Date,
    }): Promise<Appointment> {

        // Verificar que el cliente existe:
        const client = await clientService.getClientById(data.client_id);
        if (!client) {
            throw new Error(`Cliente con ID ${data.client_id} no encontrado`);
        }

        // Verificar que el servicio existe
        const service = await serviceService.getServiceById(data.service_id);
        if (!service) {
            throw new Error(`Servicio con ID ${data.service_id} no encontrado`);
        }

        // Validar fecha
        const now = new Date();
        const start_time = new Date(data.start_time); // Aseguramos que sea un objeto Date
        if (start_time < now) throw new Error(`No se puede crear un turno en el pasado`);

        // Calcular la hora de finalización (end_time)
        const end_time = new Date(start_time.getTime());
        end_time.setMinutes(end_time.getMinutes() + service.duration);

        // Validar que no haya turnos superpuestos usando la DB
        const conflicts = await this.appointmentRepository.findConflictingAppointments(start_time, end_time);

        if (conflicts.length > 0) {
            throw new Error(`Ya existe un turno en ese horario`);
        }

        return this.appointmentRepository.create({
            client_id: data.client_id,
            service_id: data.service_id,
            start_time: data.start_time,
            end_time: end_time
        });
    }

    /**
     * Actualizar un turno
     */
    async updateAppointment(id: number, data: {
        client_id?: number,
        service_id?: number,
        start_time?: Date
    }): Promise<Appointment> {

        // Verificar que el turno existe
        const existingAppointment = await this.getAppointmentById(id);

        let end_time: Date | undefined;
        let newStartTime = data.start_time || existingAppointment.start_time;

        // Si se actualiza el servicio o la hora de inicio, recalcular end_time
        if (data.service_id || data.start_time) {
            const service = data.service_id
                ? await serviceService.getServiceById(data.service_id)
                : existingAppointment.service;

            // Recalculo de End Time
            end_time = new Date(newStartTime);
            end_time.setMinutes(end_time.getMinutes() + service.duration);

            // Validar Solapamiento
            const conflicts = await this.appointmentRepository.findConflictingAppointments(newStartTime, end_time, id);

            if (conflicts.length > 0) {
                throw new Error(`Ya existe un turno en ese horario`);
            }
        }

        if (data.client_id) {
            await clientService.getClientById(data.client_id);
        }

        if (data.service_id) {
            await serviceService.getServiceById(data.service_id);
        }

        return this.appointmentRepository.update(id, {
            ...data,
            ...(end_time && { end_time })
        });
    }

    /**
     * Eliminar un turno
     */
    async deleteAppointment(id: number): Promise<Appointment> {
        // Verificar que el turno existe
        await this.getAppointmentById(id);

        return this.appointmentRepository.delete(id);
    }

    /**
     * Obtener todos los turnos de un cliente específico
     */
    async getAppointmentsByClient(client_id: number): Promise<Appointment[]> {
        await clientService.getClientById(client_id);

        const allAppointments = await this.appointmentRepository.findAll();
        const clientAppointments = allAppointments.filter(
            appointment => appointment.client_id === client_id);

        if (clientAppointments.length === 0) {
            throw new Error(`El cliente con ID ${client_id} no tiene turnos registrados`)
        }

        return clientAppointments;
    }

    /**
     * Obtener turnos de una fecha específica
     */
    async getAppointmentsByDate(date: Date): Promise<Appointment[]> {
        const allAppointments = await this.appointmentRepository.findAll();

        const appointmentsOnDate = allAppointments.filter(
            appointment => {
                const appointmentDate = new Date(appointment.start_time);
                return (
                    appointmentDate.getFullYear() === date.getFullYear() &&
                    appointmentDate.getMonth() === date.getMonth() &&
                    appointmentDate.getDate() === date.getDate()
                )
            });

        if (appointmentsOnDate.length === 0) {
            throw new Error(`No hay turnos para la fecha ${date.toLocaleDateString()}`);
        }

        return appointmentsOnDate;
    }

    /**
     * Cambiar el estado de un turno
     */
    async updateAppointmentStatus(id: number, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'): Promise<Appointment> {
        // Verificar que el turno existe
        const appointment = await this.getAppointmentById(id);

        // Validar transiciones
        if (appointment.status === 'COMPLETED' && status === 'CANCELLED') {
            throw new Error(`No se puede cancelar un turno ya completado`);
        }

        if (appointment.status === 'CANCELLED' && status === 'COMPLETED') {
            throw new Error('No se puede completar un turno cancelado');
        }

        return this.appointmentRepository.update(id, { status } as any);
    }
}



export const appointmentService = new AppointmentService(appointmentRepository);