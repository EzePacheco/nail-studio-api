import { Appointment, Prisma } from "@prisma/client";
import { BaseRepository, db } from "./base.repository";

type AppointmentCreateInput = {
    client_id: number,
    service_id: number,
    start_time: Date,
    end_time: Date
};

type AppointmentUpdateInput = Partial<AppointmentCreateInput>;
export type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
    include: { client: true, service: true }
}>;


export class AppointmentRepository implements BaseRepository<Appointment, AppointmentCreateInput, AppointmentUpdateInput> {
    async create(data: AppointmentCreateInput): Promise<Appointment> {
        return db.appointment.create({ data });
    }

    async findAll(): Promise<Appointment[]> {
        return db.appointment.findMany({
            include: {
                client: true, // Incuye info del cliente
                service: true // Incluye info del servicio
            },
            orderBy: {
                start_time: 'asc' // Ordena por fecha
            }
        });
    }

    async findById(id: number): Promise<AppointmentWithRelations | null> {
        return db.appointment.findUnique({
            where: { id },
            include: {
                client: true,
                service: true
            }
        });
    }

    async update(id: number, data: AppointmentUpdateInput): Promise<Appointment> {
        return db.appointment.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<Appointment> {
        return db.appointment.delete({
            where: { id }
        });
    }

    /**
     * Lógica de DB: Busca turnos existentes que se solapen con el nuevo turno.
     * @param start_time - La hora de inicio del nuevo turno.
     * @param end_time - La hora de fin del nuevo turno.
     * @param excludeId - ID opcional para excluir un turno (para updates).
     */
    async findConflictingAppointments(
        start_time: Date,
        end_time: Date,
        excludeId?: number
    ): Promise<Appointment[]> {

        // Configuración condicional para excluir el ID
        const excludeCondition = excludeId ? { id: { not: excludeId } } : {};

        return db.appointment.findMany({
            where: {
                AND: [
                    { status: { not: 'CANCELLED' } },
                    excludeCondition, // <-- Aplicamos la exclusión aquí
                    {
                        OR: [
                            { start_time: { lt: end_time } },
                            { end_time: { gt: start_time } }
                        ]
                    }
                ]
            }
        });
    }
}



export const appointmentRepository = new AppointmentRepository();