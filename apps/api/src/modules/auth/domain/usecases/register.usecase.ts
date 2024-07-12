import { z } from 'zod';

export const RegisterWithEmailRequestSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(20),
});

export type RegisterWithEmailRequest = { baseUrl: string } & z.infer<typeof RegisterWithEmailRequestSchema>;

export const RegisterWithEmailResponseSchema = z.void();

export type RegisterWithEmailResponse = z.infer<typeof RegisterWithEmailResponseSchema>;

export const ConfirmEmailRequestSchema = z.object({
  token: z.string(),
});

export type ConfirmEmailRequest = z.infer<typeof ConfirmEmailRequestSchema>;

export const ConfirmEmailResponseSchema = z.void();

export type ConfirmEmailResponse = z.infer<typeof ConfirmEmailResponseSchema>;

export interface RegisterUsecase {
  registerWithEmail(request: RegisterWithEmailRequest): Promise<RegisterWithEmailResponse>;
  confirm(request: ConfirmEmailRequest): Promise<ConfirmEmailResponse>;
}
