import type { cookieValidationParams } from './types';

export const cookValidation = ({ cookieObj, cookiesValidationSchema }: cookieValidationParams) =>
  cookiesValidationSchema.safeParse(cookieObj);
