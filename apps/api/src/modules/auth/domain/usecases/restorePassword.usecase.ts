import { z } from 'zod';

export const RestorePasswordRequestSchema = z.object({
  restoreToken: z.string(),
  newPassword: z.string().min(8).trim(),
});

export type RestorePasswordRequest = z.infer<typeof RestorePasswordRequestSchema>;

export const RestorePasswordResponseUserSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email(),
});

export const RestorePasswordResponseSchema = z.object({
  user: RestorePasswordResponseUserSchema,
});

export type RestorePasswordResponse = z.infer<typeof RestorePasswordResponseSchema>;

export interface RestorePasswordUsecase {
  restorePassword(request: RestorePasswordRequest): Promise<RestorePasswordResponse>;
}
