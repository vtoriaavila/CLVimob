import mongoose from 'mongoose';

const DocumentoSchema = new mongoose.Schema({

    imob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Imobs",
        required: true, 
    },
    titulo: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Contrato', 'Certificado', 'Outro'], // Você pode definir outros tipos se necessário
        required: true
    },
    data: {
        type: Date,
        required: true
    }
});

const Documento = mongoose.model('Documento', DocumentoSchema);

export default Documento;
