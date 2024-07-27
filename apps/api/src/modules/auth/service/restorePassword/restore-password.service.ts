// import { config } from '@project/api/config';
// import { UserNotFoundError } from '@project/api/modules/user/domain/errors/user-not-found.error';
import { UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';

// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { AccountNotActivatedError } from '../../domain/errors/account-not-activated.error';
import { LoginTransporterPort } from '../../domain/transporter/login.transporter';
import {
  RestorePasswordRequest,
  RestorePasswordResponse,
  RestorePasswordUsecase,
} from '../../domain/usecases/restorePassword.usecase';
import {
  RestorePasswordEmailRequest,
  RestorePasswordEmailResponse,
  RestorePasswordEmailUsecase,
} from '../../domain/usecases/restorePasswordEmail.usecase';

export class RestorePasswordService implements RestorePasswordEmailUsecase, RestorePasswordUsecase {
  constructor(private userRepository: UserRepositoryPort, private loginTransporter: LoginTransporterPort) {}

  // async login(request: LoginRequest): Promise<LoginResponse> {
  //   const user = await this.userRepository.findUserByEmail({ email: request.email });

  //   if (!user) {
  //     throw new UserNotFoundError(`User with email "${request.email}" does not exist`);
  //   }

  //   if (user.authProvider !== 'password') {
  //     throw new WrongAuthenticationFlowError(`Used wrong authentication flow. Allowed flow: ${user.authProvider}`);
  //   }

  //   if (!user.active) {
  //     throw new AccountNotActivatedError(`Account not activated. Please click on link that we sended on your email`);
  //   }

  //   if (user.passwordHash === null) {
  //     throw new Error(`Password hash on 'password' auth provider is null`);
  //   }

  //   const isValid = await bcrypt.compare(request.password, user.passwordHash);
  //   if (!isValid) {
  //     throw new InvalidPasswordError();
  //   }

  //   const token = jwt.sign({ userId: user.id, userEmail: user.email, userRole: user.role }, this.jwt.secret, {
  //     expiresIn: this.jwt.expiresIn,
  //   });

  //   return { user, token };
  // }

  async restorePasswordEmail(request: RestorePasswordEmailRequest): Promise<RestorePasswordEmailResponse> {
    const user = await this.userRepository.findUserByEmail({ email: request.email });
    // if(){}

    return;
  }

  async restorePassword(request: RestorePasswordRequest): Promise<RestorePasswordResponse> {
    return;
  }
}
