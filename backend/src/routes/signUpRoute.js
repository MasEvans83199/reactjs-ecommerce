import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config({ path: '../.env' });

export const signUpRoute = {
    path:"/api/signup",
    method: "post",
    handler: async (req, res) => {
        // Debug Log
        console.log("Received POST request on /api/signup");
        
        const {email, password} = req.body
        if(!email || !password) return res.sendStatus(500);

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        
        

        console.log(`Email: ${email}, password: ${password}`)
        const db = getDbConnection('ecommerce')
        const result = await db.collection("users").insertOne({
            email,
            passwordHash
        })

        if(!result) return res.sendStatus(500);

        const {insertedId} = result;


        jwt.sign({uid: insertedId, email}, process.env.JWT_SECRET, {expiresIn: "2d"}, (error, token) =>{
            if(error) {
                console.log("Error generating jwt token:\n", error);
                return res.status(500).send(error)
            }

            return res.status(200).json({ token });
        })        
    }
}