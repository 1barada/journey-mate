import { UpdateUserAvatarRequest, UpdateUserAvatarResponce } from '../entities/userUpdate.entity';

export interface UpdateUserAvatarUsecase {
  updateUserAvatar(request: UpdateUserAvatarRequest): Promise<UpdateUserAvatarResponce>;
}
