import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, UserEntity } from '@repo/types';
import { Request } from 'express';

import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Interface que estende o Request do Express,
 * adicionando o usuário autenticado.
 */
interface RequestWithUser extends Request {
  user?: UserEntity & { roles?: Role[] };
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  /**
   * Método principal que determina se a requisição
   * pode ser processada ou deve ser bloqueada.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.getRequiredRoles(context);

    // Se a rota não exigir roles, o acesso é permitido
    if (!requiredRoles?.length) return true;

    const { user } = this.getRequest(context);
    // Dentro do RolesGuard
    this.logger.debug('RolesGuard executado — user encontrado?', user?.role);

    if (!this.isUserValid(user)) {
      this.logger.warn('Tentativa de acesso sem usuário válido.');
      throw new ForbiddenException('Acesso negado: usuário inválido.');
    }

    const hasPermission = this.userHasRequiredRole(user!, requiredRoles);

    if (!hasPermission) {
      this.logger.warn(
        `Usuário "${user?.email ?? 'desconhecido'}" sem permissão. Necessário: ${requiredRoles.join(', ')}`,
      );
      throw new ForbiddenException('Acesso negado: permissão insuficiente.');
    }

    return true;
  }

  /**
   * Obtém as roles exigidas para o endpoint atual
   * a partir dos metadados definidos pelo decorator @Roles().
   */
  private getRequiredRoles(context: ExecutionContext): Role[] | undefined {
    return this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  /**
   * Extrai o objeto Request e o usuário autenticado.
   */
  private getRequest(context: ExecutionContext): RequestWithUser {
    return context.switchToHttp().getRequest<RequestWithUser>();
  }

  /**
   * Verifica se o usuário está presente e possui roles válidas.
   */
  private isUserValid(user?: RequestWithUser['user']): boolean {
    return !!user && Array.isArray(user.roles) && user.roles.length > 0;
  }

  /**
   * Valida se o usuário possui ao menos uma das roles exigidas.
   */
  private userHasRequiredRole(user: UserEntity & { roles?: Role[] }, required: Role[]): boolean {
    return user.roles?.some((role) => required.includes(role)) ?? false;
  }
}
