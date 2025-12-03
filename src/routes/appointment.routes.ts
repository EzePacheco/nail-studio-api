import { Router } from "express";
import { appointmentController, AppointmentController } from "../controllers/appointment.controller";

const appointmentRouter = Router();

appointmentRouter.get('/', appointmentController.getAllAppointments);
appointmentRouter.get('/:id', appointmentController.getAppointmentById);
appointmentRouter.post('/', appointmentController.createAppointment);
appointmentRouter.patch('/:id', appointmentController.updateAppointment);
appointmentRouter.delete('/:id', appointmentController.deleteAppointment);

export default appointmentRouter;