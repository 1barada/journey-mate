import { Role } from '@project/permissions';

export interface UserTokenDataTypes {
  userId: string | null;
  userRole: Role;
  userEmail: string | null;
}
