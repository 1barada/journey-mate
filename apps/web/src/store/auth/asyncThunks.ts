import { createAsyncThunk } from '@reduxjs/toolkit';

import { trpcClient } from '../../services/trpc';
import { isTRPCError } from '../../utils/type-guards';

export const whoamiAsyncThunk = createAsyncThunk('auth/whoami', async (_, { rejectWithValue, signal }) => {
  try {
    const res = await trpcClient.user.whoami.query(undefined, { signal });
    return res;
  } catch (error) {
    const payload = {
      message: (error as Error)?.message || '',
      statusCode: 500,
    };

    if (isTRPCError(error)) {
      payload.message = error.message;
      payload.statusCode = error.data.httpStatus as number;
    }

    return rejectWithValue(payload);
  }
});
