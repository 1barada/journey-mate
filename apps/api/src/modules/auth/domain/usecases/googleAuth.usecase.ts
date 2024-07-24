import { z } from 'zod';

export const GoogleAuthRequestSchema = z.object({
  token: z.string(),
});

export const GoogleAuthResponseSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});
