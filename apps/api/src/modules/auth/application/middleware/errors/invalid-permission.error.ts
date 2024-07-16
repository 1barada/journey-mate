import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class InvalidPermissionError extends BaseError {
  code: ErrorCode = 'FORBIDDEN';

  constructor(message = 'Access denied') {
    super(message);
  }
}
