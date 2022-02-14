import db from "../db.js";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  
  if (!token) {
    return res.sendStatus(401);
  }

  const sessao = await db.collection("sessoes").findOne({ token });
  if (!sessao) {
    return res.sendStatus(401);
  }

  const usuario = await db.collection("usuarios").findOne({ _id: sessao.userId });
  if (!usuario) {
    return res.sendStatus(401);
  }

  res.locals.usuario = usuario;
  next();
}