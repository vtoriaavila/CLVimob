import mongoose from "mongoose";

const ImobsSchema = new mongoose.Schema({
    tipo:{
        type: String,
        required: true,
    },

    cep: {
        type: String,
        required: true,  
    },

    endereco: {
        type: String,    
        required: true,  
    },

    cidade: {
        type: String,
        required: true,  
    },

    estado: {
        type: String,
        required: true,  
    },

    proprietario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    },
    quartos: {
        type: Number,
        required: true  
    },
    banheiro: {
        type: Number,
        required: true  
    },
    tamanho: {
        type: String,
        required: true  
    },    

    aluguel:  {
        type: Number,
        required: true
    },

});

const Imob = mongoose.model("Imobs", ImobsSchema);

export default Imob;
