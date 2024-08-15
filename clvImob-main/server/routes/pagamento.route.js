import express from 'express';
import {
    createPagamento,
    getAllPagamentos,
    getPagamentoById,
    deletePagamento,
    updatePagamento
} from '../controllers/pagamento.controller.js';
import {authMiddleware} from "../middlewares/auth.middlewares.js"


const router = express.Router();


export default router;
