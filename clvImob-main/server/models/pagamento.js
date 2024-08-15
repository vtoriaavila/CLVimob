import mongoose from "mongoose";

const PagamentoSchema = new mongoose.Schema({
    contrato:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
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
