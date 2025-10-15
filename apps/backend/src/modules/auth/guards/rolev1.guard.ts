import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, UserEntity } from '@repo/types';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Interface que estende o objeto Request para incluir o usuário autenticado
 */
interface RequestWithUser extends Request {
  user?: UserEntity;
}

@Injectable()
export class RoleGuardV1 implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Recupera as roles exigidas da rota ou do controller usando metadados do decorator @Roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se nenhuma role for exigida, o acesso é liberado
    if (!requiredRoles) return true;

    // Extrai o usuário do request
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Bloqueia o acesso se não houver usuário no request
    if (!user?.role) return false;

    // Verifica se a role do usuário está entre as roles exigidas
    const hasRequiredRole = requiredRoles.includes(user.role);

    return hasRequiredRole;
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
