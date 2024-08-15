import {
    createDocumentoService,
    getAllDocumentosService,
    getDocumentoByIdService,
    deleteDocumentoService,
    updateDocumentoService
} from '../services/documento.service.js';

// Controller para criar um novo documento
export const createDocumento = async (req, res) => {
    try {
        const {imob, titulo, tipo, data } = req.body;

        if (!imob||!titulo || !tipo || !data ) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        const newDocumento = await createDocumentoService(req.body);
        return res.status(201).send(newDocumento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para obter todos os documentos
export const getAllDocumentos = async (req, res) => {
    try {
        const documentos = await getAllDocumentosService();
        return res.status(200).send(documentos);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para obter um documento por ID
export const getDocumentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const documento = await getDocumentoByIdService(id);

        if (!documento) {
            return res.status(404).send({ message: "Documento not found" });
        }

        return res.status(200).send(documento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para deletar um documento
export const deleteDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const documento = await deleteDocumentoService(id);

        if (!documento) {
            return res.status(404).send({ message: "Documento not found" });
        }

        return res.status(200).send({ message: "Documento deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Controller para atualizar um documento
export const updateDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, tipo, data } = req.body;

        if (!titulo || !tipo || !data) {
            return res.status(400).send({ message: "Submit all fields for updating" });
        }

        const updatedDocumento = await updateDocumentoService(id, req.body);

        if (!updatedDocumento) {
            return res.status(404).send({ message: "Documento not found" });
        }

        return res.status(200).send(updatedDocumento);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
