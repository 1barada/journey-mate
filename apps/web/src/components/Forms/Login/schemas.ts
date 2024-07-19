import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 symbols long' })
    .max(35, { message: 'Password must be less than 35 symbols' })
    .trim(),
});
