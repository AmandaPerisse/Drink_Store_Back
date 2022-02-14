import db from '../db.js';

export async function buscarBebidas(req, res) {
    try {
        const bebidas = await db.collection('bebidas').find({}).toArray();

        res.status(201).send(bebidas);  
    } catch (e) {
        res.sendStatus(500)
    }
};

export async function postarCarrinho(req, res) {
    const {nomeBebida, preco, qtd} = req.body;
    const { _id } = res.locals.usuario;

    try {
        const bebida = await db.collection('carrinho').findOne({nomeBebida: nomeBebida, usuarioID: _id});   
        
        if (bebida) {
            await db.collection('carrinho').updateOne({nomeBebida: nomeBebida}, {$inc: {qtd: qtd}});
            return res.sendStatus(201);
        }

        await db.collection('carrinho').insertOne({...req.body, usuarioID: _id});
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);
    }
};
