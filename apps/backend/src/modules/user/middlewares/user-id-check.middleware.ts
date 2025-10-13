import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    const isInvalid = isNaN(id) || id <= 0;
    if (isInvalid) {
      throw new BadRequestException(
        `ID '${req.params.id}' é inválido. Deve ser um número maior que zero.`,
      );
    }

    next();
  }
}
