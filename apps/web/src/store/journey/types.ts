interface BaseSlice {
  loading: boolean;
  error: null | string;
}

export interface JourneySlice extends BaseSlice {
  journey: unknown;
}
