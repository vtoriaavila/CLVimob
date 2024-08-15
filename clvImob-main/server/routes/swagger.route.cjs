const router = require("express").Router();

const swaggerUI = require("swagger-ui-express");

// Certifique-se de que o caminho para o arquivo swagger.json está correto
const swaggerDocument = require('../swagger.json');

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));
module.exports =  router;
 