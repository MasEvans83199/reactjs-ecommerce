import {MongoClient} from "mongodb";

let client;
const dbURI = "mongodb+srv://mas_evans:M!le6545478510@code-app-cluster.85eq9td.mongodb.net/?retryWrites=true&w=majority&appName=code-app-cluster";

export const initializeDbConnection =  async () => {
    client =  await MongoClient.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export const getDbConnection = dbName => client.db(dbName);