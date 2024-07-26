import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepositoryPort } from '../../domain/repository/user.repository';
import {
  ChangeProfileDataUsecase,
  ChangeProfileRequest,
  ChangeProfileResponse,
} from '../../domain/usecases/changeUserProfile.usecase';

export class ChangeProfileDataServece implements ChangeProfileDataUsecase {
  constructor(private userRepository: UserRepositoryPort) {}

  async changeProfileData(request: ChangeProfileRequest): Promise<ChangeProfileResponse> {
    const user = await this.userRepository.findUserById({ id: request.id });

    if (!user) {
      throw new UserNotFoundError();
    }
    user.email = request.email;
    user.name = request.name;
    user.dateOfBirth = request.dateOfBirth ?? user.dateOfBirth;
    user.sex = request.sex ?? user.sex;
    await this.userRepository.updateUserData(user);

    return { email: user.email, name: user.name, sex: user.sex, dateOfBirth: user.dateOfBirth };
  }
}
