import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class UserIdRequiredError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'Access denied') {
    super(message);
  }
}
