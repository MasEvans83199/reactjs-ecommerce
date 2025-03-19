import express from "express";
import cors from "cors";
import { initializeDbConnection } from "./db";
import { routes } from "./routes";
import { protectedRoutes } from "./protectedRoutes";
import { authMiddleware } from "./utils/authMiddleware";


const PORT = process.env.PORT || 8080;

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("PONG back at you...");
});


routes.forEach((route) => app[route.method](route.path, route.handler));

app.use("/", authMiddleware);

protectedRoutes.forEach(route => app[route.method](route.path, route.handler));

initializeDbConnection().then(() => {
    app.listen(PORT, () =>
        console.log(`MERN server is listening on port ${PORT} | CORS-enabled`)
    );
});