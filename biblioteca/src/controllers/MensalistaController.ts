import { Request, Response } from "express";
import { Mensalista } from "../models/"; // Certifique-se de que o caminho está correto

class MensalistaController {
  // Create: Adicionar um novo mensalista
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { matricula, salario, funcionario } = req.body;

      if (!matricula || !salario || !funcionario) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const mensalista = new Mensalista({ matricula, salario, funcionario });
      const savedMensalista = await mensalista.save();

      return res.status(201).json(savedMensalista);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // List: Listar todos os mensalistas com dados do funcionário relacionado
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const mensalistas = await Mensalista.find()
        .populate("funcionario") // Popula os dados do funcionário
        .sort({ matricula: "asc" }); // Ordenação por matrícula
      return res.status(200).json(mensalistas);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete: Excluir um mensalista pelo ID
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "O ID é obrigatório para exclusão." });
      }

      const deletedMensalista = await Mensalista.findByIdAndDelete(id);

      if (!deletedMensalista) {
        return res.status(404).json({ message: "Mensalista não encontrado." });
      }

      return res.status(200).json({ message: "Mensalista excluído com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update: Atualizar um mensalista existente pelo ID
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, matricula, salario, funcionario } = req.body;

      if (!id || (!matricula && !salario && !funcionario)) {
        return res.status(400).json({
          message: "ID e pelo menos um campo (matricula, salario, funcionario) são obrigatórios para atualização.",
        });
      }

      const updatedMensalista = await Mensalista.findByIdAndUpdate(
        id,
        { matricula, salario, funcionario },
        { new: true, runValidators: true }
      );

      if (!updatedMensalista) {
        return res.status(404).json({ message: "Mensalista não encontrado." });
      }

      return res.status(200).json(updatedMensalista);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new MensalistaController();
