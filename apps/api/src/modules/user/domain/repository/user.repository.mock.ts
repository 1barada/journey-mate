import { vi } from 'vitest';

import { FindUserByEmailResult, UserRepositoryPort } from './user.repository';

export const defaultUserRepositoryMock: UserRepositoryPort = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findUserByEmail: vi.fn<any, Promise<FindUserByEmailResult>>().mockResolvedValue({
    id: 1,
    active: true,
    authProvider: 'password',
    email: 'user@mail.com',
    name: 'John Doe',
    passwordHash: '$2b$10$pKokDDJDr40sHA0aZZbI6OnTzqwRHGgAZvTU8Q1HnP5k1enpCtBzS', // password: 12345678
    role: 'admin',
  }),
  confirmUserAccount: vi.fn().mockResolvedValue({}),
  createUserWithEmail: vi.fn().mockResolvedValue({}),
};
