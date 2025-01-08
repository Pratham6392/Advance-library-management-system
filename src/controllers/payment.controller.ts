import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { createPaymentSchema } from '../models/validation/payment.schema';

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const validatedData = createPaymentSchema.parse(req.body);
      const userId = req.user!.id;
      const payment = await PaymentService.createPayment(userId, validatedData);
      res.status(201).json(payment);
    } catch (error) {
      if ((error as any).name === 'ZodError') {
        return res.status(400).json({ error: (error as any).errors });
      }
      res.status(400).json({ error: (error as any).message });
    }
  }

  static async getInvoice(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;
      const invoice = await PaymentService.generateInvoice(transactionId);
      res.json(invoice);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}