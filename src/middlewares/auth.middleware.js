import "dotenv/config";
import jwt from "jsonwebtoken";
import userService from "../service/user.service.js";

export function authMiddleware(req, res, next) {
    console.log('Auth middleware called',req.method, req.originalUrl);
    const tokenHeader = req.headers.authorization;
    
    if (!tokenHeader) {
        return res.status(401).send({ error: "Authorization header is missing" });
    }

    const partsToken = tokenHeader.split(" ");
    
    if (partsToken.length !== 2 || partsToken[0] !== "Bearer") {
        return res.status(401).send({ error: "Invalid authorization header format" });
    }

    const [schema, tokenJWT] = partsToken;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ error: "Invalid authorization header format" });
    }

    jwt.verify(tokenJWT, process.env.Secret_JWT, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Invalid token" });
        }

        const user = await userService.findUserByIdService(decoded.id);
        if (!user || !user.id) {
            return res.status(401).send({ error: "Invalid token!" });
        }

        req.userId = user.id;

        return next();
    });
}