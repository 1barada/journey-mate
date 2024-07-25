import { ChangeProfileRequest, ChangeProfileResponse } from '../entities/userUpdate.entity';

export interface ChangeProfileDataUsecase {
  changeProfileData(request: ChangeProfileRequest): Promise<ChangeProfileResponse>;
}
