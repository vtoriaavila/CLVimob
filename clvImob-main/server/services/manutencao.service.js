import Manutencao from "../models/manutencao.js";

// Create a new manutencao
export const createManutencaoService = async (data) => {
    const manutencao = new Manutencao(data);
    return manutencao.save();
};

// Find all manutencao records
export const findAllManutencaoService = async () => {
    return Manutencao.find().populate("imob");
};

// Find manutencao by ID
export const findManutencaoByIdService = async (id) => {
    return Manutencao.findById(id).populate("imob");
};

// Find manutencao records by user (proprietario)
export const findByUserService = async (userId) => {
    return Manutencao.find({ "imob.proprietario": userId }).populate("imob");
};


export const updateManutencaoService = async (id, updateData) => {
        const updatedManutencao = await Manutencao.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } 
        );

        return updatedManutencao;
};

// Delete a manutencao by ID
export const deleteManutencaoService = async (id) => {
    return Manutencao.findByIdAndDelete(id);
};
