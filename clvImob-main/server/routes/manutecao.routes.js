import express from "express";
import {
    createManutencao,
    findAllManutencao,
    findManutencaoById,
    updateManutencao,
    deleteManutencao,
    findByUser,
    editManutencao,
} from "../controllers/manutencao.controller.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js"


const router = express.Router();

// Route to create a new manutencao
router.post("/",authMiddleware, createManutencao);

// Route to get all manutencao records
router.get("/",authMiddleware, findAllManutencao);

router.get("/byUser", authMiddleware,findByUser)

// Route to get a specific manutencao by ID
router.get("/:id",authMiddleware, findManutencaoById);

// Route to update a specific manutencao by ID
router.put("/edit/:id", authMiddleware,editManutencao);

// Route to update a specific manutencao by ID
router.put("/:id", authMiddleware,updateManutencao);

// Route to delete a specific manutencao by ID
router.delete("/:id",authMiddleware,deleteManutencao);

export default router;
