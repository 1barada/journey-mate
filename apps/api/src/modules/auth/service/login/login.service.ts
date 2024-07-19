import { config } from '@project/api/config';
import { UserNotFoundError } from '@project/api/modules/user/domain/errors/user-not-found.error';
import { UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { InvalidPasswordError } from '../../domain/errors/invalid-password.error';
import { WrongAuthenticationFlowError } from '../../domain/errors/wrong-authentication-flow.error';
import { LoginRequest, LoginResponse, LoginUsecase } from '../../domain/usecases/login.usecase';

export class LoginService implements LoginUsecase {
  private jwt = {
    secret: config.get('jwtSecret'),
    expiresIn: '20h',
  };

  constructor(private userRepository: UserRepositoryPort) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findUserByEmail({ email: request.email });

    if (!user) {
      throw new UserNotFoundError(`User with email "${request.email}" does not exist`);
    }

    if (user.authProvider !== 'password') {
      throw new WrongAuthenticationFlowError(`Used wrong authentication flow. Allowed flow: ${user.authProvider}`);
    }

    if (user.passwordHash === null) {
      throw new Error(`Password hash on 'password' auth provider is null`);
    }

    const isValid = await bcrypt.compare(request.password, user.passwordHash);
    if (!isValid) {
      throw new InvalidPasswordError();
    }

    const token = jwt.sign({ userId: user.id, userEmail: user.email, userRole: user.role }, this.jwt.secret, {
      expiresIn: this.jwt.expiresIn,
    });

    return { user, token };
  }
}
