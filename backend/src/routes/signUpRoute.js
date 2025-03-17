import { getDbConnection } from "../db";

export const signUpRoute = {
    path:"/api/signup",
    method: "post",
    handler: async (req, res) => {
        // Debug Log
        console.log("Received POST request on /api/signup");
        
        const {email, password} = req.body
        if(!email || !password) return res.sendStatus(500);

        console.log(`Email: ${email}, password: ${password}`)

        const db = getDbConnection('ecommerce')
        const result = await db.collection("users").insertOne({
            email,
            password
        })

        if(!result) return res.sendStatus(500);

        const {insertedId} = result;

        console.log(`InsertedId: ${insertedId}`);
        return res.sendStatus(200);

        
    }
}