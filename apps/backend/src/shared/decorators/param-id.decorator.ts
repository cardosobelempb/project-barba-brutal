import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest<Request>();
    const rawId = request.params.id;

    const id = Number(rawId);

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException(
        `ID '${rawId}' é inválido. Deve ser um número positivo.`,
      );
    }

    return id;
  },
);

/*
🧪 Exemplo de uso no controller:
@Get(':id')
getUserById(@ParamId() id: number) {
  // id já está validado e convertido para número
  return this.userService.findById(id);
}
*/
