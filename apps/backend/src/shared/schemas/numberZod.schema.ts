import z from "zod";

/**
 * Cria dinamicamente um schema numérico com base nas opções.
 */

export const numberZodSchema = ({
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

export type NumberZodSchema = z.infer<typeof numberZodSchema>
