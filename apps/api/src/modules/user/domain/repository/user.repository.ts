import { User, UserWithPassword } from '../entities/user.entity';

export interface FindUserByEmailParams {
  email: string;
}

export interface FindUserByIdParams {
  id: number;
}

export type FindUserByIdResult = User | null;

export type FindUserByEmailResult = UserWithPassword | null;

export interface UserRepositoryPort {
  findUserByEmail(params: FindUserByEmailParams): Promise<FindUserByEmailResult>;
  findUserById(params: FindUserByIdParams): Promise<FindUserByIdResult>;
  updateUser(user: User): Promise<void>;
}
