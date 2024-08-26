import express from 'express';
import {
    createPagamento,
    getAllPagamentos,
    getPagamentoById,
    deletePagamento,
    updatePagamento,
    getPagamentosByUser,
    getPagamentosByAdmin
} from '../controllers/pagamento.controller.js';
import {authMiddleware} from "../middlewares/auth.middlewares.js"

const router = express.Router();

// Rota para criar um novo pagamento
router.post('/', authMiddleware, createPagamento);

// Rota para obter todos os pagamentos
router.get('/', authMiddleware, getAllPagamentos);

// Rota para obter pagamentos por usuário
router.get('/user', authMiddleware, getPagamentosByUser);

router.get('/admin/',authMiddleware, getPagamentosByAdmin)

// Rota para obter um pagamento específico por ID
router.get('/:id', authMiddleware, getPagamentoById);

// Rota para deletar um pagamento específico por ID
router.delete('/:id', authMiddleware, deletePagamento);

// Rota para atualizar um pagamento específico por ID
router.put('/:id', authMiddleware, updatePagamento);

export default router;
