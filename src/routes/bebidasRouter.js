import { Router } from 'express';
import { buscarBebidas, buscarBebida } from '../controllers/bebidas.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const bebidasRouter = Router();

bebidasRouter.use(validateToken);
bebidasRouter.get('/bebidas', buscarBebidas)
bebidasRouter.get('/bebidas/:tipo', buscarBebida)

export default bebidasRouter;