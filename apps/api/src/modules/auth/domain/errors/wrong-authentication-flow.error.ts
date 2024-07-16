import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class WrongAuthenticationFlowError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'Wrong authentication flow') {
    super(message);
  }
}
