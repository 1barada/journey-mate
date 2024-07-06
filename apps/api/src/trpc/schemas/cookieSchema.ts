import { z } from 'zod';

export const cookieSchema = z.object({
  accessToken: z.string().min(1),
});
