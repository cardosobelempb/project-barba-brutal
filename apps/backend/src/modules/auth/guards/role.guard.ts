import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '@repo/types';
import { Role } from 'src/modules/auth/enums/role.enum';

import { ROLES_KEY } from '../decorators/roles.decorator';

interface RequestWithUser extends Request {
  user?: UserEntity;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    console.log('RoleGuard');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    const rolesFilted = requiredRoles.filter((role) => role === user?.role);
    console.log(
      rolesFilted.map((r) => r),
      user?.role,
    );

    return rolesFilted.length > 0;
  }
}
