import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function pesquisar(req, res) {
    
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
        const collection = db.collection('bebidas');
        const bebidas = await collection.find().toArray();
        let listaBebidas = [];
        if(bebidas){
            for(let i = 0; i< bebidas.length;i++){
                let nome = bebidas[i].nome.toLowerCase();
                let pesquisa = req.body.pesquisa.toLowerCase();
                if(nome.includes(pesquisa)){
                    listaBebidas.push(bebidas[i]);
                }
            }
        }
        if(listaBebidas){
            res.send({bebidas: listaBebidas, token: tokenNovo});
        }
        else{
            res.send("Não encontramos nenhuma bebida com esse nome..");
        }
    }
}