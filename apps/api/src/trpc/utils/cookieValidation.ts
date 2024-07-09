import type { cookieValidationParams } from './types';

export const cookiesValidation = ({ cookieObj, cookiesValidationSchema }: cookieValidationParams) =>
  cookiesValidationSchema.safeParse(cookieObj);
