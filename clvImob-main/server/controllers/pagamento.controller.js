import {
    createPagamentoService,
    getAllPagamentosService,
    getPagamentoByIdService,
    deletePagamentoService,
    updatePagamentoService
} from '../services/pagamento.service.js';

// Controller para criar um novo pagamento
export const createPagamento = async (req, res) => {
    try {
        const newPagamento = await createPagamentoService(req.body);
        return res.status(201).send(newPagamento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para obter todos os pagamentos
export const getAllPagamentos = async (req, res) => {
    try {
        const pagamentos = await getAllPagamentosService();
        return res.status(200).send(pagamentos);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para obter um pagamento por ID
export const getPagamentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pagamento = await getPagamentoByIdService(id);

        if (!pagamento) {
            return res.status(404).send({ message: "Pagamento not found" });
        }

        return res.status(200).send(pagamento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para deletar um pagamento
export const deletePagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const pagamento = await deletePagamentoService(id);

        if (!pagamento) {
            return res.status(404).send({ message: "Pagamento not found" });
        }

        return res.status(200).send({ message: "Pagamento deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para atualizar um pagamento
export const updatePagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPagamento = await updatePagamentoService(id, req.body);

        if (!updatedPagamento) {
            return res.status(404).send({ message: "Pagamento not found" });
        }

        return res.status(200).send(updatedPagamento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
