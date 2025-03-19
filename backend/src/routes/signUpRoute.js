import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config({ path: '../.env' });

export const signUpRoute = {
    path: "/api/signup",
    method: "post",
    options: {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['POST', 'OPTIONS'],
            allowedHeaders: ['Content-Type']
        }
    },
    handler: async (req, res) => {
        console.log("POST request from api/signup");
        const db = getDbConnection('ecommerce');
        const { email, firstName, lastName, location, password } = req.body;

        if (!email || !password || !firstName || !lastName || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await db.collection("users").findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        try {
            const result = await db.collection("users").insertOne({
                email,
                firstName,
                lastName,
                location,
                passwordHash
            });

            jwt.sign(
                {
                    uid: result.insertedId,
                    email,
                    firstName,
                    lastName,
                    location
                },
                process.env.JWT_SECRET,
                { expiresIn: "2d" },
                (error, token) => {
                    if (error) {
                        console.error("JWT generation error:", error);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    
                    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
                    res.status(201).json({ 
                        token,
                        user: { email, firstName, lastName, location }
                    });
                }
            );

        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ message: "Failed to create user" });
        }
    }
};