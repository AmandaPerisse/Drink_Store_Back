import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function carrinho(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    const collectionSessions = db.collection('sessoes');
    const session = await collectionSessions.findOne({ token }); 
    if (!session) {
        res.sendStatus(401);
    }
    else{
        const id = session.userId;
        await collectionSessions.deleteOne({token: token});
        const tokenNovo = uuid();
        await collectionSessions.insertOne({userId: id, token: tokenNovo, time: Date.now()})
        const collection = db.collection('usuarios');
        await collection.updateOne({ 
			_id: id
		}, { $push: {pedidosAnteriores: req.body }});
        res.send({token: tokenNovo});
    }
};

export async function buscarCarrinho(req, res) {
    const { _id } = res.locals.usuario;

    try {
        const carrinho = await db.collection('carrinho').find({usuarioID: _id}).toArray();
        console.log(carrinho);

        res.status(201).send(carrinho);  
    } catch (e) {
        res.sendStatus(500)
    }
};