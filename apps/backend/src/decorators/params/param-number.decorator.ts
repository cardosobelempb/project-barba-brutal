// param-number.decorator.ts
import { z } from 'zod';

import { ParamValidated } from './param-validated.decorator';

/**
 * Cria dinamicamente um schema numérico com base nas opções.
 */
export const createNumberSchema = ({
  allowZero = false,
  min,
  max,
  messagePrefix = 'Parâmetro',
}: {
  allowZero?: boolean;
  min?: number;
  max?: number;
  messagePrefix?: string;
} = {}) => {
  let schema = z
    .string()
    .regex(/^-?\d+$/, `${messagePrefix} deve ser um número inteiro.`)
    .transform(Number)
    .refine((n) => (allowZero ? n >= 0 : n > 0), {
      message: `${messagePrefix} deve ser ${allowZero ? 'não negativo' : 'maior que zero'}.`,
    });

  if (min !== undefined)
    schema = schema.refine((n) => n >= min, {
      message: `${messagePrefix} deve ser maior ou igual a ${min}.`,
    });

  if (max !== undefined)
    schema = schema.refine((n) => n <= max, {
      message: `${messagePrefix} deve ser menor ou igual a ${max}.`,
    });

  return schema;
};

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
  options?: Parameters<typeof createNumberSchema>[0],
) =>
  ParamValidated({
    paramName,
    schema: createNumberSchema({
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
