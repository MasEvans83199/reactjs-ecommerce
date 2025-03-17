import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInRoute = {
    path: "/api/sign-in",
    method: "post",
    handler: async (req, res) => {

        const { email, password } = req.body;

        const db = getDbConnection("ecommerce");
        const user = await db.collection("users").findOne({email});
        if(!user)
            return res.status(400).json({message: "Unable to sign in..."});

        const { passwordHash, uid } = user;
        const isCorrect = await bcrypt.compare(password, passwordHash);

        if(!isCorrect)
            return res.status(400).json({message: "Unable to sign in..."});

        jwt.sign({ uid, email }, process.env.JWT_SECRET, {expiresIn:"2d"}, (error, token) =>{
            if(error)
                return res.sendStatus(500);

            return res.status(200).json({token});
        });
    }
}