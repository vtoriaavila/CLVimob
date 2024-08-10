import { Router } from "express";

const router = Router();

import {login} from "../controllers/auth.controllers.js"

router.post("/",login);

export default router;