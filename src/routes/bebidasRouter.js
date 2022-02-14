import { Router } from 'express';
import { buscarBebidas, postarCarrinho } from '../controllers/bebidas.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const bebidasRouter = Router();

bebidasRouter.use(validateToken);
bebidasRouter.get('/bebidas', buscarBebidas);
bebidasRouter.post('/bebidas', postarCarrinho);

export default bebidasRouter;