import { Router } from "express";
import imobControll from "../controllers/imob.controller.js";

const {create,findAll} = imobControll;

const router = Router();

router.post("/", create)
router.get("/",findAll)

export default router;

