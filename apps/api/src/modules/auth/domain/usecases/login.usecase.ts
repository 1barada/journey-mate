import { UserWithPasswordSchema } from '@project/api/modules/user/domain/entities/user.entity';
import { z } from 'zod';

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  user: UserWithPasswordSchema,
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export interface LoginUsecase {
  login(request: LoginRequest): Promise<LoginResponse>;
}

export const LoginRouterResponseSchema = z.void();

export type LoginRouterResponse = z.infer<typeof LoginRouterResponseSchema>;
