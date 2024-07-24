import { UserNameNotCreatedError } from '../../user/domain/errors/user-name-not-created.error';
import { UserNotFoundError } from '../../user/domain/errors/user-not-found.error';
import { UserRepositoryPort } from '../../user/domain/repository/user.repository';
import { ChatNotExistsError } from '../domain/errors/chat-not-exitsts.error';
import { ChatRepositoryPort } from '../domain/repository/chat.repository';
import {
  ChatUsecase,
  GetMessagesRequest,
  GetMessagesResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '../domain/usecases/chat.usecase';

export class ChatService implements ChatUsecase {
  constructor(private chatRepository: ChatRepositoryPort, private userRepository: UserRepositoryPort) {}

  async getMessages(request: GetMessagesRequest): Promise<GetMessagesResponse> {
    const isChatExists = await this.chatRepository.isChatExists({ chatId: request.chatId });
    if (!isChatExists) {
      throw new ChatNotExistsError(`Chat does not exists. Chat id: ${request.chatId}`);
    }

    const messages = await this.chatRepository.findMessages({
      chatId: request.chatId,
      skip: request.skip,
      take: request.take,
    });

    return messages;
  }

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    const user = await this.userRepository.findUserById({ id: request.senderId });
    if (!user) {
      throw new UserNotFoundError(`User with id ${request.senderId} not found`);
    }
    if (!user.name) {
      throw new UserNameNotCreatedError(`To get access to this action you need to create name for user`);
    }

    const isChatExists = await this.chatRepository.isChatExists({ chatId: request.chatId });
    if (!isChatExists) {
      throw new ChatNotExistsError(`Chat does not exists. Chat id: ${request.chatId}`);
    }

    const message = await this.chatRepository.addMessage({
      chatId: request.chatId,
      content: request.content,
      senderId: request.senderId,
    });

    return message;
  }
}
