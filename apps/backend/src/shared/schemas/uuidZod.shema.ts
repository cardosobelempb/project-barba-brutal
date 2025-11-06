import z from "zod";

/**
 * Schema Zod para validação de UUID.
 * - Garante que o valor seja uma string com formato UUID válido.
 */

export const uuidZodSchema = z
  .uuid('Parâmetro deve ser um UUID válido.')

  export type UuidZodSchema = z.infer<typeof uuidZodSchema>;
