import imobService from "../services/imob.service.js";
import mongoose from "mongoose"
const { createService, findAllService } = imobService;

const create = async (req, res) => {
    try {
        const {authorization} = req.headers;
        if(!authorization){
            return res.send(401);
        }
        const parts = authorization.split(" ") 
        const [Schema, token ] = parts

        if(parts.length() !== 2){
            return res.send(401 )
        }

        if(Schema !== "Bearer"){
            return res.send(401);
        }
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
            proprietario: {_id: "66b56d2df79fd4e4c2c68e66"},
        });

        return res.status(201).send();  // Corrigido para enviar status corretamente
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


const findAll = async (req,res) => {
    const imob = await findAllService();
    if (imob.length == 0) {
        return res.status(400).send({ message: "There are no registered imob" });

    }
    res.send(imob);
}

export default {create,findAll};

