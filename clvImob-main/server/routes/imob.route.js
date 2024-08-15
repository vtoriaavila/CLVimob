import { Router } from "express";
import {create,findAll,topImob,findById,searchByCidade, searchByEstado, searchByCep,byUser,update, deleteImob, searchByEndereco} from "../controllers/imob.controller.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js"


// const {create,findAll,topImob,findById} = imobControll;

const router = Router();

router.post("/",authMiddleware, create)
router.get("/",authMiddleware,findAll)
router.get("/top",authMiddleware,topImob)
router.get("/busca/cidade", authMiddleware, searchByCidade);
router.get("/busca/estado", authMiddleware, searchByEstado);
router.get("/busca/endereco", authMiddleware, searchByEndereco);
router.get("/busca/cep", authMiddleware, searchByCep);
router.get("/byUser",authMiddleware,byUser)
router.get("/:id",authMiddleware,findById);
router.patch("/:id",authMiddleware,update)
router.delete("/:id",authMiddleware,deleteImob)


export default router;

