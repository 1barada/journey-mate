import { UserWithPassword } from '../entities/user.entity';

export interface FindUserByEmailParams {
  email: string;
}

export type FindUserByEmailResult = UserWithPassword | null;

export interface UserRepositoryPort {
  findUserByEmail(params: FindUserByEmailParams): Promise<FindUserByEmailResult>;
}
