import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  isVerified: z.boolean().optional()
});