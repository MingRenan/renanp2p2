import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import cors from "cors"; // Importação do CORS
import connect from "./models/connection";

dotenv.config();

// Valida variável de ambiente


const PORT =  3000;
const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para suportar JSON
app.use(express.json());

// Conecta ao MongoDB
connect();

// Define rotas
app.use(routes);

// Middleware para erros


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});
