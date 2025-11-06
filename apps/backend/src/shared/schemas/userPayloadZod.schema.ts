import { z } from "zod";

import { emailZodSchema } from "./emailZod.schema";
import { nameZodSchema } from "./nameZod.shema";
import { uuidZodSchema } from "./uuidZod.shema";

/**
 * Schema de validação para o payload de usuário.
 *
 * - Valida tipos em tempo de execução (runtime).
 * - Garante segurança de tipo mesmo com dados externos (ex: requisições HTTP, tokens JWT, etc.).
 * - Pode ser reutilizado tanto para validação quanto para inferência de tipo.
 */
export const userPayloadZodSchema = z.object({
  userId: uuidZodSchema,
  name: nameZodSchema,
  email: emailZodSchema,
  // Campo opcional, pode ser booleano, null ou omitido
  barber: z.boolean().nullable().optional(),

  // Campo opcional, pode ser numérico, null ou omitido
  role: z.number().nullable().optional(),
});

/**
 * Tipo TypeScript inferido automaticamente a partir do schema Zod.
 *
 * Isso evita duplicação entre o tipo e o schema (DRY).
 */
export type UserPayloadZodSchema = z.infer<typeof userPayloadZodSchema>;
