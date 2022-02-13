import pesquisaSchema from '../schemas/pesquisaSchema.js';

export default function validatePesquisaSchemaMiddleware(req, res, next){
    const validation = pesquisaSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return null;
    }
    next();
}