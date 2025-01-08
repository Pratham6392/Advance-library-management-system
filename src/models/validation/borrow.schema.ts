import { z } from 'zod';

export const borrowBookSchema = z.object({
  bookId: z.string().uuid()
});

export const returnBookSchema = z.object({
  borrowedBookId: z.string().uuid()
});