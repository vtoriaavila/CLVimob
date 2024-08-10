import bodyParser from "body-parser";
import Imob from "../models/Imobs.js";

const createService = (body) => Imob.create(body);

const findAllService = () => Imob.find();

export default {
    createService,
    findAllService
};
