import { z } from 'zod';

export const RequestCookieSchema = z.object({
  accessToken: z.string().min(1),
});

export type RequestCookies = z.infer<typeof RequestCookieSchema>;
