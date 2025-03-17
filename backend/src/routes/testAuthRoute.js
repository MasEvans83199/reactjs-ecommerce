import jwt from "jsonwebtoken";

export const testAuthRoute = {
    path: "/api/test-auth",
    method: "get",
    handler: async (req, res) => {
        //Debug log
        console.log("Received ping on /api/test-auth")
        
        const {authorization} = req.headers;
        const token = authorization.split (" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if(error)
                return res.status(401).json({message: "Unable to decode token..."})

            const { uid, email } = decoded;
            console.log(uid, email);
            return res.status(200).json({uid, email});
        })
    }
}