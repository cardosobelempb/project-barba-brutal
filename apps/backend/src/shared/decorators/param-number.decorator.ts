import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const ParamNumber = createParamDecorator(
  (paramName: string, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest<Request>();

    const rawValue = request.params[paramName];

    if (rawValue === undefined) {
      throw new BadRequestException(
        `Parâmetro '${paramName}' não encontrado na rota.`,
      );
    }

    const value = Number(rawValue);

    if (isNaN(value) || value <= 0) {
      throw new BadRequestException(
        `Parâmetro '${paramName}' com valor '${rawValue}' é inválido. Deve ser um número positivo.`,
      );
    }

    return value;
  },
);

/*
🧪 Exemplo de uso no controller:

Rota com userId:
@Get(':userId')
getUser(@ParamNumber('userId') userId: number) {
  return this.userService.findById(userId);
}

Rota com postId:
@Get(':postId/comments')
getPostComments(@ParamNumber('postId') postId: number) {
  return this.commentService.getByPost(postId);
}

Vantagem                         | Detalhe                                                          |
-------------------------------- | ---------------------------------------------------------------- |
✔️ Reutilizável                  | Funciona para qualquer parâmetro da URL (`:id`, `:postId`, etc.) |
✔️ Validação embutida            | Garante que o valor seja um número positivo                      |
✔️ Tipagem segura (`number`)     | Evita conversões manuais no controller                           |
✔️ Compatível com Express/NestJS | Usa `Request` de forma tipada                                    |

🧱 Extensões futuras
Se quiser, podemos evoluir isso para aceitar:
números negativos (opcional),
zero como válido,
números de ponto flutuante (float),
validações com min e max,
suporte a outros tipos (string, boolean, etc.).

*/
