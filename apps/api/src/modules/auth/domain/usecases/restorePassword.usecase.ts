import { z } from 'zod';

export const RestorePasswordRequestSchema = z.object({
  email: z.string().email(),
});

export type RestorePasswordRequest = z.infer<typeof RestorePasswordRequestSchema>;

export const RestorePasswordResponseSchema = z.void();

export type RestorePasswordResponse = z.infer<typeof RestorePasswordResponseSchema>;

export interface RestorePasswordUsecase {
  restorePassword(request: RestorePasswordRequest): Promise<RestorePasswordResponse>;
}
