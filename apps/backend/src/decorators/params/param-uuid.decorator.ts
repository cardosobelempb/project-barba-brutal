// param-uuid.decorator.ts
import { z } from 'zod';

import { ParamValidated } from './param-validated.decorator';

/**
 * Schema Zod para validação de UUID.
 * - Garante que o valor seja uma string com formato UUID válido.
 */
export const uuidSchema = z
  .string()
  .uuid('Parâmetro deve ser um UUID válido.');

/**
 * Decorator para validar parâmetros UUID.
 *
 * @example
 * @Get(':id')
 * getById(@ParamUUID('id') id: string) {
 *   return this.service.findById(id);
 * }
 */
export const ParamUUID = (paramName: string) =>
  ParamValidated({ paramName, schema: uuidSchema });

// Example usage:
// user.controller.ts
// import { Controller, Get } from '@nestjs/common';
// import { ParamUUID } from '@/common/decorators/params/param-uuid.decorator';

// @Controller('users')
// export class UserController {
//   @Get(':id')
//   getUser(@ParamUUID('id') id: string) {
//     return { message: `Buscando usuário com UUID: ${id}` };
//   }
// }
