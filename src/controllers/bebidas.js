import db from '../db.js';

export async function buscarBebidas(req, res) {
    try {
        const bebidas = await db.collection('bebidas').find({}).toArray();

        res.status(201).send(bebidas);  
    } catch (e) {
        res.sendStatus(500)
    }
};
