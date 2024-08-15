import contract from "../models/Contract.js";

export const createService = (body) => contract.create(body);

// export const findAllService = (offset, limit) => contract.find().skip(offset).limit(limit).populate("proprietario");

export const findAllService = async (offset, limit) => {
    console.log('Offset:', offset, 'Limit:', limit);
    const contracts = await contract.find()
        .skip(offset)
        .limit(limit)
        .exec();

    return contracts
};

export const countContract = () => contract.countDocuments();

export const findByIdService = (id) => contract.findById(id).populate("proprietario").populate("admin").populate("locatorio").populate("imob")

export const byUseService = (id) => contract.find({ proprietario: id }).sort({ _id: -1 }).populate("proprietario").populate("admin").populate("locatorio").populate("imob")

export const deleteContractService = (id) => {
    return contract.findOneAndDelete({ _id: id });
};

