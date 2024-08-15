import mongoose from "mongoose";

const ManutencaoSchema = new mongoose.Schema({

    imob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Imobs",
        required: true, 
    },

    tipo_manutencao: {
        type: String,
        required: true
    },

    data_solicitacao: {
        type: Date,
        required: true,  
    },

    status: {
        type: String,
        required: true,
        enum: ["Solicitado", "Em andamento", "Concluído"], // Only these options are allowed
    },

    desc_total:{
        type: String,
        required: true
    },

});

const Manutencao = mongoose.model("Manutencao", ManutencaoSchema);

export default Manutencao;
