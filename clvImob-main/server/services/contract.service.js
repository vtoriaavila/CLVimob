import contract from "../models/Contract.js";

export const createService = (body) => contract.create(body);

// export const findAllService = (offset, limit) => contract.find().skip(offset).limit(limit).populate("proprietario");

export const findAllService = async (offset = 0, limit = 10) => {
    console.log('Offset:', offset, 'Limit:', limit);
    try {
        const contracts = await contract.find()
            .populate("proprietario")
            .populate("admin")
            .populate("locatorio")
            .populate("imob")
            .skip(offset)
            .limit(limit);
        
        return contracts;
    } catch (error) {
        console.error('Erro ao buscar contratos:', error);
        throw error;
    }
};

export const countContract = () => contract.countDocuments();

export const findByIdService = (id) => contract.findById(id).populate("proprietario").populate("admin").populate("locatorio").populate("imob")

export const byUseService = (id, userType) => {
    const query = {};
    
    if (userType === 'proprietario') {
        query.proprietario = id;
    } else if (userType === 'admin') {
        query.admin = id;
    } else if (userType === 'locatorio') {
        query.locatorio = id;
    }

    return contract.find(query)
        .sort({ _id: -1 })
        .populate("proprietario")
        .populate("admin")
        .populate("locatorio")
        .populate("imob");
};

export const deleteContractService = (id) => {
    return contract.findOneAndDelete({ _id: id });
};

