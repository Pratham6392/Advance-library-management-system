import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { dateRangeSchema, monthlyReportSchema } from '../models/validation/analystics.schema';

export class AnalyticsController {
  static async getMostBorrowedBooks(req: Request, res: Response) {
    try {
      const validatedData = dateRangeSchema.parse(req.query);
      const stats = await AnalyticsService.getMostBorrowedBooks(validatedData);
      res.json(stats);
    } catch (error) {
      if ((error as any).name === 'ZodError') {
        return res.status(400).json({ error: (error as any).errors });
      }
      res.status(400).json({ error: (error as any).message });
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
      if ((error as any).name === 'ZodError') {
        return res.status(400).json({ error: (error as any).errors });
      }
      res.status(400).json({ error: (error as Error).message });
    }
  }
}