import Pagamento from '../models/pagamento.js';

// Serviço para criar um novo pagamento
export const createPagamentoService = async (dados) => {
    const { contrato, emissor, destinatario, valor, data, vencimento } = dados;

    const novoPagamento = new Pagamento({
        contrato,
        emissor,
        destinatario,
        valor,
        data: new Date(data),
        vencimento: new Date(vencimento),
    });

    return await novoPagamento.save();
};

// Serviço para obter todos os pagamentos
export const getAllPagamentosService = async () => {
    return await Pagamento.find()
        .populate('contrato')
        .populate('emissor')
        .populate('destinatario');
};

// Serviço para obter um pagamento por ID
export const getPagamentoByIdService = async (id) => {
    return await Pagamento.findById(id)
        .populate('contrato')
        .populate('emissor')
        .populate('destinatario');
};

// Serviço para deletar um pagamento
export const deletePagamentoService = async (id) => {
    const pagamento = await Pagamento.findById(id);
    if (pagamento) {
        return await Pagamento.findByIdAndDelete(id);
    }
    return null;
};

// Serviço para atualizar um pagamento
export const updatePagamentoService = async (id, dados) => {
    const { contrato, emissor, destinatario, valor, data, vencimento } = dados;

    return await Pagamento.findByIdAndUpdate(id, {
        contrato,
        emissor,
        destinatario,
        valor,
        data: new Date(data),
        vencimento: new Date(vencimento),
    }, { new: true });
};
