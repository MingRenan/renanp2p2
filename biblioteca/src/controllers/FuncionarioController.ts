import { Request, Response } from "express";
import { Funcionario } from "../models/"; // Certifique-se de que o caminho está correto

class FuncionarioController {
  // Create: Adicionar um novo funcionário
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, idade, email, fone } = req.body;

      if (!nome || !idade || !email || !fone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const funcionario = new Funcionario({ nome, idade, email, fone });
      const savedFuncionario = await funcionario.save();

      return res.status(201).json(savedFuncionario);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // List: Listar todos os funcionários ordenados por nome
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const funcionarios = await Funcionario.find().sort({ nome: "asc" });
      return res.status(200).json(funcionarios);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete: Excluir um funcionário pelo ID
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "O ID é obrigatório para exclusão." });
      }

      const deletedFuncionario = await Funcionario.findByIdAndDelete(id);

      if (!deletedFuncionario) {
        return res.status(404).json({ message: "Funcionário não encontrado." });
      }

      return res.status(200).json({ message: "Funcionário excluído com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update: Atualizar um funcionário existente pelo ID
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, nome, idade, email, fone } = req.body;

      if (!id || (!nome && !idade && !email && !fone)) {
        return res.status(400).json({
          message: "ID e pelo menos um campo (nome, idade, email, fone) são obrigatórios para atualização.",
        });
      }

      const updatedFuncionario = await Funcionario.findByIdAndUpdate(
        id,
        { nome, idade, email, fone },
        { new: true, runValidators: true }
      );

      if (!updatedFuncionario) {
        return res.status(404).json({ message: "Funcionário não encontrado." });
      }

      return res.status(200).json(updatedFuncionario);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new FuncionarioController();
