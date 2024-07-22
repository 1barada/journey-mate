import { User } from '../../store/auth/types';

export type Message = {
  id: number;
  sender: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
