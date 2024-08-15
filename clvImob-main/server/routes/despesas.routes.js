import express from 'express';
import { createDespesas, findAllDespesas, findDespesaById, updateDespesas, deleteDespesas } from '../controllers/despesas.controller.js';
import {authMiddleware} from "../middlewares/auth.middlewares.js"


const router = express.Router();

// Route to create a new despesas
router.post('/',authMiddleware, createDespesas);

// Route to get all despesas with pagination
router.get('/', authMiddleware,findAllDespesas);

// Route to get a specific despesa by ID
router.get('/:id', authMiddleware,findDespesaById);

// Route to update a despesa by ID
router.put('/:id', authMiddleware,updateDespesas);

// Route to delete a despesa by ID
router.delete('/:id', authMiddleware,deleteDespesas);

export default router;
