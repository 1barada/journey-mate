import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class UserNotFoundError extends BaseError {
  code: ErrorCode = 'NOT_FOUND';

  constructor(message = 'User not found') {
    super(message);
  }
}
