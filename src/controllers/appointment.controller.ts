import { Request, Response } from 'express';
import { appointmentService } from '@services/appointment.service';

export class AppointmentController {

    async getAllAppointments(req: Request, res: Response) {
        try {
            const appointments = await appointmentService.getAllAppointments();
            return res.status(200).json(appointments);
        } catch (e: any) {
            return res.status(500).json({ error: e.message });
        }
    }

    async getAppointmentById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    error: `El ID debe ser un numero valido`
                })
            }

            const appointment = await appointmentService.getAppointmentById(id);
            return res.status(200).json(appointment);

        } catch (e: any) {
            if (e.message.includes('no encontrado')) {
                return res.status(404).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    async createAppointment(req: Request, res: Response) {
        try {
            const { client_id, service_id, start_time } = req.body;

            if ( !client_id || !service_id || !start_time) {
                return res.status(400).json({
                    error: `Faltan campos requeridos.`
                })
            }

            const date = new Date(start_time);
            if(isNaN(date.getTime())){
                return res.status(400).json({ error: `No es una fecha valida`});
            }
        
            const newAppointment = await appointmentService.createAppointment({client_id, service_id, start_time});
            return res.status(201).json(newAppointment);

        } catch (e: any) {
            return res.status(500).json({ error: e.message });
        }
    }

    async updateAppointment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ error: `El ID debe ser un numero valido` });
            }
            
            const updatedAppointment = await appointmentService.updateAppointment(id, data);
            
            return res.status(200).json(updatedAppointment);

        } catch (e: any) {
            if (e.message.includes('no encontrado')) {
                return res.status(404).json({ error: e.message });
            }
            if (e.message.includes('solapamiento')) {
                return res.status(409).json({ error: e.message }); // 409 Conflicto
            }
            return res.status(500).json({ error: e.message });
        }
    }

    async deleteAppointment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: `El ID debe ser un numero valido` });
            }

            // Llamamos al servicio para eliminar (o cambiar a CANCELLED)
            const deletedAppointment = await appointmentService.deleteAppointment(id);
            
            return res.status(200).json(deletedAppointment);

        } catch (e: any) {
            if (e.message.includes('no encontrado')) {
                return res.status(404).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

}

// Exportar la instancia
export const appointmentController = new AppointmentController();