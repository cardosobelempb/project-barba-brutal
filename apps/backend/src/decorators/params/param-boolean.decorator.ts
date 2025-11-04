// param-boolean.decorator.ts
import { z } from 'zod';

import { ParamValidated } from './param-validated.decorator';

/**
 * Schema Zod para validação booleana em parâmetros de rota.
 * Aceita "true"/"false", "1"/"0" e valores booleanos equivalentes.
 */
export const booleanSchema = z
  .string()
  .transform((value) => {
    const normalized = value.trim().toLowerCase();
    if (['true', '1'].includes(normalized)) return true;
    if (['false', '0'].includes(normalized)) return false;
    throw new Error(
      `Valor inválido '${value}'. Esperado 'true', 'false', '1' ou '0'.`,
    );
  });

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
  ParamValidated({ paramName, schema: booleanSchema });

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
