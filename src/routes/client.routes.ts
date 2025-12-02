import { Router } from 'express';
import { clientController } from '../controllers/client.controller';

const clientRouter = Router();

clientRouter.get('/', clientController.getAllClients);
clientRouter.get('/:id', clientController.getClientById);
clientRouter.post('/', clientController.createClient);
clientRouter.patch('/:id', clientController.updateClient);
clientRouter.delete('/:id', clientController.deleteClient);

export default clientRouter;