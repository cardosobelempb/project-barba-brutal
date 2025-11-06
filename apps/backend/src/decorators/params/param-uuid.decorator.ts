// param-uuid.decorator.ts

import { uuidZodSchema } from 'src/shared/schemas';
import { ParamValidated } from './param-validated.decorator';

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
  ParamValidated({ paramName, schema: uuidZodSchema });

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
