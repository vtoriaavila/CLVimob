import express from "express";
import {
    createDocumento, 
    getAllDocumentos, 
    getDocumentoById, 
    deleteDocumento, 
    updateDocumento, 
} from "../controllers/documento.controller.js";

import {authMiddleware} from "../middlewares/auth.middlewares.js"


const router = express.Router();

// Route to create a new manutencao
router.post("/",authMiddleware, createDocumento);

// Route to get all manutencao records
router.get("/",authMiddleware, getAllDocumentos);

// Route to get a specific manutencao by ID
router.get("/:id", authMiddleware,getDocumentoById);

// Route to update a specific manutencao by ID
router.put("/:id",authMiddleware, updateDocumento);

// Route to delete a specific manutencao by ID
router.delete("/:id",authMiddleware, deleteDocumento);

export default router;
