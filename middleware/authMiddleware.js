import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export default function(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer jb32131hb213g12v3g1

        if (!token) {
            return res.status(401).json({message: "Not Authorized"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();
        
    } catch (error) {
        res.status(401).json({message: "Not Authorized"});
    }
}