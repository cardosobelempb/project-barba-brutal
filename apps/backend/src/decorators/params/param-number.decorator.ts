// param-number.decorator.ts

import { numberZodSchema } from 'src/shared/schemas';
import { ParamValidated } from './param-validated.decorator';

/**
 * Decorator para parâmetros numéricos validados com Zod.
 *
 * @example
 * // Número positivo padrão
 * @Get(':userId')
 * getUser(@ParamNumber('userId') userId: number) { ... }
 *
 * @example
 * // Permite zero e limita valores
 * @Get(':page')
 * getPage(@ParamNumber('page', { allowZero: true, min: 0, max: 100 }) page: number) { ... }
 */
export const ParamNumber = (
  paramName: string,
  options?: Parameters<typeof numberZodSchema>[0],
) =>
  ParamValidated({
    paramName,
    schema: numberZodSchema({
      ...options,
      messagePrefix: `Parâmetro '${paramName}'`,
    }),
  });

// 🧩 Exemplos de Uso:
// 1️⃣ Uso simples (padrão)
// @Get(':id')
// getById(@ParamNumber('id') id: number) {
//   return this.userService.findById(id);
// }
// // 🔹 Exige número inteiro > 0

// 2️⃣ Permite zero(paginação)
// @Get(':page')
// getPage(@ParamNumber('page', { allowZero: true, min: 0, max: 50 }) page: number) {
//   return this.userService.list(page);
// }
// 🔹 Aceita 0 ≤ page ≤ 50

// 3️⃣ Limites personalizados
// @Get(':level')
// getLevel(@ParamNumber('level', { min: 1, max: 10 }) level: number) {
//   return this.levelService.get(level);
// }
// 🔹 Aceita 1 ≤ level ≤ 10
