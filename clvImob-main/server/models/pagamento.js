import mongoose from "mongoose";

const PagamentoSchema = new mongoose.Schema({
    contrato:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
        required: true 
    },

    tipo: {
        type: String,
        required: true
    },

    emissor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    },

    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true    
    },

    valor: {
        type: Number,
        required: true,  
    },

    status: {
        type: String,
        required: true,
        enum: ["Solicitado", "Em andamento", "Concluído"], // Only these options are allowed
    },

    data: {
        type: Date,
        required: true,  
    },
    vencimento: {
        type: Date,
        required: true  
    }

});

const Pagamento = mongoose.model("Pagamento", PagamentoSchema);

export default Pagamento;
