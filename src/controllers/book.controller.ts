import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { createBookSchema, updateBookSchema, searchBookSchema } from '../models/validation/book.schema';

export class BookController {
  static async createBook(req: Request, res: Response) {
    try {
      const validatedData = createBookSchema.parse(req.body);
      const book = await BookService.createBook(validatedData);
      res.status(201).json(book);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async updateBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateBookSchema.parse(req.body);
      const book = await BookService.updateBook(id, validatedData);
      res.json(book);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BookService.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async searchBooks(req: Request, res: Response) {
    try {
      const filters = searchBookSchema.parse(req.query);
      const books = await BookService.searchBooks(filters);
      res.json(books);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }
}