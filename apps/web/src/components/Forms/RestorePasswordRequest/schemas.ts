import { z } from 'zod';

export const restorePasswordRequestSchema = z.object({
  email: z.string().email({ message: 'Email is required' }).trim(),
});
