import { z } from 'zod';

import { NotificationEventSchema } from './notificationEvent.entity';

export const NotificationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  journeyId: z.number(),
  events: z.array(NotificationEventSchema).default([]).optional(),
  createdAt: z.date(),
});

export type Notification = z.infer<typeof NotificationSchema>;
