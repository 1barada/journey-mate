import { UserSchema } from '@project/api/modules/user/domain/entities/user.entity';
import { z } from 'zod';

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export interface LoginUsecase {
  login(request: LoginRequest): Promise<LoginResponse>;
}

export const LoginRouterResponseSchema = UserSchema;

export type LoginRouterResponse = z.infer<typeof LoginRouterResponseSchema>;
