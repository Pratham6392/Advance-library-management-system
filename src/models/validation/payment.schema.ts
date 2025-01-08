import { z } from 'zod';

export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  borrowedBookId: z.string().uuid()
});