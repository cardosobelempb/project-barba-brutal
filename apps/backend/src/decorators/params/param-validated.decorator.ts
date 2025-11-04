import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BadRequestError } from '@repo/core';
import { Request } from 'express';
import { ZodType } from 'zod';

/**
 * Estrutura de dados esperada pelo decorator.
 * Empacota o nome do parâmetro e o schema de validação.
 */
interface ParamValidatedData<T> {
  paramName: string;
  schema: ZodType<T>;
}

/**
 * Decorator genérico para validar parâmetros de rota usando Zod.
 *
 * @example
 * const numberSchema = z.string().transform(Number).pipe(z.number().positive());
 * @Get(':id')
 * getById(@ParamValidated({ paramName: 'id', schema: numberSchema }) id: number) { ... }
 */
export const ParamValidated = createParamDecorator(
  <T>({ paramName, schema }: ParamValidatedData<T>, ctx: ExecutionContext): T => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const rawValue = request.params[paramName];

    if (rawValue === undefined) {
      throw new BadRequestError(`Parâmetro '${paramName}' não encontrado na rota.`);
    }

    const result = schema.safeParse(rawValue);

    if (!result.success) {
      throw new BadRequestError(result.error.issues[0].message);
    }

    return result.data;
  },
);

// export const ParamValidated = createParamDecorator(
//   <T extends ZodType<any>>(
//     data: { paramName: string; schema: T },
//     ctx: ExecutionContext,
//   ): z.infer<T> => {
//     const request = ctx.switchToHttp().getRequest<Request>();
//     const rawValue = request.params[data.paramName];
//     const result = data.schema.safeParse(rawValue);
//     if (!result.success) throw new BadRequestError(result.error.issues[0].message);
//     return result.data;
//   },
// );

// Exemplo de uso:
// import { z } from 'zod';
// import { ParamValidated } from '@/common/decorators/param-validated.decorator';

// const numberSchema = z
//   .string()
//   .regex(/^\d+$/, 'Deve ser um número inteiro.')
//   .transform(Number)
//   .refine((n) => n > 0, 'Deve ser maior que zero.');

// @Get(':userId')
// getUser(
//   @ParamValidated({ paramName: 'userId', schema: numberSchema }) userId: number,
// ) {
//   return this.userService.findById(userId);
// }
