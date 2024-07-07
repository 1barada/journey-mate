import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class InvalidPasswordError extends BaseError {
  code: ErrorCode = 'BAD_REQUEST';

  constructor(message = 'Invalid password provided') {
    super(message);
  }
}
