import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class UserAlreadyExistsError extends BaseError {
  code: ErrorCode = 'CONFLICT';

  constructor(message = 'User already exists') {
    super(message);
  }
}
