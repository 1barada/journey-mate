import { z } from 'zod';

export const RestorePasswordViaEmailRequestSchema = z.object({
  email: z.string().email(),
});

export const RestorePasswordViaEmailQuerySchema = z.object({
  restoreToken: z.string(),
});

export type RestorePasswordViaEmailRequest = z.infer<typeof RestorePasswordViaEmailRequestSchema>;

export const RestorePasswordViaEmailResponseSchema = z.void();

export type RestorePasswordViaEmailResponse = z.infer<typeof RestorePasswordViaEmailResponseSchema>;

export interface RestorePasswordViaEmailUsecase {
  restorePasswordEmail(request: RestorePasswordViaEmailRequest): Promise<RestorePasswordViaEmailResponse>;
}
