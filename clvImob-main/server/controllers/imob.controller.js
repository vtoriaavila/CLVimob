import { createService, findAllService, countImob, topImobService, findByIdService, searchByCidadeService, searchByEstadoService, searchByBairroService, searchByCepService, byUseService, updateService, deleteImobService } from "../services/imob.service.js";
import mongoose from "mongoose"
// const { createService, findAllService, countImob, topImobService, findByIdService } = imobService;

export const create = async (req, res) => {
    try {

        const { cep, num_casa, rua, bairro, cidade, estado } = req.body;

        if (!cep || !num_casa || !rua || !bairro || !cidade || !estado) {
            return res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        await createService({
            cep,
            num_casa,
            rua,
            bairro,
            cidade,
            estado,
            proprietario: req.userId,
        });

        return res.status(201).send("Created");  // Corrigido para enviar status corretamente
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


export const findAll = async (req, res) => {
    let { limit, offset } = req.query;

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
        limit = 5;
    }

    if (!offset) {
        offset = 5;
    }


    const imob = await findAllService(offset, limit);
    const total = await countImob();
    const currentUrl = req.baseUrl;


    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;


    if (imob.length == 0) {
        return res.status(400).send({ message: "There are no registered imob" });

    }
    res.send(
        {
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
                proprietario: imobItem.proprietario
            }))
        });
}

export const topImob = async (req, res) => {
    const imob = await topImobService();

    if (!imob) {
        return res.status(400).send({ message: "There are no registered imob" });
    }

    res.send({
        imob: {
            id: imob._id,
            cep: imob.cep,
            num_casa: imob.num_casa,
            rua: imob.rua,
            bairro: imob.bairro,
            cidade: imob.cidade,
            estado: imob.estado,
        }
    })
}

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const imob = await findByIdService(id);

        if (!imob) {
            return res.status(404).send({ message: "Imob not found" });
        }

        return res.send({
            imob: {
                id: imob._id,
                cep: imob.cep,
                num_casa: imob.num_casa,
                rua: imob.rua,
                bairro: imob.bairro,
                cidade: imob.cidade,
                estado: imob.estado,
            }
        });
    } catch (erro) {
        res.status(500).send({ message: erro.message });
    }
}


export const searchByCidade = async (req, res) => {
    try {
        const { cidade } = req.query;

        const imob = await searchByCidadeService(cidade);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
            }))
        })

    } catch (erro) {
        res.status(500).send({ message: erro.message })
    }
}

export const searchByEstado = async (req, res) => {
    try {
        const { estado } = req.query;

        const imob = await searchByEstadoService(estado);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
            }))
        })

    } catch (erro) {
        res.status(500).send({ message: erro.message })
    }
}

export const searchByBairro = async (req, res) => {
    try {
        const { bairro } = req.query;

        const imob = await searchByBairroService(bairro);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
            }))
        })

    } catch (erro) {
        res.status(500).send({ message: erro.message })
    }
}

export const searchByCep = async (req, res) => {
    try {
        const { cep } = req.query;

        // Corrigido para chamar a função correta
        const imob = await searchByCepService(cep);

        if (imob.length === 0) {
            return res.status(400).send({ message: "There are no registered imob" });
        }

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
            }))
        });

    } catch (erro) {
        res.status(500).send({ message: erro.message });
    }
};

export const byUser = async (req, res) => {
    try {
        const id = req.userId;
        console.log("User ID:", id); // Verifique o valor aqui

        const imob = await byUseService(id);
        console.log("Imob Records:", imob); // Verifique os registros retornados

        return res.send({
            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
            }))
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).send({ message: erro.message });
    }
};
export const update = async (req, res) => {
    try {
        const { cep, num_casa, rua, bairro, cidade, estado } = req.body;
        const { id } = req.params;

        if (!cep && !num_casa && !rua && !bairro && !cidade && !estado) {
            return res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        const imob = await findByIdService(id);

        if (!imob) {
            return res.status(404).send({ message: "Imob not found" });
        }

        if (String(imob.proprietario._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't update this imob",
            });
        }

        await updateService(id, cep, num_casa, rua, bairro, cidade, estado);
        return res.status(200).send({ message: "Imob updated successfully" });

    } catch (erro) {
        res.status(500).send({ message: erro.message });
    }
};

export const deleteEImob = async (req, res) => {
    try {
        const { id } = req.params
        const imob = await findByIdService(id);

        if (!imob) {
            return res.status(404).send({ message: "Imob not found" });
        }

        if (String(imob.proprietario._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't delete this imob",
            });
        }

        await deleteImobService(id);
        return res.send("Delete complete");

    } catch (erro) {
        res.status(500).send({ message: erro.message });
    }
}