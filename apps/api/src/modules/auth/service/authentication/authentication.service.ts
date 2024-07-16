import { config } from '@project/api/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class AuthenticationService {
  private secret = config.get('secret');

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
