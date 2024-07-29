import { UserNotFoundError } from '@project/api/modules/user/domain/errors/user-not-found.error';
import { FindUserByEmailResult, UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';
import { defaultUserRepositoryMock } from '@project/api/modules/user/domain/repository/user.repository.mock';

import { InvalidPasswordError } from '../../domain/errors/invalid-password.error';
import { WrongAuthenticationFlowError } from '../../domain/errors/wrong-authentication-flow.error';

import { LoginService } from './login.service';

describe('LoginService', () => {
  const createLoginService = (userRepositoryMock = defaultUserRepositoryMock) => {
    return new LoginService(userRepositoryMock);
  };

  const password = '12345678';
  const passwordHash = '$2b$10$pKokDDJDr40sHA0aZZbI6OnTzqwRHGgAZvTU8Q1HnP5k1enpCtBzS'; // bcrypt.hashSync(password, 10);

  it('successfully logs user in', async () => {
    const userRepositoryMock: UserRepositoryPort = {
      ...defaultUserRepositoryMock,
    };

    const loginService = createLoginService(userRepositoryMock);

    const result = await loginService.login({ email: 'user@mail.com', password });

    expect(result).toEqual({
      user: {
        id: 1,
        active: true,
        authProvider: 'password',
        email: 'user@mail.com',
        name: 'John Doe',
        passwordHash,
        role: 'admin',
      },
      token: expect.stringContaining('.'),
    });

    expect(userRepositoryMock.findUserByEmail).toBeCalledWith({ email: 'user@mail.com' });
  });

  it('fails when user provides incorrect password', async () => {
    const userRepositoryMock: UserRepositoryPort = {
      ...defaultUserRepositoryMock,
    };

    const loginService = createLoginService(userRepositoryMock);

    await expect(loginService.login({ email: 'user@mail.com', password: '2830923' })).rejects.toThrow(
      InvalidPasswordError
    );

    expect(userRepositoryMock.findUserByEmail).toBeCalledWith({ email: 'user@mail.com' });
  });

  it('fails when user provides incorrect password', async () => {
    const userRepositoryMock: UserRepositoryPort = {
      ...defaultUserRepositoryMock,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      findUserByEmail: vi.fn<any, Promise<FindUserByEmailResult>>().mockResolvedValue(null),
    };

    const loginService = createLoginService(userRepositoryMock);

    await expect(loginService.login({ email: 'user@mail.com', password: '2830923' })).rejects.toThrow(
      UserNotFoundError
    );

    expect(userRepositoryMock.findUserByEmail).toBeCalledWith({ email: 'user@mail.com' });
  });

  it('fails when user has social media as default auth provider', async () => {
    const userRepositoryMock: UserRepositoryPort = {
      ...defaultUserRepositoryMock,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      findUserByEmail: vi.fn<any, Promise<FindUserByEmailResult>>().mockResolvedValue({
        id: 1,
        active: true,
        authProvider: 'socials',
        email: 'user@mail.com',
        name: 'John Doe',
        passwordHash: '$2b$10$pKokDDJDr40sHA0aZZbI6OnTzqwRHGgAZvTU8Q1HnP5k1enpCtBzS',
        role: 'admin',
      }),
    };

    const loginService = createLoginService(userRepositoryMock);

    await expect(loginService.login({ email: 'user@mail.com', password: '2830923' })).rejects.toThrow(
      WrongAuthenticationFlowError
    );

    expect(userRepositoryMock.findUserByEmail).toBeCalledWith({ email: 'user@mail.com' });
  });
});
