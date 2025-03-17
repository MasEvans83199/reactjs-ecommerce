import {MongoClient} from "mongodb";
require('dotenv').config({ path: '../.env' });

console.log("DB_CONNECTION_STRING:", process.env.DB_CONNECTION_STRING);

let client;
const dbURI = process.env.DB_CONNECTION_STRING;

export const initializeDbConnection =  async () => {
    client =  await MongoClient.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export const getDbConnection = dbName => client.db(dbName);