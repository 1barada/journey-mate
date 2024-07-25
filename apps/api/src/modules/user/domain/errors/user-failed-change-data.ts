import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class UserNotFoundError extends BaseError {
  code: ErrorCode = 'BAD_REQUEST';

  constructor(message = 'Failed to change data') {
    super(message);
  }
}
