import { z } from 'zod';

const dateOfBirthSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    return new Date(arg);
  }
  return arg;
}, z.date().nullable());

export const ChangeProfileRequestSchema = z.object({
  name: z.string(),
  dateOfBirth: dateOfBirthSchema,
  email: z.string().email(),
  sex: z.enum(['female', 'male']).nullable(),
  id: z.number(),
});

export const ChangeProfileResponseSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date().nullable(),
  email: z.string().email(),
  sex: z.enum(['female', 'male']).nullable(),
});

export const ChangeProfileRequestInput = z.object({
  name: z.string(),
  dateOfBirth: dateOfBirthSchema,
  email: z.string().email(),
  sex: z.enum(['female', 'male']).nullable(),
});

export type ChangeProfileRequest = z.infer<typeof ChangeProfileRequestSchema>;
export type ChangeProfileResponse = z.infer<typeof ChangeProfileResponseSchema>;

export interface ChangeProfileDataUsecase {
  changeProfileData(request: ChangeProfileRequest): Promise<ChangeProfileResponse>;
}
