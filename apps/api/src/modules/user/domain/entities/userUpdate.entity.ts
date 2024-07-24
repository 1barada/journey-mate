import { z } from 'zod';

export const ChangeDescriptionInputSchema = z.object({
  description: z.string().max(1000),
});

export const ChangeDescriptionResponseSchema = z.object({
  description: z.string(),
});

export interface ChangeDescriptionRequest {
  id: number;
  description: string;
}

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

export const UpdateUserAvatarResponseSchema = z.object({
  avatarUrl: z.string(),
});

export const UpdateUserAvatarRequestSchema = z.object({
  id: z.number(),
  avatarUrl: z.string(),
});

export const UpdateUserAvatarRequestInput = z.object({
  avatarUrl: z.string(),
});

export type ChangeDescriptionInput = z.infer<typeof ChangeDescriptionInputSchema>;
export type ChangeDescriptionResponse = z.infer<typeof ChangeDescriptionResponseSchema>;

export type ChangeProfileRequest = z.infer<typeof ChangeProfileRequestSchema>;
export type ChangeProfileResponse = z.infer<typeof ChangeProfileResponseSchema>;

export type UpdateUserAvatarResponce = z.infer<typeof UpdateUserAvatarResponseSchema>;
export type UpdateUserAvatarRequest = z.infer<typeof UpdateUserAvatarRequestSchema>;
