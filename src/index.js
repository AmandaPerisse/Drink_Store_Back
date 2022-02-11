import express, { json } from 'express';
import cors from 'cors';
import db from "./db.js";
import cadastro from './routes/cadastroRouter.js';
import login from './routes/loginRouter.js';
import carrinho from './routes/carrinhoRouter.js';
import pedidosAnteriores from './routes/pedidosAnterioresRouter.js';

const server = express();
server.use(cors());
server.use(json());
server.use(cadastro);
server.use(login);
server.use(carrinho);
server.use(pedidosAnteriores);

setInterval(remocaoAutomatica, 10000);

async function remocaoAutomatica(){

    const collection = db.collection('sessoes');
    const resultado = await collection.find().toArray();
    if(resultado.length>0){
        for(let i = 0; i< resultado.length; i++){
            const agora = Date.now();
            if (agora - resultado[i].time >= 60000){
                await collection.deleteOne({userId: resultado[i].userId});
            }
        }
    }
}
server.listen(process.env.PORT, () =>{
    console.log("Rodando na porta " + process.env.PORT);
});