import mongoose from "mongoose";

const DespesasSchema = new mongoose.Schema({

    imob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Imobs",
        required: true ,
        unique: true,
    },

    condominio: {
        type: Number,
        required: true,  
    },

    iptu: {
        type: Number,
        required: true,  
    },

    seguro: {
        type: Number,
        required: true,  
    },

    eletricidade:{
        type: Number,
        required: true
    },
    agua: {
        type:Number,
        required: true
     }

});

const Despesas = mongoose.model("despesas", DespesasSchema);

export default Despesas;
