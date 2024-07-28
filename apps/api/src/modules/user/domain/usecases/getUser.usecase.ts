import { z } from 'zod';

export const GetUserResponceSchema = z.object({
  id: z.number(),
});

export type GetUserResponse = z.infer<typeof GetUserResponceSchema>;

export const GetUserRequestSchema = z.object({
  age: z.number().nullable(),
  avatarUrl: z.string().nullable(),
  description: z.string().nullable(),
  email: z.string(),
  name: z.string().nullable(),
  sex: z.string().nullable(),
});

export type GetUserRequest = z.infer<typeof GetUserRequestSchema>;

export interface GetUserUsecase {
  getUser(request: GetUserResponse): Promise<GetUserRequest>;
}
