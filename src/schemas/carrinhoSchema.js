import joi from 'joi';

const carrinhoSchema = joi.object({
    itens: joi.array().required(),
    total: joi.number().required()
});

export default carrinhoSchema;