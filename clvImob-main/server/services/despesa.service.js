import Despesas from "../models/despesas.js";

export const createDespesasService = async (despesaData) => {
    const newDespesa = new Despesas(despesaData);
    return await newDespesa.save();
};

export const findAllDespesasService = async (offset, limit) => {
    return await Despesas.find().skip(offset).limit(limit).populate('imob').exec();
};

export const findDespesaByIdService = async (id) => {
    return await Despesas.findById(id).populate('imob').exec();
};

export const updateDespesasService = async (id, updateData) => {
    return await Despesas.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteDespesasService = async (id) => {
    return await Despesas.findByIdAndDelete(id);
};

// Find Despesas records by user (proprietario)
export const findByUserService = async (userId) => {
    return Despesas.find({ "imob.proprietario": userId }).populate("imob");
};
