import { PrismaClient } from '@prisma/client';

import { UserPostgresRepository } from '../../user/adapters/user-postgres.repository';
import { ChatPostgresRepository } from '../adapters/chat-postgres.repository';
import { ChatService } from './chat.service';

export function createChatService(prisma: PrismaClient) {
  const chatRepository = new ChatPostgresRepository(prisma);
  const userRepository = new UserPostgresRepository(prisma);

  return new ChatService(chatRepository, userRepository);
}
