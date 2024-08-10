import mongoose from "mongoose";

const ImobsSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true,  
    },

    num_casa: {
        type: Number,    
        required: true,  
    },

    rua: {
        type: String,
        required: true,  
    },
    
    bairro: {
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
});

const Imob = mongoose.model("Imobs", ImobsSchema);

export default Imob;
