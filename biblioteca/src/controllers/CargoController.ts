import { Request, Response } from "express";
import { Cargo } from "../models"; // Certifique-se de que o caminho está correto

class CargoController {
  // Create: Adicionar um novo cargo
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { cbo, descricao } = req.body;

      // Validação de campos obrigatórios
      if (!cbo || !descricao) {
        return res.status(400).json({ message: "CBO e descrição são obrigatórios." });
      }

      const cargo = new Cargo({ cbo, descricao });
      const savedCargo = await cargo.save();

      return res.status(201).json(savedCargo);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // List: Listar todos os cargos ordenados pela descrição
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const cargos = await Cargo.find().sort({ descricao: "asc" }); // Ordenação alfabética pela descrição
      return res.status(200).json(cargos);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete: Excluir um cargo pelo ID
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "O ID é obrigatório para exclusão." });
      }

      const deletedCargo = await Cargo.findByIdAndDelete(id);

      if (!deletedCargo) {
        return res.status(404).json({ message: "Cargo não encontrado." });
      }

      return res.status(200).json({ message: "Cargo excluído com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update: Atualizar um cargo existente pelo ID
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, cbo, descricao } = req.body;

      if (!id || (!cbo && !descricao)) {
        return res.status(400).json({ message: "ID e pelo menos um campo (CBO ou descrição) são obrigatórios para atualização." });
      }

      const updatedCargo = await Cargo.findByIdAndUpdate(
        id,
        { cbo, descricao },
        { new: true, runValidators: true } // Retorna o documento atualizado e aplica as validações
      );

      if (!updatedCargo) {
        return res.status(404).json({ message: "Cargo não encontrado." });
      }

      return res.status(200).json(updatedCargo);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new CargoController();
