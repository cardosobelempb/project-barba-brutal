import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '@repo/types';
import { Role } from 'src/modules/auth/enums/role.enum';

import { ROLES_KEY } from '../decorators/roles.decorator';

interface RequestWithUser extends Request {
  user?: UserEntity & { roles?: Role[] }; // Atualizado para aceitar múltiplas roles
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtém as roles exigidas para acessar a rota
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota não exigir roles específicas, libera o acesso
    if (!requiredRoles) return true;

    // Extrai o usuário do request
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Bloqueia se não houver usuário ou se não houver roles atribuídas
    if (!user || !Array.isArray(user.roles)) return false;

    // Verifica se o usuário possui ao menos uma das roles exigidas
    const hasRole = user.roles.some((role) => requiredRoles.includes(role));

    return hasRole;
  }
}
