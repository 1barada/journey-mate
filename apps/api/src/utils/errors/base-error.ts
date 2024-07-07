import { ErrorCode } from './error-code';

export abstract class BaseError extends Error {
  abstract code: ErrorCode;

  protected serialize() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
