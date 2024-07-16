import { LoaderFunction, ShouldRevalidateFunction } from 'react-router-dom';

import { whoamiAsyncThunk } from '../../store/Auth/asyncThunks';
import { store } from '../../store/store';

export const whoamiRouteLoader: LoaderFunction = async () => {
  try {
    const res = await store.dispatch(whoamiAsyncThunk()).unwrap();

    return res;
  } catch {
    return null;
  }
};

export const shouldRevalidateWhoami: ShouldRevalidateFunction = () => {
  return false;
};
