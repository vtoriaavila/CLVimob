import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find()

const findIdService = (id) => User.findById(id)

const updateService = (
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
) => {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (estado) updateData.estado = estado;
    if (cidade) updateData.cidade = cidade;
    if (bairro) updateData.bairro = bairro;
    if (endereco) updateData.endereco = endereco;
    if (documento) updateData.documento = documento;
    if (data_nascimento) updateData.data_nascimento = data_nascimento;
    if (role) updateData.role = role;
    if (role === 'proprietario') {
        if (banco) updateData.banco = banco;
        if (agencia) updateData.agencia = agencia;
        if (conta) updateData.conta = conta;
    }

    return User.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });
}

const getProps = async () => {
    try {
        console.log("Buscando proprietários...");
        const proprietarios = await User.find({ role: 'proprietario' });
        console.log("Proprietários encontrados:", proprietarios);
        return proprietarios;
    } catch (error) {
        console.error("Erro ao buscar proprietários :", error);
        throw new Error(`Erro ao buscar proprietários : ${error.message}, stack: ${error.stack}`);
    }
};

const getLocs = async () => {
    try {
        console.log("Buscando locatários...");
        const locatarios = await User.find({ role: 'locatario' });
        console.log("Locatários encontrados:", locatarios);
        return locatarios;
    } catch (error) {
        console.error("Erro ao buscar locatários:", error);
        throw new Error('Erro ao buscar locatários: ' + error.message);
    }
};


export default {
    createService,
    findAllService,
    findIdService,
    updateService,
    getLocs,
    getProps
};
