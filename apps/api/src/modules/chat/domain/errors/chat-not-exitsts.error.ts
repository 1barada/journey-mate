import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class ChatNotExistsError extends BaseError {
  code: ErrorCode = 'NOT_FOUND';

  constructor(message = 'Chat not exitsts') {
    super(message);
  }
}
