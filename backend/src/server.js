import express from "express";
import { initializeDbConnection } from "./db";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.get("/ping", (req, res)=> {
    console.log("Received a ping... responding with a pong...");
    res.send("PONG back at you...");
});

initializeDbConnection().then(() => {
    app.listen(PORT, () =>
        console.log(`MERN server is listening on port ${PORT}...`)
    ); 
});