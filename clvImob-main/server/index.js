import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDatabase from "./database/db.js"; // Corrigido
import dotenv from "dotenv";

const envPath = path.resolve( '../.env'); // Ajuste o caminho conforme a estrutura do seu projeto

dotenv.config({ path: envPath });

console.log("MONGO_URL:", process.env.MONGO_URL); // Verifique o valor impresso no console


const port = process.env.PORT || 3000;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000/', methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use("/assets", express.static(path.join(dirname, 'public/assets')));

// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(dirname, 'public/assets'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage }); 

// Usando a rota importada
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import imobRoute from "./routes/imob.route.js";
import contractRoute from "./routes/contract.route.js";
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/imob", imobRoute);
app.use("/contract", contractRoute);

 
// Conexão com o banco de dados e inicialização do servidor
connectDatabase()
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || port, () => console.log(`Server running on port: ${process.env.PORT || port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));