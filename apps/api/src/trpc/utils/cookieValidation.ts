import { RequestCookies, RequestCookieSchema } from '../schemas/cookieSchema';

interface RawCookies {
  [cookieName: string]: string | undefined;
}

export function cookiesValidation(cookies: RawCookies): RequestCookies | null {
  const validation = RequestCookieSchema.safeParse({
    accessToken: cookies['access-token'],
  });

  return validation.success ? validation.data : null;
}
