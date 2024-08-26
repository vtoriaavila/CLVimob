import {
    createManutencaoService,
    findAllManutencaoService,
    findManutencaoByIdService,
    updateManutencaoService,
    deleteManutencaoService,
    findByUserService,
} from "../services/manutencao.service.js";

// Create a new manutencao
export const createManutencao = async (req, res) => {
    try {
        const { imob, tipo_manutencao, desc_total } = req.body;

        if (!imob || !tipo_manutencao || !desc_total) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        const newManutencao = await createManutencaoService({
            imob,
            tipo_manutencao,
            data_solicitacao: new Date(),  // Correcting the date to use the current date
            status: "Solicitado",
            desc_total
        });

        return res.status(201).send(newManutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Get all manutencao records
export const findAllManutencao = async (req, res) => {
    try {
        const manutencao = await findAllManutencaoService();
        if (manutencao.length === 0) {
            return res.status(404).send({ message: "No manutencao records found" });
        }
        return res.send(manutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Find manutencao records by user (proprietario)
export const findByUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Supondo que o ID do usuário vem como parâmetro na URL
        const manutencao = await findByUserService(userId);

        if (manutencao.length === 0) {
            return res.status(404).send({ message: "No manutencao records found for this user" });
        }

        return res.send(manutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Get manutencao by ID
export const findManutencaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const manutencao = await findManutencaoByIdService(id);
        if (!manutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }
        return res.send(manutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const updateManutencao = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the current Manutencao record to get the current status
        const manutencao = await findManutencaoByIdService(id);
        if (!manutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }

        // Update status based on current status
        let newStatus;
        if (manutencao.status === "Solicitado") {
            newStatus = "Em andamento";
        } else if (manutencao.status === "Em andamento") {
            newStatus = "Concluído";
        } else {
            return res.status(400).send({ message: "Status cannot be updated further" });
        }

        const updatedManutencao = await updateManutencaoService(id, { status: newStatus });

        return res.send(updatedManutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const editManutencao = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_manutencao, desc_total } = req.body;

        // Verifica se os campos tipo_manutencao e desc_total estão presentes na requisição
        if (tipo_manutencao === undefined || desc_total === undefined) {
            return res.status(400).send({ message: "Tipo de manutenção e descrição são obrigatórios" });
        }

        // Busca a manutenção atual pelo ID
        const manutencao = await findManutencaoByIdService(id);
        if (!manutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }

        // Atualiza apenas os campos permitidos
        const updatedFields = { tipo_manutencao, desc_total };
        const updatedManutencao = await updateManutencaoService(id, updatedFields);

        return res.send(updatedManutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};



// Delete a manutencao by ID
export const deleteManutencao = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedManutencao = await deleteManutencaoService(id);
        if (!deletedManutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }
        return res.status(200).send({ message: "Manutencao deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
