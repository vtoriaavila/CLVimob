import userService from "../services/user.service.js";
import mongoose from "mongoose";


const create = async (req, res) => {
    const { name, email, password, estado, cidade, bairro, endereco, documento, data_nascimento, role, banco, agencia, conta } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!name || !email || !password || !estado || !cidade || !bairro || !endereco || !documento || !data_nascimento) {
        return res.status(400).send({ message: "Submit all fields for registration" });
    }

    if (role === 'proprietario' && (!banco || !agencia || !conta)) {
        return res.status(400).send({ message: "Submit all fields for proprietario" });
    }

    try {
        // Cria o usuário com os dados fornecidos
        const user = await userService.createService({
            name,
            email,
            password,
            estado,
            cidade,
            bairro,
            endereco,
            documento,
            data_nascimento,
            role,
            banco,
            agencia,
            conta
        });

        // Verifica se a criação do usuário falhou
        if (!user) {
            return res.status(400).send({ message: "Error creating User" });
        }

        // Envia a resposta de sucesso
        res.status(201).send({
            message: "User created",
            user: {
                id: user._id, // Identificador do usuário
                name: user.name, // Nome do usuário
                email: user.email, // Email do usuário
                estado: user.estado, // Estado do usuário
                cidade: user.cidade, // Cidade do usuário
                bairro: user.bairro, // Bairro do usuário
                endereco: user.endereco, // Endereço do usuário
                documento: user.documento, // Documento do usuário
                data_nascimento: user.data_nascimento, // Data de nascimento do usuário
                role: user.role, // Tipo de usuário
                banco: user.banco, // Banco do proprietário (se aplicável)
                agencia: user.agencia, // Agência do proprietário (se aplicável)
                conta: user.conta // Conta do proprietário (se aplicável)
            },
        });
    } catch (error) {
        // Captura e envia qualquer erro ocorrido durante a criação
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};
const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();
        if (users.length == 0) {
            return res.status(400).send({ message: "There are no registered users" });

        }

        res.send(users)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const findId = async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const UpdateId = async (req, res) => {
    try {
        const { name, email, password, estado, cidade, bairro, endereco, documento, data_nascimento, role, banco, agencia, conta } = req.body;

        // Verifica se pelo menos um campo obrigatório está presente
        if (!name && !email && !password && !estado && !cidade && !bairro && !endereco && !documento && !data_nascimento && !role && !banco && !agencia && !conta) {
            return res.status(400).send({ message: "Submit at least one field for update" });
        }

        const { id } = req;

        // Atualiza o usuário
        const updatedUser = await userService.updateService(
            id,
            name,
            email,
            password,
            estado,
            cidade,
            bairro,
            endereco,
            documento,
            data_nascimento,
            role,
            banco,
            agencia,
            conta
        );

        // Verifica se a atualização do usuário falhou
        if (!updatedUser) {
            return res.status(400).send({ message: "Error updating User" });
        }

        res.send({ message: "User successfully updated", user: updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

export default { create, findAll, findId, UpdateId };
