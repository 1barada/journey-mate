import type { TRPCErrorShape } from '@trpc/server/rpc';

export const isString = (value: unknown): value is string => typeof value === 'string';

// errors
export const isTRPCError = (err: unknown): err is TRPCErrorShape => {
  return typeof err === 'object' && err !== null && !Array.isArray(err) && 'data' in err;
};

export const isWhoamiError = (err: unknown): err is { message: string; statusCode: number | null } => {
  return typeof err === 'object' && err !== null && !Array.isArray(err) && 'message' in err && 'statusCode' in err;
};
