import { config } from '@project/api/config';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.get('googleClientId'), config.get('googleClientSecret'));

export async function verifyGoogleToken(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.get('googleClientId'),
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error('Invalid Google token');
  }
  return {
    email: payload.email,
    name: payload.name,
    googleId: payload.sub,
  };
}
