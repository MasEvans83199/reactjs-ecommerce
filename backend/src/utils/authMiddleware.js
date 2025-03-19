import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ message: "No token provided" });

    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer" || !token)
        return res.status(401).json({ message: "Invalid token format" });

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error)
            return res.status(401).json({ message: "Invalid token provided" });

        const { uid, email } = decoded
        req.user = { uid, email };

        next();
    });
}