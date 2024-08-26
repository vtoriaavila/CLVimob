import userService from "../services/user.service.js";
import mongoose from "mongoose";
import {loginService, generateToken} from "../services/auth.service.js"


export const create = async (req, res) => {
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

        const token = generateToken(user.id);
        // Envia a resposta de sucesso
        res.status(201).send({token});
    } catch (error) {
        // Captura e envia qualquer erro ocorrido durante a criação
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

export const findAll = async (req, res) => {
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

export const findId = async (req, res) => {
    try {
        const user = await userService.findIdService(req.user.id); // Supondo que req.user.id tenha o ID do usuário
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};


export const UpdateIdConfig = async (req, res) => {
    try {
        const { name, email, password, estado, cidade, bairro, endereco, documento, data_nascimento, role, banco, agencia, conta } = req.body;
        console.log(req.body)

        // Verifica se pelo menos um campo obrigatório está presente
        if (!name && !email && !password && !estado && !cidade && !bairro && !endereco && !documento && !data_nascimento && !role && !banco && !agencia && !conta) {
            return res.status(400).send({ message: "Submit at least one field for update" });
        }

        const { id } = req.user;

    
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

export const UpdateId = async (req, res) => {
    try {
        const { name, email, password, estado, cidade, bairro, endereco, documento, data_nascimento, role, banco, agencia, conta } = req.body;
        console.log(req.body)

        // Verifica se pelo menos um campo obrigatório está presente
        if (!name && !email && !password && !estado && !cidade && !bairro && !endereco && !documento && !data_nascimento && !role && !banco && !agencia && !conta) {
            return res.status(400).send({ message: "Submit at least one field for update" });
        }

        const { id } = req.params;

    
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

export const findProps = async (req, res) => {
    try {
        const proprietarios = await userService.getProps();
        res.status(200).json(proprietarios);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar proprietários ", error });
    }
};

export const findLocs = async (req, res) => {
    try {
        const locatarios = await userService.getLocs();
        res.status(200).json(locatarios);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar locatários ", error });
    }
};


