import { ChangeDescriptionRequest, ChangeDescriptionResponse } from '../../domain/entities/userUpdate.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepositoryPort } from '../../domain/repository/user.repository';
import { ChangeDescriptionUsecase } from '../../domain/usecases/changeDescription.usecase';

export class ChangeDescriptionService implements ChangeDescriptionUsecase {
  constructor(private userRepository: UserRepositoryPort) {}

  async changeDescription(request: ChangeDescriptionRequest): Promise<ChangeDescriptionResponse> {
    const user = await this.userRepository.findUserById({ id: Number(request.id) });
    if (!user) {
      throw new UserNotFoundError();
    }
    user.description = request.description;
    await this.userRepository.updateUser(user);
    return { description: user.description };
  }
}
