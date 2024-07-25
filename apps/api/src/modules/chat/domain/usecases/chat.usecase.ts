import { z } from 'zod';

import { MessageSchema } from '../entities/chat.entity';

export const GetMessagesRequestSchema = z.object({
  chatId: z.number().int().min(0),
  take: z.number().min(1).max(Infinity).default(100),
  skip: z.number().min(0).default(0),
});

export type GetMessagesRequest = z.infer<typeof GetMessagesRequestSchema>;

export const GetMessagesResponseSchema = z.array(MessageSchema);

export type GetMessagesResponse = z.infer<typeof GetMessagesResponseSchema>;

export const SendMessageRequestSchema = z.object({
  chatId: z.number().int().min(0),
  content: z.string().min(1).max(400),
});

export type SendMessageRequest = { senderId: number } & z.infer<typeof SendMessageRequestSchema>;

export const SendMessageResponseSchema = MessageSchema;

export type SendMessageResponse = z.infer<typeof SendMessageResponseSchema>;

export interface ChatUsecase {
  getMessages(request: GetMessagesRequest): Promise<GetMessagesResponse>;
  sendMessage(request: SendMessageRequest): Promise<SendMessageResponse>;
}
