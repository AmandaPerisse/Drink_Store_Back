import { Router } from 'express';
import { pedidosAnteriores } from '../controllers/pedidosAnteriores.js';

const pedidosAnterioresRouter = Router();

pedidosAnterioresRouter.get("/pedidos-anteriores", pedidosAnteriores);

export default pedidosAnterioresRouter;