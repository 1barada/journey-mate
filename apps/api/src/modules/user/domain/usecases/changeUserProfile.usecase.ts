import { PrismaClient, Sex } from '@prisma/client';
import { z } from 'zod';

const SexValues = Object.values(Sex) as [string, ...string[]];

export const ChangeProfileRequestSchema = z.object({
  //   id: z.number(),
  name: z.string(),
  age: z.number().max(100),
  email: z.string().email(),
  sex: z.enum(SexValues),
});

export type ChangeProfileRequest = z.infer<typeof ChangeProfileRequestSchema>;

export const ChangeProfileResponseSchema = z.object({
  //   id: z.number(),
  name: z.string(),
  age: z.number().max(100),
  email: z.number(),
  sex: z.enum(SexValues),
});

export type ChangeProfileResponse = z.infer<typeof ChangeProfileResponseSchema>;
