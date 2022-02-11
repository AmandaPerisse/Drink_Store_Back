import CarrinhoSchema from '../schemas/CarrinhoSchema.js';

export default function validateCarrinhoSchemaMiddleware(req, res, next){
    const validation = CarrinhoSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
    }
    next();
}