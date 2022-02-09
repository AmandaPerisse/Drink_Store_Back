import db from '../db.js';
import bcrypt from 'bcrypt';

export async function cadastrar(req, res){

    const collection = db.collection('usuarios');
    if(await collection.findOne({email: req.body.email})){
        res.sendStatus(409);
    }
    else{
        const senhaHash = bcrypt.hashSync(req.body.senha, 10);
        await collection.insertOne({nome: req.body.nome, email: req.body.email, endereco: req.body.endereco, senha: senhaHash}) 
        res.sendStatus(201);
    }
}