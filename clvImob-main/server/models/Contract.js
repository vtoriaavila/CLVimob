import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({

    proprietario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,  
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true , 
    },
    
    locatorio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    imob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Imobs",
        required: true ,
        unique: true,
    },

    dt_inicio: {
        type: Date,
        required: true,  
    },

    dt_vencimento: {
        type: Date,
        required: true,  
    },

});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
