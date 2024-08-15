import { Router } from "express";
import {create,findById,getAll,byUser, deleteContract} from "../controllers/contract.controller.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js"
// import middlewares from '../middlewares/global.middlewares.js'; // Importa como objeto

const router = Router();

// const { validId, validUser } = middlewares; // Desestrutura o objeto

router.post("/", authMiddleware,create);
router.get("/",authMiddleware,getAll);
router.get("/byUser/",authMiddleware,byUser);
router.get("/:id",authMiddleware,findById);
router.delete("/:id",authMiddleware,deleteContract)



export default router;
