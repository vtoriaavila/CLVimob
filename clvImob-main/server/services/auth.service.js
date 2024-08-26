import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Serviço de login: Busca um usuário pelo email e inclui a senha na seleção
export const loginService = async (email) => {
    try {
        const user = await User.findOne({ email }).select("+password");
        return user;
    } catch (error) {
        throw new Error("Erro ao buscar o usuário");
    }
};

// Serviço para gerar um token JWT
export const generateToken = (id) => {
    if (!process.env.SECRET_JWT) {
        throw new Error("SECRET_JWT não está definido");
    }
    return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: '24h' }); // ExpiresIn como string '24h'
};
