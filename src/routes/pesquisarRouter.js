import { Router } from 'express';
import { pesquisar } from '../controllers/pesquisar.js';
import validatePesquisaSchemaMiddleware from '../middlewares/validatePesquisaSchemaMiddleware.js';

const pesquisarRouter = Router();

pesquisarRouter.post("/pesquisar", validatePesquisaSchemaMiddleware, pesquisar);

export default pesquisarRouter;