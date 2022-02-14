import carrinhoSchema from '../schemas/carrinhoSchema.js';

export default function validateCarrinhoSchemaMiddleware(req, res, next){
    const validation = carrinhoSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return null;
    }
    next();
}