import { Router } from "express";
import {create,findAll,topImob,findById,searchByCidade, searchByEstado, searchByBairro, searchByCep,byUser,update, deleteEImob} from "../controllers/imob.controller.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js"


// const {create,findAll,topImob,findById} = imobControll;

const router = Router();

router.post("/",authMiddleware, create)
router.get("/",authMiddleware,findAll)
router.get("/top",authMiddleware,topImob)
router.get("/busca/cidade", authMiddleware, searchByCidade);
router.get("/busca/estado", authMiddleware, searchByEstado);
router.get("/busca/bairro", authMiddleware, searchByBairro);
router.get("/busca/cep", authMiddleware, searchByCep);
router.get("/byUser",authMiddleware,byUser)
router.get("/:id",authMiddleware,findById);
router.patch("/:id",authMiddleware,update)
router.delete("/:id",authMiddleware,deleteEImob)


export default router;

