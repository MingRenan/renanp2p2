import { Router, Request, Response } from "express";


import cargo from "./Cargo";
import funcionario from "./Funcionario"
import mensalista from "./Mensalista"

import { createExpense, getExpenses, updateExpense, deleteExpense, getTotalExpenses } from '../controllers/expenseController';


const routes = Router();


routes.use("/cargo", cargo);
routes.use("/funcionario", funcionario);
routes.use("/mensalista", mensalista);


routes.post('/expenses', createExpense);
routes.get('/expenses', getExpenses);
routes.put('/expenses/:id', updateExpense);
routes.delete('/expenses/:id', deleteExpense);
routes.get('/expenses/total', getTotalExpenses);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;