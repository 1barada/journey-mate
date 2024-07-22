import { string, z } from 'zod';

import { NotificationEventTypeSchema } from '../domain/entities/notificationEvent.entity';

export const GetAllNotificationRequestSchema = z.object({ notificationId: z.string() });

export const GetAllNotificationResponseSchema = z.array(
  z.object({
    id: z.number(),
    userId: z.number(),
    journeyId: z.number(),
    title: z.string(),
    totalEvents: z.number(),
  })
);

export const GetAllNotificationEventsRequestSchema = z.object({ notificationId: z.string() });

export const GetNotificationEventsResultSchema = z.array(
  z.object({
    id: z.number(),
    notificationId: z.number(),
    userId: z.number().nullable(),
    user: z.string().nullable(),
    type: z.string(),
    createdAt: z.date(),
  })
);
