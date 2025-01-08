import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow.service';
import { borrowBookSchema, returnBookSchema } from '../models/validation/borrow.schema';

export class BorrowController {
  static async borrowBook(req: Request, res: Response) {
    try {
      const validatedData = borrowBookSchema.parse(req.body);
      const userId = req.user!.id;
      const result = await BorrowService.borrowBook(userId, validatedData.bookId);
      res.status(201).json(result);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async returnBook(req: Request, res: Response) {
    try {
      const validatedData = returnBookSchema.parse(req.body);
      const result = await BorrowService.returnBook(validatedData.borrowedBookId);
      res.json(result);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }
}