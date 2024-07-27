import { z } from 'zod';

export const RestorePasswordEmailRequestSchema = z.object({
  email: z.string().email(),
});

export type RestorePasswordEmailRequest = z.infer<typeof RestorePasswordEmailRequestSchema>;

export const RestorePasswordEmailResponseSchema = z.void();

export type RestorePasswordEmailResponse = z.infer<typeof RestorePasswordEmailResponseSchema>;

export interface RestorePasswordEmailUsecase {
  restorePasswordEmail(request: RestorePasswordEmailRequest): Promise<RestorePasswordEmailResponse>;
}
