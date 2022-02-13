import express, { json } from 'express';
import cors from 'cors';
import db from "./db.js";
import cadastro from './routes/cadastroRouter.js';
import login from './routes/loginRouter.js';
import bebidas from './routes/bebidasRouter.js';

const server = express();
server.use(cors());
server.use(json());
server.use(cadastro);
server.use(login);
server.use(bebidas);

setInterval(remocaoAutomatica, 100000);

async function remocaoAutomatica(){

    const collection = db.collection('sessoes');
    const resultado = await collection.find().toArray();
    if(resultado.length>0){
        for(let i = 0; i< resultado.length; i++){
            const agora = Date.now();
            if (agora - resultado[i].hora >= 3600000){
                await collection.deleteOne({userId: resultado[i].userId});
            }
        }
    }
}


server.listen(5000, () => {console.log('Listening on port 5000')});