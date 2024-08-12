
import { query } from "express";
import { createService , findAllService,countContract,findByIdService} from "../services/contract.service.js";



export const create = async (req, res) => {
    try {

        const { admin, locatorio, imob, dt_inicio, dt_vencimento } = req.body;
        if (!admin || !locatorio || !imob || !dt_inicio || !dt_vencimento) {
            return res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        await createService({
            proprietario: req.userId,
            admin,
            locatorio,
            imob,
            dt_inicio,
            dt_vencimento,
        });

        return res.status(201).send("Created");  // Corrigido para enviar status corretamente
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const getAll = async (req, res) => {


    let { limit, offset } = req.query;

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
        limit = 5;
    }
    
    if (!offset) {
        offset = 0; // Comece do início da lista
    }
    


    const contract = await findAllService(offset, limit);
    const total = await countContract();
    const currentUrl = req.baseUrl;


    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;


   if (contract.length == 0) {
    return res.status(204).send({ message: "There are no registered contracts" });
}

    res.send(
        {
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: contract.map(contractItem => ({
                id: contractItem._id,
                proprietario: contractItem.proprietario,
                admin: contractItem.admin,
                locatorio: contractItem.locatorio,
                imob: contractItem.imob,
                dt_inicio: contractItem.dt_inicio,
                dt_vencimento: contractItem.dt_vencimento
            }))
        });

}

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const contract = await findByIdService(id);

        if (!contract) {
            return res.status(404).send({ message: "contract not found" });
        }

        return res.send({
            contract: {
                id: contract._id,
                proprietario: contract.proprietario,
                admin: contract.admin,
                locatorio: contract.locatorio,
                imob: contract.imob,
                dt_inicio: contract.dt_inicio,
                dt_vencimento: contract.dt_vencimento,
            }
        });
    } catch (erro) {
        res.status(500).send({ message: erro.message });
    }
}