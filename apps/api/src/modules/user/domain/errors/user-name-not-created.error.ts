import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class UserNameNotCreatedError extends BaseError {
  code: ErrorCode = 'FORBIDDEN';

  constructor(message = 'User name not created') {
    super(message);
  }
}
