import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class JoinRequestEventUserIdNotProvided extends BaseError {
  code: ErrorCode = 'BAD_REQUEST';

  constructor(message = 'JoinRequest event require userId to be provided.') {
    super(message);
  }
}
