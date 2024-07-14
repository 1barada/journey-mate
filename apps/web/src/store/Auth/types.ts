export interface User {
  name: string;
  email: string;
  sex: sex | null;
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

export enum sex {
  female = 'female',
  male = 'male',
}

export interface ProfileDataPayload {
  email: string;
  name: string;
  sex: sex | null;
  age: number;
}
