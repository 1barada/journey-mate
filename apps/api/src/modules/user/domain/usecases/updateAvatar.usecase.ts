import { z } from 'zod';

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

export type UpdateUserAvatarResponce = z.infer<typeof UpdateUserAvatarResponseSchema>;
export type UpdateUserAvatarRequest = z.infer<typeof UpdateUserAvatarRequestSchema>;

export interface UpdateUserAvatarUsecase {
  updateUserAvatar(request: UpdateUserAvatarRequest): Promise<UpdateUserAvatarResponce>;
}
