import { z } from 'zod';

import { NotificationSchema } from '../domain/entities/notification.entity';

import { NotificationEventSchema, NotificationEventTypeSchema } from './../domain/entities/notificationEvent.entity';

export const GetNotificationRequestSchema = z.object({ notificationId: z.string() });

export const GetNotificationResponseSchema = z.object({
  id: z.number(),
  journeyId: z.number(),
  title: z.string(),
  userId: z.number(),
  totalEvents: z.number(),
  events: z.array(NotificationEventSchema) || [],
});

export const GetAllNotificationsResponseSchema = z.array(
  z.object({
    id: z.number(),
    userId: z.number(),
    journeyId: z.number(),
    title: z.string(),
    totalEvents: z.number(),
  })
);

export const GetAllNotificationEventsRequestSchema = z.object({ notificationId: z.string() });

export const GetAllNotificationEventsResultSchema = z.array(
  z.object({
    id: z.number(),
    notificationId: z.number(),
    userId: z.number().nullable(),
    user: z.string().nullable(),
    type: z.string(),
    createdAt: z.date(),
  })
);

export const DeleteNotificationEventRequestSchema = z.object({ id: z.string(), notificationId: z.string() });

export const DeleteNotificationEventResultSchema = NotificationEventSchema.nullable();

export const CreateNotificationRequestSchema = z.object({
  userId: z.string(),
  journeyId: z.string(),
});

export const CreateNotificationResultSchema = NotificationSchema.nullable();

export const CreateNotificationEventRequestSchema = z.object({
  userId: z.string().nullable(),
  notificationId: z.string(),
  type: NotificationEventTypeSchema,
});

export const CreateNotificationEventResultSchema = NotificationEventSchema.nullable();
