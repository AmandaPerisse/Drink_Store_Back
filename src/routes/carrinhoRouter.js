import { Router } from 'express';
import { carrinho } from '../controllers/carrinho.js';
import validateCarrinhoSchemaMiddleware from '../middlewares/validateCarrinhoSchemaMiddleware.js';

const carrinhoRouter = Router();

carrinhoRouter.post("/carrinho", validateCarrinhoSchemaMiddleware, carrinho);

export default carrinhoRouter;