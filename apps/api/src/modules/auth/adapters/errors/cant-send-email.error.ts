import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class CantSendEmailError extends BaseError {
  code: ErrorCode = 'INTERNAL_SERVER_ERROR';

  constructor(message = "Can't send email") {
    super(message);
  }
}
