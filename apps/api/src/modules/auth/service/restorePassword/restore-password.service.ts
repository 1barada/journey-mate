import { config } from '@project/api/config';
import { UserNotAllow } from '@project/api/modules/notification/errors/user-not-allow.error';
import { UserNotFoundError } from '@project/api/modules/user/domain/errors/user-not-found.error';
import { UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AccountNotActivatedError } from '../../domain/errors/account-not-activated.error';
import { WrongAuthenticationFlowError } from '../../domain/errors/wrong-authentication-flow.error';
import {
  RestorePasswordTransporterPort,
  SendEmailRestorePasswordUser,
} from '../../domain/transporter/restorePassword.transporter';
import {
  RestorePasswordRequest,
  RestorePasswordResponse,
  RestorePasswordUsecase,
} from '../../domain/usecases/restorePassword.usecase';
import {
  RestorePasswordViaEmailRequest,
  RestorePasswordViaEmailResponse,
  RestorePasswordViaEmailUsecase,
} from '../../domain/usecases/restorePasswordViaEmail.usecase';

import { AdminCannotResetPasswordError } from './errors/admin-cannot-reset-password.error';
import { InvalidRestorePasswordTokenError } from './errors/invalid-restore-password-token.error';
import { SamePasswordError } from './errors/same-password.error';

export class RestorePasswordService implements RestorePasswordViaEmailUsecase, RestorePasswordUsecase {
  private jwt = {
    secret: config.get('jwtSecret'),
    expiresIn: '24h',
  };

  private baseUrl = config.get('frontendUrl');

  constructor(
    private userRepository: UserRepositoryPort,
    private restorePasswordTransporter: RestorePasswordTransporterPort
  ) {}

  async restorePasswordEmail(request: RestorePasswordViaEmailRequest): Promise<RestorePasswordViaEmailResponse> {
    const user = await this.userRepository.findUserByEmail({ email: request.email });

    if (!user) {
      throw new UserNotFoundError(`User with email "${request.email}" does not exist`);
    }

    if (user.authProvider !== 'password') {
      throw new WrongAuthenticationFlowError(`Used wrong authentication flow.`);
    }

    if (!user.active) {
      throw new AccountNotActivatedError(`Account not activated. Please click on link that we sended on your email`);
    }

    if (user.role === 'admin') {
      throw new AdminCannotResetPasswordError();
    }

    const restoreToken = jwt.sign({ id: user.id.toString() }, this.jwt.secret, {
      expiresIn: this.jwt.expiresIn,
    });

    const restorePasswordUrl = `${this.baseUrl}/user.restorePassword?${new URLSearchParams({ restoreToken })}`;

    const emailUser: SendEmailRestorePasswordUser = {};
    if (user.name) {
      emailUser.name = user.name;
    }

    await this.userRepository.setRestoreToken({ id: user.id, restoreToken });

    await this.restorePasswordTransporter.sendEmailRestorePassword({
      to: request.email,
      restorePasswordUrl,
      user: emailUser,
    });

    return;
  }

  async restorePassword(request: RestorePasswordRequest): Promise<RestorePasswordResponse> {
    const { newPassword, restoreToken } = request;
    const decodedToken = jwt.verify(restoreToken, config.get('jwtSecret')) as JwtPayload;

    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      throw new InvalidRestorePasswordTokenError('Token expired');
    }

    if (!decodedToken.id) {
      throw new InvalidRestorePasswordTokenError('Invalid  token');
    }

    const newPasswordHash = await this.createPasswordHash(newPassword);

    const user = await this.userRepository.findUserById({ id: decodedToken.id });

    if (!user) {
      throw new UserNotFoundError(`User with id "${decodedToken.id}" does not exist`);
    }

    if (user.authProvider !== 'password' || !user.passwordHash) {
      throw new UserNotAllow('User with social auth cannot reset password');
    }

    if (user.restoreToken !== restoreToken) {
      throw new InvalidRestorePasswordTokenError('Invalid token');
    }

    const isPasswordSame = await bcrypt.compare(newPasswordHash, user.passwordHash);
    if (isPasswordSame) {
      throw new SamePasswordError();
    }

    const result = await this.userRepository.updateUserPassword({ id: user.id, passwordHash: newPasswordHash });

    return { user: { name: result.name, email: result.email } };
  }

  private async createPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
