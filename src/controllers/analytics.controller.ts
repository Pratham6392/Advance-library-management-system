import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { dateRangeSchema, monthlyReportSchema } from '../models/validation/analytics.schema';

export class AnalyticsController {
  static async getMostBorrowedBooks(req: Request, res: Response) {
    try {
      const validatedData = dateRangeSchema.parse(req.query);
      const stats = await AnalyticsService.getMostBorrowedBooks(validatedData);
      res.json(stats);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async getMonthlyReport(req: Request, res: Response) {
    try {
      const validatedData = monthlyReportSchema.parse(req.query);
      const report = await AnalyticsService.generateMonthlyReport(
        validatedData.year,
        validatedData.month
      );
      res.json(report);
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(400).json({ error: error.message });
    }
  }
}