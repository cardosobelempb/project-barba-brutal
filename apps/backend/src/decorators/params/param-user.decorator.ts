import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ErrorConstants, NotFoundError, UnauthorizedError } from '@repo/core';

import { RequestWithUser } from 'src/guards/auth.guard';
import { UserPayloadZodSchema } from 'src/shared/schemas';

/**
 * Interface estendida do Request padrão do Express.
 * Inclui as informações de autenticação adicionadas pelo JwtAuthGuard.
 */


/**
 * Decorator @ParamUser()
 *
 * Permite acessar o usuário autenticado ou uma propriedade específica dele.
 *
 * Exemplos:
 *  - `@ParamUser()` → retorna o usuário completo (UserPayloadDTO)
 *  - `@ParamUser('email')` → retorna o e-mail do usuário autenticado
 */
export const ParamUser = createParamDecorator(
  (property: keyof UserPayloadZodSchema | undefined, ctx: ExecutionContext) => {
    // Obtém o request HTTP a partir do contexto atual
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const { user } = request;

    // 🚫 Caso o usuário não esteja presente, indica falha de autenticação
    if (!user) {
      throw new UnauthorizedError(
        `${ErrorConstants.ENTITY_NOT_FOUND}: Usuário não encontrado na requisição.
         Certifique-se de aplicar um AuthGuard (ex: JwtAuthGuard) antes do @ParamUser().`,
      );
    }

    // ✅ Caso uma propriedade específica tenha sido solicitada (@User('email'))
    if (property) {
      // Validação de tipo e existência da propriedade
      const value = user[property];

      if (value === undefined) {
        throw new NotFoundError(
          `A propriedade '${String(property)}' não existe no objeto do usuário autenticado.`,
        );
      }

      return value;
    }

    // ✅ Caso contrário, retorna o objeto completo
    return user;
  },
);
