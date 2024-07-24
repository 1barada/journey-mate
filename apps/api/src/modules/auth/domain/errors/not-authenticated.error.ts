import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class NotAuthenticatedError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'User not authenticated') {
    super(message);
  }
}
