import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import middlewares from '../middlewares/global.middlewares.js'; // Importa como objeto

const route = Router();

const { validId, validUser } = middlewares; // Desestrutura o objeto

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validId, validUser, userController.findId);
route.patch("/:id", validId, validUser, userController.UpdateId);

export default route;
