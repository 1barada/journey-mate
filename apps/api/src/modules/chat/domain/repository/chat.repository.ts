import { Message } from '../entities/chat.entity';

export interface IsChatExistsParams {
  chatId: number;
}

export type IsChatExistsResult = boolean;

export interface FindMessagesParams {
  chatId: number;
  take: number;
  skip: number;
}

export type FindMessageResult = Message[];

export interface AddMessageParams {
  chatId: number;
  senderId: number;
  content: string;
}

export type AddMessageResult = Message;

export interface ChatRepositoryPort {
  isChatExists(params: IsChatExistsParams): Promise<IsChatExistsResult>;
  findMessages(params: FindMessagesParams): Promise<FindMessageResult>;
  addMessage(params: AddMessageParams): Promise<AddMessageResult>;
}
