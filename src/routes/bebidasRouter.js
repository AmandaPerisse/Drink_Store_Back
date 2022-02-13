import { Router } from 'express';
import { buscarBebidas } from '../controllers/bebidas.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const bebidasRouter = Router();

bebidasRouter.use(validateToken);
bebidasRouter.get('/bebidas', buscarBebidas)

export default bebidasRouter;