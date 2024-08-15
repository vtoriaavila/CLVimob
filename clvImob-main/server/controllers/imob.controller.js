import {
    createService,
    findAllService,
    countImob,
    topImobService,
    findByIdService,
    searchByCidadeService,
    searchByEstadoService,
    searchByEnderecoService,
    searchByCepService,
    byUseService,
    updateService,
    deleteImobService
} from "../services/imob.service.js";
import mongoose from "mongoose";

// Create Imob
export const create = async (req, res) => {
    try {
        const { tipo, cep, endereco, cidade, estado, quartos, banheiro, tamanho, aluguel} = req.body;

        if (!tipo || !cep || !endereco || !cidade || !estado || !quartos || !banheiro || !tamanho ||!aluguel) {
            return res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        await createService({
            tipo,
            cep,
            endereco,
            cidade,
            estado,
            proprietario: req.userId,
            quartos,
            banheiro,
            tamanho,
            aluguel,
        });

        return res.status(201).send("Created");
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Find All Imobs
export const findAll = async (req, res) => {
    let { limit, offset } = req.query;

    limit = Number(limit) || 5;
    offset = Number(offset) || 0;

    const imob = await findAllService(offset, limit);
    const total = await countImob();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    if (imob.length === 0) {
        return res.status(400).send({ message: "There are no registered imob" });
    }

    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        results: imob.map(imobItem => ({
            id: imobItem._id,
            tipo: imobItem.tipo,
            cep: imobItem.cep,
            endereco: imobItem.endereco,
            cidade: imobItem.cidade,
            estado: imobItem.estado,
            quartos: imobItem.quartos,
            banheiro: imobItem.banheiro,
            tamanho: imobItem.tamanho,
            proprietario: imobItem.proprietario,
            aluguel: imobItem.aluguel,
        }))
    });
};

// Top Imob
export const topImob = async (req, res) => {
    const imob = await topImobService();

    if (!imob) {
        return res.status(400).send({ message: "There are no registered imob" });
    }

    res.send({
        imob: {
            id: imob._id,
            tipo: imob.tipo,
            cep: imob.cep,
            endereco: imob.endereco,
            cidade: imob.cidade,
            estado: imob.estado,
            quartos: imob.quartos,
            banheiro: imob.banheiro,
            tamanho: imob.tamanho,
            aluguel: imob.aluguel,
        }
    });
};

// Find Imob by ID
export const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const imob = await findByIdService(id);

        if (!imob) {
            return res.status(404).send({ message: "Imob not found" });
        }

        return res.send({
            imob: {
                id: imob._id,
                tipo: imob.tipo,
                cep: imob.cep,
                endereco: imob.endereco,
                cidade: imob.cidade,
                estado: imob.estado,
                quartos: imob.quartos,
                banheiro: imob.banheiro,
                tamanho: imob.tamanho,
                aluguel: imob.aluguel
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Search by Cidade
export const searchByCidade = async (req, res) => {
    try {
        const { cidade } = req.query;
        const imob = await searchByCidadeService(cidade);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                tipo: imobItem.tipo,
                cep: imobItem.cep,
                endereco: imobItem.endereco,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
                quartos: imobItem.quartos,
                banheiro: imobItem.banheiro,
                tamanho: imobItem.tamanho,
                aluguel: imobItem.aluguel
            }))
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Search by Estado
export const searchByEstado = async (req, res) => {
    try {
        const { estado } = req.query;
        const imob = await searchByEstadoService(estado);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                tipo: imobItem.tipo,
                cep: imobItem.cep,
                endereco: imobItem.endereco,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
                quartos: imobItem.quartos,
                banheiro: imobItem.banheiro,
                tamanho: imobItem.tamanho,
                aluguel: imobItem.aluguel,
            }))
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Search by Endereco
export const searchByEndereco = async (req, res) => {
    try {
        const { endereco } = req.query;
        const imob = await searchByEnderecoService(endereco);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                tipo: imobItem.tipo,
                cep: imobItem.cep,
                endereco: imobItem.endereco,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
                quartos: imobItem.quartos,
                banheiro: imobItem.banheiro,
                tamanho: imobItem.tamanho,
                aluguel: imobItem.aluguel,
            }))
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Search by CEP
export const searchByCep = async (req, res) => {
    try {
        const { cep } = req.query;
        const imob = await searchByCepService(cep);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                tipo: imobItem.tipo,
                cep: imobItem.cep,
                endereco: imobItem.endereco,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
                quartos: imobItem.quartos,
                banheiro: imobItem.banheiro,
                tamanho: imobItem.tamanho,
                aluguel: imobItem.aluguel,
            }))
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Find by User
export const byUser = async (req, res) => {
    try {
        const id = req.userId;
        console.log("User ID:", id);

        const imob = await byUseService(id);
        console.log("Imob Records:", imob);

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                tipo: imobItem.tipo,
                cep: imobItem.cep,
                endereco: imobItem.endereco,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
                quartos: imobItem.quartos,
                banheiro: imobItem.banheiro,
                tamanho: imobItem.tamanho,
                aluguel: imobItem.aluguel,
            }))
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Update Imob
export const update = async (req, res) => {
    try {
        const { tipo, cep, endereco, cidade, estado, quartos, banheiro,tamanho, aluguel } = req.body;
        const { id } = req.params;

        if (!tipo && !cep && !endereco && !cidade && !estado && !quartos && !banheiro && !tamanho && aluguel) {
            return res.status(400).send({
                message: "Submit all fields for update",
            });
        }

        const imob = await findByIdService(id);

        if (!imob) {
            return res.status(404).send({ message: "Imob not found" });
        }

        if (String(imob.proprietario._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't update this imob",
            });
        }

        await updateService(
            id,
            tipo,
            cep,
            endereco,
            cidade,
            estado,
            quartos,
            banheiro,
            tamanho,
            aluguel
        );

        return res.send({ message: "Imob successfully updated" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Delete Imob
export const deleteImob = async (req, res) => {
    try {
        const { id } = req.params;

        const imob = await findByIdService(id);

        if (!imob) {
            return res.status(404).send({ message: "Imob not found" });
        }

        if (String(imob.proprietario._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't delete this imob",
            });
        }

        await deleteImobService(id);

        return res.send({ message: "Imob successfully deleted" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
