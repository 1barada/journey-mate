import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { config } from '../../config';
import { prisma } from '../../database';
import { publicProcedure, router } from '../../trpc/trpc';

const secret = config.get('secret');

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return [{ id: 1, name: 'user1' }];
  }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { email: input.email } });

      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '20h' });
      return { user, token };
    }),
});
