import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, UserEntity } from '@repo/types';


import { ROLES_KEY } from '../decorators/roles.decorator';

interface RequestWithUser extends Request {
  user?: UserEntity;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    const rolesFilted = requiredRoles.filter((role) => role === user?.role);

    console.log(
      "FILTERD =>",
      rolesFilted.map((r) => r),
      user?.role,
    );

    // console.log("ROLES =>",requiredRoles, "USER =>", user)
    // return true
    return rolesFilted.length > 0;
  }
}


/**
  📘 Exemplo de estrutura esperada do usuário autenticado
  O AuthService (ou o módulo JWT/Passport) deve popular o usuário com algo como:

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('/admin-area')
  getAdminData() {
    // Requer que o usuário tenha pelo menos uma dessas roles
  }
 */
