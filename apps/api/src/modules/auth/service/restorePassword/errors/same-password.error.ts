import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class SamePasswordError extends BaseError {
  code: ErrorCode = 'BAD_REQUEST';

  constructor(message = 'Old password cannot be the same as new password') {
    super(message);
  }
}
