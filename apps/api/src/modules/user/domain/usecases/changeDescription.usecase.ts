import { ChangeDescriptionRequest, ChangeDescriptionResponse } from '../entities/userUpdate.entity';

export interface ChangeDescriptionUsecase {
  changeDescription(request: ChangeDescriptionRequest): Promise<ChangeDescriptionResponse>;
}
