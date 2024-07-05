import '@fastify/cookie';
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    cookies: { [key: string]: string | undefined };
    unsignCookie: (value: string) => { valid: boolean; renew: boolean; value: string | null };
  }

  interface FastifyReply {
    setCookie(name: string, value: string, options?: CookieSerializeOptions): FastifyReply;
    clearCookie(name: string, options?: CookieSerializeOptions): FastifyReply;
  }
}
