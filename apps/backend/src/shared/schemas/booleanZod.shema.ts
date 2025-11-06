import { BadRequestError } from "@repo/core";
import z from "zod";

/**
 * Schema Zod para validação booleana em parâmetros de rota.
 * Aceita "true"/"false", "1"/"0" e valores booleanos equivalentes.
 */

export const booleanZodSchema = z
  .string()
  .transform((value) => {
    const normalized = value.trim().toLowerCase();
    if (['true', '1'].includes(normalized)) return true;
    if (['false', '0'].includes(normalized)) return false;
    throw new BadRequestError(
      `Valor inválido '${value}'. Esperado 'true', 'false', '1' ou '0'.`,
    );
  });

  export type BooleanZodSchema = z.infer<typeof booleanZodSchema>;
