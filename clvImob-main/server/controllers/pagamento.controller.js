import {
    createPagamentoService,
    getAllPagamentosService,
    getPagamentoByIdService,
    deletePagamentoService,
    updatePagamentoService,
    getPagamentosByUserService,
    getPagamentosByAdminService
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

// Controlador para obter pagamentos por usuário
export const getPagamentosByUser = async (req, res) => {
    try {
        const userId = req.userId; // Assumindo que userId está disponível na requisição
        const pagamentos = await getPagamentosByUserService(userId);

        if (pagamentos.length === 0) {
            return res.status(404).send({ message: "Nenhum pagamento encontrado para o usuário" });
        }

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
            return res.status(404).send({ message: "Pagamento não encontrado" });
        }

        return res.status(200).send(pagamento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const getPagamentosByAdmin = async (req, res) => {
    const { adminId } = req.userId;
  
    try {
      const pagamentos = await getPagamentosByAdminService(adminId);
      res.json(pagamentos);
    } catch (err) {
      res.status(500).json({ error: `Erro ao buscar pagamentos: ${err.message}` });
    }
  };

// Controller para deletar um pagamento
export const deletePagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const pagamento = await deletePagamentoService(id);

        if (!pagamento) {
            return res.status(404).send({ message: "Pagamento não encontrado" });
        }

        return res.status(200).send({ message: "Pagamento excluído com sucesso" });
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
            return res.status(404).send({ message: "Pagamento não encontrado" });
        }

        return res.status(200).send(updatedPagamento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
