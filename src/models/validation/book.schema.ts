import { z } from 'zod';

export const createBookSchema = z.object({
  isbn: z.string().min(10).max(13),
  title: z.string().min(1),
  description: z.string().optional(),
  totalCopies: z.number().min(1),
  authors: z.array(z.string().uuid()),
  categories: z.array(z.string().uuid())
});

export const updateBookSchema = createBookSchema.partial();

export const searchBookSchema = z.object({
  isbn: z.string().optional(),
  title: z.string().optional(),
  category: z.string().uuid().optional(),
  author: z.string().uuid().optional(),
  onlyAvailable: z.boolean().optional()
});