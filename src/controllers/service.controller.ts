import { Router, Request, Response } from 'express';
import { serviceService } from '../services/service.service';

const serviceRouter = Router();

/**
* @route GET /services
* @description Obtiene todos los servicios activos
*/

serviceRouter.get('/', async (req: Request, res: Response) => {
    try {
        const services = await serviceService.getAllActiveServices();
        // El controlador formatea la respuesta HTTP
        return res.status(200).json(services);
    } catch (e: any) {
        //! Manejo de errores simple
        return res.status(500).json({ error: e.message });
    }
})

/**
 * @route POST /services
 * @description Crea un nuevo servicio
 */

serviceRouter.post('/', async (req: Request, res: Response) => {
    try {
        // 1. Recibe los datos del body de la peticion HTTP
        const { name, duration, price } = req.body;

        // 2. Valida la entrada minima (La validacion completa puede ir aca o en un middleware)
        if (!name || !duration || !price) {
            return res.status(400).json({ error: `Faltan campos requeridos. ${name}, ${duration}, ${price}` });
        }

        // 3. Llama al Service, delegando la logica del negocio
        const newService = await serviceService.createService({ name, duration, price });

        // 4. Devolvemos la respuesta HTTP Code 201 (Created)
        return res.status(201).json(newService);
    } catch (e: any) {
        // ! Manejo de erores simple
        return res.status(500).json({ error: e.message });
    }
});

export default serviceRouter;