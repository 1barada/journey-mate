import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class AccountNotActivatedError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'Account not activated') {
    super(message);
  }
}
