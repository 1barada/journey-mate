import { User, UserWithPassword } from '../entities/user.entity';

export interface FindUserByEmailParams {
  email: string;
}

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
  confirmUserAccount(params: ConfirmUserAccountParams): Promise<ConfirmUserAccountResult>;
  createUserWithEmail(params: CreateUserWithEmailParams): Promise<CreateUserWithEmailResult>;
}
