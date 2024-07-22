import { UserSchema } from '@project/api/modules/user/domain/entities/user.entity';
import { z } from 'zod';

export const SenderSchema = UserSchema.pick({ id: true, name: true, avatarUrl: true });

export const MessageSchema = z.object({
  id: z.number().int().min(0),
  sender: SenderSchema,
  content: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;
