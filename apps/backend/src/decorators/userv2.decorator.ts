import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '@repo/types';
import { Request } from 'express';

/**
 * 🎯 Decorator personalizado para obter o usuário autenticado.
 * - @UserV1() retorna o usuário completo.
 * - @UserV1('email') retorna apenas o campo "email".
 */
export const UserV1 = createParamDecorator(
  (data: keyof UserEntity | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserEntity | undefined;
    console.log('USER DECORATOR PAYLOAD =>', request.user);


    const logger = new Logger('UserV1');

    // 🚨 1. Proteção: usuário não autenticado
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    // 🧱 2. Se o dev pediu uma propriedade específica
    if (data) {
      // 🔍 Verifica se o campo realmente existe
      if (Object.prototype.hasOwnProperty.call(user, data)) {
        return user[data];
      }

      // ⚠️ Loga o problema e lança exceção amigável
      logger.warn(`Tentativa de acesso a campo inexistente: "${data}"`);
      throw new NotFoundException(
        `A propriedade '${String(
          data,
        )}' não existe no objeto do usuário autenticado.`,
      );
    }

    // 🧩 3. Caso contrário, retorna o objeto completo
    return user;
  },
);
