import joi from 'joi';

const pesquisaSchema = joi.object({
    pesquisa: joi.string().required(),
});

export default pesquisaSchema;