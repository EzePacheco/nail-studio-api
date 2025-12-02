import { Request, Response } from 'express';
import { clientService } from '../services/client.service';

export class ClientController {

    async getAllClients(req: Request, res: Response) {
        try {
            const clients = await clientService.getAllClients();
            return res.status(200).json(clients);
        } catch (e: any) {
            return res.status(500).json({ error: e.message });
        }
    }

    async getClientById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    error: 'El ID debe ser un número válido.'
                });
            }

            const client = await clientService.getClientById(id);
            return res.status(200).json(client);
        } catch (e: any) {
            if (e.message.includes('no encontrado')) {
                return res.status(404).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    async createClient(req: Request, res: Response) {
        try {
            const { name, phone, email } = req.body;

            if (!name || !phone) {
                return res.status(400).json({
                    error: 'Faltan campos requeridos: name y phone'
                });
            }

            const newClient = await clientService.createClient({ name, phone, email });
            return res.status(201).json(newClient);
        } catch (e: any) {
            return res.status(500).json({ error: e.message });
        }
    }

    async updateClient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    error: 'El ID debe ser un número válido.'
                });
            }

            const { name, phone, email } = req.body;

            if (!name && !phone && !email) {
                return res.status(400).json({
                    error: 'Debe proporcionar al menos un campo para actualizar.'
                });
            }

            const updatedClient = await clientService.updateClient(id, { name, phone, email });
            return res.status(200).json(updatedClient);
        } catch (e: any) {
            if (e.message.includes('no encontrado')) {
                return res.status(404).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    async deleteClient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    error: 'El ID debe ser un número válido.'
                });
            }

            const deletedClient = await clientService.deleteClient(id);
            return res.status(200).json({
                message: 'Cliente eliminado correctamente.',
                client: deletedClient
            });
        } catch (e: any) {
            if (e.message.includes('no encontrado')) {
                return res.status(404).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }
}

// Exportar la instancia
export const clientController = new ClientController();