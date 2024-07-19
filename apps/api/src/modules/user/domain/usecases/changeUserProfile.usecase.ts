import { Sex } from '@prisma/client';
import { z } from 'zod';

const SexValues = Object.values(Sex) as [string, ...string[]];

export const ChangeProfileRequestSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
  sex: z.enum(SexValues),
});

export type ChangeProfileRequest = z.infer<typeof ChangeProfileRequestSchema>;

export const ChangeProfileResponseSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
  sex: z.enum(SexValues),
});

export type ChangeProfileResponse = z.infer<typeof ChangeProfileResponseSchema>;
