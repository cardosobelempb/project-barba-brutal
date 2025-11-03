import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '@repo/types';

/**
 * 🔑 Chave usada pelo NestJS Reflector para associar metadados de roles.
 *
 * É utilizada pelo RolesGuard para recuperar os papéis permitidos
 * de um controlador ou rota específica.
 */
export const ROLES_KEY = 'roles';

/**
 * 🛡️ Decorator @Roles
 *
 * Define quais papéis (roles) têm permissão para acessar o recurso.
 *
 * @example
 * ```ts
 * @Roles(Role.Admin, Role.Manager)
 * @Get('/users')
 * findAllUsers() { ... }
 * ```
 *
 * @param roles Lista de papéis permitidos para o recurso.
 * @returns Decorator que armazena os papéis como metadados.
 */
export const Roles = (...roles: Role[]): CustomDecorator<string> => {
  // SetMetadata associa a lista de roles ao identificador ROLES_KEY.
  return SetMetadata(ROLES_KEY, roles);
};
