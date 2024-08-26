import Pagamento from '../models/pagamento.js';

// Serviço para criar um novo pagamento
export const createPagamentoService = async (dados) => {
    const { contrato, tipo, emissor, destinatario, valor, data, vencimento, status } = dados;

    const novoPagamento = new Pagamento({
        contrato,
        tipo,
        emissor,
        destinatario,
        valor,
        data: new Date(data),
        vencimento: new Date(vencimento),
        status
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

// Serviço para obter pagamentos por usuário
export const getPagamentosByUserService = async (userId) => {
    try {
        // Encontrar todos os pagamentos onde o usuário está no emissor ou destinatário
        const pagamentos = await Pagamento.find({
            $or: [
                { "emissor": userId },
                { "destinatario": userId }
            ]
        }).populate('contrato').populate('emissor').populate('destinatario');

        return pagamentos;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Serviço para atualizar um pagamento
export const updatePagamentoService = async (id, dados) => {
    const { contrato, tipo, emissor, destinatario, valor, data, vencimento, status } = dados;

    return await Pagamento.findByIdAndUpdate(id, {
        contrato,
        tipo,
        emissor,
        destinatario,
        valor,
        data: new Date(data),
        vencimento: new Date(vencimento),
        status
    }, { new: true });
};


export const getPagamentosByAdminService = async (adminId) => {
    try {
      const pagamentos = await Pagamento.find({ 'contrato.admin': adminId }).populate('contrato').populate('emissor').populate('destinatario');;
      return pagamentos;
    } catch (err) {
      throw new Error(`Erro ao buscar pagamentos: ${err.message}`);
    }
  };
