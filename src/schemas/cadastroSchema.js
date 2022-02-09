import joi from 'joi';

const cadastroSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    endereco: joi.string().required(),
    senha: joi.string().required()
});

export default cadastroSchema;