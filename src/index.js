import express, { json } from 'express';
import cors from 'cors';
import db from "./db.js";
import cadastro from './routes/cadastroRouter.js';
import login from './routes/loginRouter.js';
import carrinho from './routes/carrinhoRouter.js';

const server = express();
server.use(cors());
server.use(json());
server.use(cadastro);
server.use(login);
server.use(carrinho);

setInterval(remocaoAutomatica, 10000);

async function remocaoAutomatica(){

    const collection = db.collection('sessoes');
    const resultado = await collection.find().toArray();
    if(resultado.length>0){
        for(let i = 0; i< resultado.length; i++){
            const agora = Date.now();
            if (agora - resultado[i].hora >= 60000){
                await collection.deleteOne({userId: resultado[i].userId});
            }
        }
    }
}


server.listen(process.env.PORT);