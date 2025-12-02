import { Router } from 'express';
import { serviceController } from '../controllers/service.controller';

const serviceRouter = Router();

serviceRouter.get('/', serviceController.getAllActiveServices);
serviceRouter.get('/:id', serviceController.getServiceById);
serviceRouter.post('/', serviceController.createService);
serviceRouter.patch('/:id', serviceController.updateService);
serviceRouter.delete('/:id', serviceController.deleteService);

export default serviceRouter;