import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class TokenNotProvidedError extends BaseError {
  code: ErrorCode = 'UNAUTHORIZED';

  constructor(message = 'Access token not provided via cookie') {
    super(message);
  }
}
