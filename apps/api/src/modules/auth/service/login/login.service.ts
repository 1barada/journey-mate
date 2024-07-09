import { config } from '@project/api/config';
import { UserNotFoundError } from '@project/api/modules/user/domain/errors/user-not-found.error';
import { UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { InvalidPasswordError } from '../../domain/errors/invalid-password.error';
import { LoginRequest, LoginResponse, LoginUsecase } from '../../domain/usecases/login.usecase';

export class LoginService implements LoginUsecase {
  private jwt = {
    secret: config.get('secret'),
    expiresIn: '20h',
  };

  constructor(private userRepository: UserRepositoryPort) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findUserByEmail({ email: request.email });

    if (!user) {
      throw new UserNotFoundError(`User with email "${request.email}" does not exist`);
    }

    const isValid = await bcrypt.compare(request.password, user.password);
    if (!isValid) {
      throw new InvalidPasswordError();
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, this.jwt.secret, { expiresIn: this.jwt.expiresIn });

    return { user, token };
  }
}
