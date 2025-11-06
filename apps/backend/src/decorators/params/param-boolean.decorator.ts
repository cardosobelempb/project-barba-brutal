// param-boolean.decorator.ts

import { booleanZodSchema } from 'src/shared/schemas';
import { ParamValidated } from './param-validated.decorator';

/**
 * Decorator para parâmetros booleanos.
 *
 * @example
 * @Get(':isActive')
 * getUsers(@ParamBoolean('isActive') isActive: boolean) {
 *   return this.userService.list({ active: isActive });
 * }
 */
export const ParamBoolean = (paramName: string) =>
  ParamValidated({ paramName, schema: booleanZodSchema });

// 🧪 Exemplos de Uso
// user.controller.ts
// import { Controller, Get } from '@nestjs/common';
// import { ParamBoolean } from '@/common/decorators/params/param-boolean.decorator';

// @Controller('users')
// export class UserController {
//   @Get(':isActive')
//   getUsers(@ParamBoolean('isActive') isActive: boolean) {
//     return { message: `Listando usuários ${isActive ? 'ativos' : 'inativos'}` };
//   }
// }
