import { z } from 'zod';
import { categories } from './category';

export const formSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be a positive number.')
    .refine((value) => !Number.isNaN(value), 'Invalid number')
    .default(0),
  description: z.string().optional(),
  category: z.enum(categories),
});
