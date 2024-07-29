import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class InvalidRestorePasswordTokenError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'Invalid token') {
    super(message);
  }
}
