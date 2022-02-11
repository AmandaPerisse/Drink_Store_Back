import db from '../db.js';

export async function buscarBebidas(req, res) {
    try {
        const bebidas = await db.collection('bebidas').find({}).toArray();

        res.status(201).send(bebidas);  
    } catch (e) {
        res.sendStatus(500)
    }
};

export async function buscarBebida(req, res) {
    const { tipo } = req.params;

    try {
        const bebida = await db.collection('bebidas').find({ tipo }).toArray();

        res.status(200).send(bebida);
    } catch (e) {
        res.sendStatus(500)
    }
};