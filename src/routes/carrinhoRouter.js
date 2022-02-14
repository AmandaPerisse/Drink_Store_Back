import { Router } from 'express';
import { carrinho, buscarCarrinho } from '../controllers/carrinho.js';
import validateCarrinhoSchemaMiddleware from '../middlewares/validateCarrinhoSchemaMiddleware.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const carrinhoRouter = Router();

carrinhoRouter.post("/carrinho", validateCarrinhoSchemaMiddleware, carrinho);
carrinhoRouter.get("/carrinho", validateToken, buscarCarrinho)

export default carrinhoRouter;