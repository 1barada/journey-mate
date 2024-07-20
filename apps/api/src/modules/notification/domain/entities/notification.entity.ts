import { z } from 'zod';

export const NotificationEventTypeSchema = z.enum(['joinRequest', 'chatMessage', 'chatMessageMention']);

export const NotificationEventSchema = z.object({
  id: z.number(),
  notificationId: z.number(),
  userId: z.number(),
  type: NotificationEventTypeSchema,
  createdAt: z.date(),
});

export type NotificationEvent = z.infer<typeof NotificationEventSchema>;

export const NotificationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  journeyId: z.number(),
  events: z.array(NotificationEventSchema).default([]),
  createdAt: z.date(),
});

export type Notification = z.infer<typeof NotificationSchema>;
