import { PrismaClient } from '@prisma/client';

import {
  AddMessageParams,
  AddMessageResult,
  ChatRepositoryPort,
  FindMessageResult,
  FindMessagesParams,
  IsChatExistsParams,
  IsChatExistsResult,
} from '../domain/repository/chat.repository';

export class ChatPostgresRepository implements ChatRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async isChatExists(params: IsChatExistsParams): Promise<IsChatExistsResult> {
    const chat = await this.prisma.chat.findFirst({
      where: {
        id: params.chatId,
      },
    });

    return chat !== null;
  }

  async findMessages(params: FindMessagesParams): Promise<FindMessageResult> {
    const messages = await this.prisma.message.findMany({
      skip: params.skip,
      take: params.take,
      where: {
        chatId: params.chatId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return messages.map((message) => ({
      id: message.id,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
        avatarUrl: message.sender.avatarUrl,
      },
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }));
  }

  async addMessage(params: AddMessageParams): Promise<AddMessageResult> {
    const message = await this.prisma.message.create({
      data: {
        content: params.content,
        chat: {
          connect: { id: params.chatId },
        },
        sender: {
          connect: { id: params.senderId },
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return {
      id: message.id,
      content: message.content,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
        avatarUrl: message.sender.avatarUrl,
      },
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  }
}
