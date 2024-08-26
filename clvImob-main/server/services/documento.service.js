import Documento from '../models/documento.js';

// Serviço para criar um novo documento
export const createDocumentoService = async (dados) => {
    const { imob, titulo, tipo, data } = dados;

    const novoDocumento = new Documento({
        imob,
        titulo,
        tipo,
        data: new Date(data)
    });

    return await novoDocumento.save();
};

// Serviço para obter todos os documentos
export const getAllDocumentosService = async () => {
    return await Documento.find().populate('imob');
};

// Serviço para obter um documento por ID
export const getDocumentoByIdService = async (id) => {
    return await Documento.findById(id);
};

export const getDocumentosByUserService = async (userId) => {
    try {
        console.log("User ID:", userId); // Adicione este log para depuração
        
        const documentos = await Documento.find({
            "imob.proprietario": userId
        }).populate('imob');

        console.log("Documentos encontrados:", documentos); // Adicione este log para verificação

        return documentos;
    } catch (err) {
        throw new Error(err.message);
    }
};



// Serviço para deletar um documento
export const deleteDocumentoService = async (id) => {
    const documento = await Documento.findById(id);
    if (documento) {
        return await Documento.findByIdAndDelete(id); // Remove o documento do banco de dados
    }
    return null;
};

// Serviço para atualizar um documento
export const updateDocumentoService = async (id, dados) => {
    const { titulo, tipo, data } = dados;

    return await Documento.findByIdAndUpdate(id, {
        titulo,
        tipo,
        data: new Date(data)
    },);
};
