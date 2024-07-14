import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '@project/api/config';
import { UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';
import {
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  RegisterUsecase,
  RegisterWithEmailRequest,
  RegisterWithEmailResponse,
} from '../../domain/usecases/register.usecase';
import { UserAlreadyExistsError } from '@project/api/modules/user/domain/errors/user-already-exists.error';
import { RegisterTransporterPort } from '../../domain/transporter/register.transporter';

export class RegisterService implements RegisterUsecase {
  constructor(private userRepository: UserRepositoryPort, private registerTransporter: RegisterTransporterPort) {}

  async registerWithEmail(request: RegisterWithEmailRequest): Promise<RegisterWithEmailResponse> {
    const isAlreadyExists = (await this.userRepository.findUserByEmail({ email: request.email })) !== null;
    if (isAlreadyExists) {
      throw new UserAlreadyExistsError(`User with email "${request.email}" already exists`);
    }

    const passwordHash = await this.createPasswordHash(request.password);

    const user = await this.userRepository.createUserWithEmail({
      email: request.email,
      passwordHash,
    });

    // code is used to confirm the user on "user.confirm" route
    const token = jwt.sign({ id: user.id.toString() }, config.get('secret'), { expiresIn: '6h' });

    const confirmationUrl = `${request.baseUrl}/user.confirm?${new URLSearchParams({ token })}`;

    await this.registerTransporter.sendEmailConfirmation({ to: request.email, confirmationUrl });

    return;
  }

  async confirm(request: ConfirmEmailRequest): Promise<ConfirmEmailResponse> {
    const decoded = jwt.verify(request.token, config.get('secret'));

    if (typeof decoded !== 'object' || typeof decoded['id'] !== 'string') {
      throw new Error(`Provided invalid jwt token. Decoded payload: ${decoded}`);
    }

    await this.userRepository.confirmUserAccount({ id: Number(decoded.id) });

    return;
  }

  private async createPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
