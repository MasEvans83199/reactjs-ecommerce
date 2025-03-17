import {MongoClient} from "mongodb";
require('dotenv').config({ path: '../.env' });

let client;
const dbURI = process.env.DB_CONNECTION_STRING || "";

export const initializeDbConnection =  async () => {
    if(!dbURI)
        console.log("Unable to access dbUri...");
    client =  await MongoClient.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export const getDbConnection = dbName => client.db(dbName);