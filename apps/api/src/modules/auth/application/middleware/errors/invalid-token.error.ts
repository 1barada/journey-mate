import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class InvalidTokenError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'Invalid token') {
    super(message);
  }
}
