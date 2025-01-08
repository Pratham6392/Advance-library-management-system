import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { updateUserSchema } from '../models/validation/user.schema';

export class UserController {
  static async getUserDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserDetails(id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateUserSchema.parse(req.body);
      const user = await UserService.updateUser(id, validatedData);
      res.json(user);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserBorrowings(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const borrowings = await UserService.getUserBorrowings(id);
      res.json(borrowings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async disableUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserService.disableUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}