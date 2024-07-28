import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepositoryPort } from '../../domain/repository/user.repository';
import { GetUserRequest, GetUserResponse, GetUserUsecase } from '../../domain/usecases/getUser.usecase';

export class GetUserService implements GetUserUsecase {
  constructor(private userRepository: UserRepositoryPort) {}

  async getUser(request: GetUserResponse): Promise<GetUserRequest> {
    const findUser = await this.userRepository.findUserById({ id: request.id });

    if (!findUser) {
      throw new UserNotFoundError();
    }

    const user = {
      age: findUser.age,
      avatarUrl: findUser.avatarUrl,
      description: findUser.description,
      email: findUser.email,
      name: findUser.name,
      sex: findUser.sex,
    };

    return user;
  }
}
