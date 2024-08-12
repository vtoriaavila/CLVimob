import { Router } from "express";
import {create,findById,getAll} from "../controllers/contract.controller.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js"
// import middlewares from '../middlewares/global.middlewares.js'; // Importa como objeto

const route = Router();

// const { validId, validUser } = middlewares; // Desestrutura o objeto

route.post("/", authMiddleware,create);
route.get("/",authMiddleware,getAll);
route.get("/:id",authMiddleware,findById)


export default route;
