import { cookieSchema } from '../schemas/cookieSchema';

export interface cookieValidationParams {
  cookieObj: { [cookieName: string]: string | undefined };
  cookiesValidationSchema: typeof cookieSchema;
}
