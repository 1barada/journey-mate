import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class AdminCannotResetPasswordError extends BaseError {
  code: ErrorCode = 'UNPROCESSABLE_CONTENT';

  constructor(message = 'Admin cannot reset password with default method') {
    super(message);
  }
}
