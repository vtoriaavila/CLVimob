import { Router } from 'express';
import {create, findAll, findId, UpdateId,findLocs, findProps,UpdateIdConfig} from '../controllers/user.controller.js';
import middlewares from '../middlewares/global.middlewares.js'; // Importa como objeto
import {authMiddleware} from "../middlewares/auth.middlewares.js"

const route = Router();

// /user
route.post("/", create);
route.get("/", findAll);
route.get("/cookie",authMiddleware,findId)
route.get("/prop",authMiddleware,findProps)
route.get("/loc",authMiddleware,findLocs)
route.patch("/update", authMiddleware, UpdateIdConfig);
route.patch("/update/:id", authMiddleware, UpdateId);
route.get("/:id", authMiddleware, findId);

export default route;
