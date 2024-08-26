import { createDespesasService, findAllDespesasService, findDespesaByIdService, updateDespesasService, deleteDespesasService,findByUserService } from '../services/despesa.service.js';

export const createDespesas = async (req, res) => {
    try {
        const { imob, condominio, iptu, seguro, eletricidade, agua } = req.body;

        if (!imob || !condominio || !iptu || !seguro || !eletricidade|| !agua) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        const newDespesa = await createDespesasService({ imob, condominio, iptu, seguro, eletricidade, agua });

        return res.status(201).send(newDespesa);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const findAllDespesas = async (req, res) => {
    let { limit, offset } = req.query;

    limit = Number(limit) || 5;
    offset = Number(offset) || 0;

    try {
        const despesas = await findAllDespesasService(offset, limit);
        return res.status(200).send(despesas);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const findDespesaById = async (req, res) => {
    try {
        const { id } = req.params;
        const despesa = await findDespesaByIdService(id);

        if (!despesa) {
            return res.status(404).send({ message: "Despesa not found" });
        }

        return res.status(200).send(despesa);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const findByUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Supondo que o ID do usuário vem como parâmetro na URL
        const despesa = await findByUserService(userId);

        if (despesa.length === 0) {
            return res.status(404).send({ message: "No manutencao records found for this user" });
        }

        return res.send(despesa);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const updateDespesas = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedDespesa = await updateDespesasService(id, updateData);

        if (!updatedDespesa) {
            return res.status(404).send({ message: "Despesa not found" });
        }

        return res.status(200).send(updatedDespesa);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const deleteDespesas = async (req, res) => {
    try {
        const { id } = req.params;

        const despesa = await findDespesaById(id);

        if (!despesa) {
            return res.status(404).send({ message: "Despesa not found" });
        }

        if (String(despesa.proprietario._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't delete this ",
            });
        }

        await deleteDespesasService(id)

        return res.status(200).send({ message: "Despesa deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
