import { z } from 'zod';

export interface cookieValidationParams {
  cookieObj: { [cookieName: string]: string | undefined };
  cookiesValidationSchema: z.Schema;
}
