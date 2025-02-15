import { z } from 'zod';

export const NotificationEventTypeSchema = z.enum(['joinRequest', 'chatMessage']);

export const NotificationEventSchema = z.object({
  id: z.number(),
  notificationId: z.number(),
  userId: z.number().nullable(),
  type: NotificationEventTypeSchema,
  createdAt: z.date(),
});

export type NotificationEvent = z.infer<typeof NotificationEventSchema>;
