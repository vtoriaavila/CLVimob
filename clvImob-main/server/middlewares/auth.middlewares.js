import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.sendStatus(401); // Use sendStatus para enviar o código de status corretamente.
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.sendStatus(401);
        }

        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => { 
            if (error) {
                console.error("JWT verification error:", error.message);
                return res.status(401).send("Token Invalid");
            }

            // Adiciona os dados decodificados ao objeto req, se necessário
            req.user = decoded;
            const user = await userService.findIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send("Token Invalid for user"); // Retorna 401 se a verificação falhar
            }

            req.userId = user.id;

            // Passa para o próximo middleware se o token for válido
            return next();
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
