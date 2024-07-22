import { BaseError } from '@project/api/utils/errors/base-error';
import { ErrorCode } from '@project/api/utils/errors/error-code';

export class NotificationNotExists extends BaseError {
  code: ErrorCode = 'NOT_FOUND';

  constructor(message = 'Not found') {
    super(message);
  }
}
