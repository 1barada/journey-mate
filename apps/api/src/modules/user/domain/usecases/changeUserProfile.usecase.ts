import { z } from 'zod';

export const ChangeProfileRequestSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
  sex: z.enum(['female', 'male']),
});

export type ChangeProfileRequest = z.infer<typeof ChangeProfileRequestSchema>;

export const ChangeProfileResponseSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
  sex: z.enum(['female', 'male']),
});

export type ChangeProfileResponse = z.infer<typeof ChangeProfileResponseSchema>;
