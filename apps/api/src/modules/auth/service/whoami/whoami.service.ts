import { UserRepositoryPort } from '@project/api/modules/user/domain/repository/user.repository';

import { PermissionRepository } from '../../domain/repository/permissions.repository';
import type {
  UserPermission,
  WhoAmIRequest,
  WhoAmIResponse,
  WhoAmIUsecase,
} from '../../domain/usecases/whoami.usecase';

export class WhoamiService implements WhoAmIUsecase {
  constructor(private db: UserRepositoryPort, private permissionsDb: PermissionRepository) {}

  async whoami(request: WhoAmIRequest): Promise<WhoAmIResponse> {
    const { role, email } = request;

    let user = null;

    if (email) {
      user = await this.db.findUserByEmail({ email });
    }

    const result = this.permissionsDb.getPermissionsByRole(role);
    const permissions = Object.entries(result).map(([permissionAbility, permissionEntity]) => [
      permissionAbility,
      permissionEntity,
    ]) as UserPermission[];

    return { permissions, user };
  }
}
