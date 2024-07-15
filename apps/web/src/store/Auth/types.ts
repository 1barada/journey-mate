export interface User {
  name: string;
  email: string;
  sex: Sex | null;
  description: string;
  age: number | null;
  avatar: string | null;
}

export interface IAuthSlice {
  user: User;
  isLoading: boolean;
  error: null | string;
  isAuthenticated: boolean;
}

export interface ProfileDataPayload {
  email: string;
  name: string;
  sex: Sex | null;
  age: number;
}

export enum Sex {
  Female = 'female',
  Male = 'male',
}
