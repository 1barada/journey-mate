import { faker } from '@faker-js/faker';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { inferProcedureInput } from '@trpc/server';
import { beforeAll, describe, expect, it } from 'vitest';

import { config } from '../src/config';
import { AppRouter } from '../src/trpc/router';

type LoginInput = inferProcedureInput<AppRouter['user']['login']>;
type RegisterInput = inferProcedureInput<AppRouter['user']['registerWithEmail']>;
type CreateJourneyInput = inferProcedureInput<AppRouter['journey']['createJourney']>;

const generateRandomRegisterDto = (): RegisterInput => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
});

const generateRandomJourneyDto = (): CreateJourneyInput => ({
  userId: faker.number.int({ min: 1, max: 1000 }),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  milestones: [
    {
      title: faker.lorem.words(3),
      coords: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      dates: [faker.date.past(), faker.date.future()],
    },
  ],
  category: [{ value: faker.word.noun() }],
});

describe('App Tests (e2e)', () => {
  let client: ReturnType<typeof createTRPCProxyClient<AppRouter>>;
  const host = config.get('host');
  const port = config.get('port');

  beforeAll(async () => {
    client = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `http://${host}:${port}/trpc`,
        }),
      ],
    });
  });

  it('user.registerWithEmail - Successful registration', async () => {
    try {
      const registerDto = generateRandomRegisterDto();
      const response = await client.user.registerWithEmail.mutate(registerDto);
      console.log('Registration response:', response);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  });

  it('user.login - Successful login', async () => {
    const registerDto = generateRandomRegisterDto();
    await client.user.registerWithEmail.mutate(registerDto);

    const loginDto: LoginInput = {
      email: registerDto.email,
      password: registerDto.password,
    };

    await client.user.login.mutate(loginDto);
    // void response?
  });

  it('user.login - Invalid credentials', async () => {
    const loginDto: LoginInput = {
      email: 'nonexistent@example.com',
      password: 'invalidpassword',
    };

    await expect(client.user.login.mutate(loginDto)).rejects.toThrow();
  });

  it('journey.createJourney - Successful journey creation', async () => {
    const journeyDto = generateRandomJourneyDto();
    const response = await client.journey.createJourney.mutate(journeyDto);

    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.title).toBe(journeyDto.title);
    expect(response.description).toBe(journeyDto.description);
    expect(response.milestones).toHaveLength(journeyDto.milestones.length);
    expect(response.category).toBeDefined();
  });

  // todo
  // - 1 create a journey without being authenticated
  // - 2 create a journey with invalid data
  // - confirm email (might mock email service)
});
