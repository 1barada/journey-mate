import { Role } from '../modules/auth/domain/enums/permissions.enums';

export interface UserTokenDataTypes {
  userId: string | null;
  userRole: Role;
  userEmail: string | null;
}
