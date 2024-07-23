import { User, UserWithPassword } from '../entities/user.entity';

export interface FindUserByEmailParams {
  email: string;
}

export interface FindUserByIdParams {
  id: number;
}

export type FindUserByIdResult = User | null;

export type FindUserByEmailResult = UserWithPassword | null;

export interface ConfirmUserAccountParams {
  id: number;
}

export type ConfirmUserAccountResult = void;

export interface CreateUserWithEmailParams {
  email: string;
  passwordHash: string;
}

export type CreateUserWithEmailResult = User;

export interface UserRepositoryPort {
  findUserByEmail(params: FindUserByEmailParams): Promise<FindUserByEmailResult>;
  findUserById(params: FindUserByIdParams): Promise<FindUserByIdResult>;
  updateUser(user: User): Promise<void>;
  confirmUserAccount(params: ConfirmUserAccountParams): Promise<ConfirmUserAccountResult>;
  createUserWithEmail(params: CreateUserWithEmailParams): Promise<CreateUserWithEmailResult>;
  updateUserData(params: User): Promise<void>;
}
