import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function pedidosAnteriores(req, res) {

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
        const usuario = await collection.findOne({_id: id})
        if(usuario){
            res.send({pedidos: usuario.pedidosAnteriores, token: tokenNovo});
        }
        else{
            res.sendStatus(404);
        }
    }
}