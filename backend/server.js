import express from "express";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.get("/ping", (req, res)=> {
    console.log("Received a ping... responding with a pong...");
    res.send("PONG back at you...");
});

app.listen(PORT, () =>
     console.log(`MERN server is listening on port ${PORT}...`)
);