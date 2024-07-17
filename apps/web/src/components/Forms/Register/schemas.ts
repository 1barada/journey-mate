import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Email is required' })
      .max(100, { message: 'Email must be less than hundred symbols' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 symbols long' })
      .max(35, { message: 'Password must be less than 35 symbols' })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: 'Conformation password must be at least 8 symbols long' })
      .max(35, { message: 'Conformation password must be less than 35 symbols' })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
