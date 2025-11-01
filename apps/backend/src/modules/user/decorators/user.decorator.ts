import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ErrorConstants, NotFoundError } from '@repo/core';
import { UserEntity } from '@repo/types';
import { Request } from 'express';

/**
 * Interface estendida para incluir o usuário autenticado e tokens JWT.
 * Essa estrutura é preenchida pelo JwtAuthGuard após a autenticação.
 */
interface AuthenticatedRequest extends Request {
  // user?: UserEntity;
  // accessToken?: string;
  refreshToken?: string;
}

/**
 * Decorator @User()
 *
 * Permite acessar o usuário autenticado e/ou propriedades específicas dele.
 *
 * - `@User()` → retorna `{ user, accessToken, refreshToken }`
 * - `@User('email')` → retorna o email do usuário autenticado
 */
export const User = createParamDecorator(
  (data: keyof UserEntity | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const  user  = request;
    console.log("User =>",  user)

    // ✅ Recupera tokens do local correto
    const authHeader = request.headers.authorization;

    const accessToken = authHeader?.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : undefined;

    const refreshToken =
      (request.headers['x-refresh-token'] as string) ||
      request.cookies?.['refresh_token'] ||
      request.refreshToken ||
      undefined;

    // ✅ Validação: usuário obrigatório
    if (!user) {
      throw new NotFoundError(
        `${ErrorConstants.ENTITY_NOT_FOUND}: usuário não encontrado no request.
         Use um AuthGuard (ex: JwtAuthGuard) antes do decorator @User().`,
      );
    }

    // ✅ Retorna apenas a propriedade solicitada (ex: @User('email'))
    if (data) {
      const value = user[data] as UserEntity;
      console.log(value)
      if (value === undefined) {
        throw new NotFoundError(
          `A propriedade '${String(data)}' não existe no objeto do usuário autenticado.`,
        );
      }
      return value;
    }

    // ✅ Retorna o objeto completo
    return { user, accessToken, refreshToken };
  },
);
