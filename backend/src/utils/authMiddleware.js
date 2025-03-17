import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization)
        return res.status(401).json({message: "No token provided"});

    const [bearer, token] = authorization.split(" ")
    if(bearer !== "Bearer" || !token)
        return res.status(401).json({message: "Invalid token provided"});

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error)
            return res.status(401).json({message: "Invalid token provided"});

        const { uid , email } = decoded
        req.body.uid = uid
        req.body.email = email

        next();
    });
}