import { Router } from 'express';
import { pesquisar } from '../controllers/pesquisar.js';
import validatePesquisaSchemaMiddleware from '../middlewares/validatePesquisaSchemaMiddleware.js';

const pesquisarRouter = Router();

pesquisarRouter.get("/pesquisar", validatePesquisaSchemaMiddleware, pesquisar);

export default pesquisarRouter;