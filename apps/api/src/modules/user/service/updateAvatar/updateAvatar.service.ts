import { UpdateUserAvatarRequest, UpdateUserAvatarResponce } from '../../domain/entities/userUpdate.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepositoryPort } from '../../domain/repository/user.repository';
import { UpdateUserAvatarUsecase } from '../../domain/usecases/updateAvatar.usecase';

export class UpdateUserAvatarService implements UpdateUserAvatarUsecase {
  constructor(private userRepository: UserRepositoryPort) {}

  async updateUserAvatar(request: UpdateUserAvatarRequest): Promise<UpdateUserAvatarResponce> {
    const user = await this.userRepository.findUserById({ id: request.id });

    if (!user) {
      throw new UserNotFoundError();
    }

    user.avatarUrl = request.avatarUrl;
    await this.userRepository.updateUser(user);

    return { avatarUrl: user.avatarUrl };
  }
}
