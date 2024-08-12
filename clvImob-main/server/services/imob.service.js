import bodyParser from "body-parser";
import Imob from "../models/Imobs.js";

export const createService = (body) => Imob.create(body);

export const findAllService = (offset, limit) => Imob.find().skip(offset).limit(limit).populate("proprietario"); // Corrigido para "proprietario"

export const countImob = () => Imob.countDocuments();

export const topImobService = () => Imob.findOne().sort({ _id: -1 }).populate("proprietario");

export const findByIdService = (id) => Imob.findById(id).populate("proprietario");

export const searchByCidadeService = (cidade) => Imob.find({
    cidade: { $regex: `${cidade || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("proprietario");

export const searchByEstadoService = (estado) => Imob.find({
    estado: { $regex: `${estado || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("proprietario");

export const searchByBairroService = (bairro) => Imob.find({
    bairro: { $regex: `${bairro || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("proprietario");

export const searchByCepService = (cep) => Imob.find({
    cep: { $regex: `${cep || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("proprietario");

export const byUseService = (id) => Imob.find({ proprietario: id }).sort({ _id: -1 }).populate("proprietario")

export const updateService = (id, cep, num_casa, rua, bairro, cidade, estado) =>
    Imob.findOneAndUpdate(
        { _id: id },
        { cep, num_casa, rua, bairro, cidade, estado },
        { new: true, rawResult: true }
    );

export const deleteImobService = (id) => {
    return Imob.findOneAndDelete({ _id: id });
};

