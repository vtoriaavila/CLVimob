import bcrypt from "bcryptjs";
import {loginService, generateToken} from "../services/auth.service.js"


const mensagem = "User and/or Password not found";

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Obtém o usuário a partir do serviço de login
    const user = await loginService(email);

    // Verifica se o usuário existe
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
        return res.status(401).send({ message: mensagem});
    }

    // Gera o token para o usuário
    const token = generateToken(user.id);


    // Envia o token e o tipo de perfil na resposta e o role do usuario
    res.send({
        token,
        userProfileType: user.role 
    });
};
