import { compareSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function logar(req, res) {

    const collection = db.collection('usuarios');
    try{
        const usuario = await collection.findOne({email: req.body.email})
        if(usuario && compareSync(req.body.senha, usuario.senha)){
            const token = uuid();
            const collectionSessions = db.collection('sessoes');
            await collectionSessions.insertOne({userId: usuario._id, token: token, hora: Date.now()})
            res.status(201).send({userNome: usuario.nome, token: token, endereco: usuario.endereco});
        }
        else{
            res.sendStatus(404);
        }
    }catch(e){
        res.sendStatus(400);
    }
}