import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
await mongoClient.connect();
const db = mongoClient.db("drink-store");

export default db;