import { Request, Response } from 'express';
import { Expense } from '../models/expenseModel';

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json();
  }
};

export const getExpenses = async (_: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json();
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json();
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json();
  }
};

export const getTotalExpenses = async (_: Request, res: Response) => {
  try {
    const total = await Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
    res.status(200).json(total[0]?.total || 0);
  } catch (err) {
    res.status(500).json();
  }
};
