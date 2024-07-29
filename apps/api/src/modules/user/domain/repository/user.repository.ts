import { User, UserWithPassword } from '../entities/user.entity';

export interface FindUserByEmailParams {
  email: string;
}

export type FindUserByEmailResult = UserWithPassword | null;

export interface FindUserByIdParams {
  id: number;
}

export type FindUserByIdResult = UserWithPassword | null;

export interface ConfirmUserAccountParams {
  id: number;
}

export type ConfirmUserAccountResult = void;

export interface CreateUserWithEmailParams {
  email: string;
  passwordHash: string;
}

export type CreateUserWithEmailResult = User;

export type SetRestoreTokenParams = {
  id: string | number;
  restoreToken: string;
};

export type SetRestoreTokenResult = void;

export type UpdateUserPasswordParams = {
  id: string | number;
  passwordHash: string;
};

export type UpdateUserPasswordResult = Pick<User, 'email' | 'name'>;

export interface UserRepositoryPort {
  findUserByEmail(params: FindUserByEmailParams): Promise<FindUserByEmailResult>;
  findUserById(params: FindUserByIdParams): Promise<FindUserByIdResult>;
  updateUser(user: User): Promise<void>;
  confirmUserAccount(params: ConfirmUserAccountParams): Promise<ConfirmUserAccountResult>;
  createUserWithEmail(params: CreateUserWithEmailParams): Promise<CreateUserWithEmailResult>;
  updateUserData(params: User): Promise<void>;
  updateUserAvatar(params: User): Promise<void>;
  setRestoreToken(params: SetRestoreTokenParams): Promise<SetRestoreTokenResult>;
  updateUserPassword(params: UpdateUserPasswordParams): Promise<UpdateUserPasswordResult>;
}
