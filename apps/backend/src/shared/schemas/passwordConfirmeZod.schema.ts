import { z } from 'zod';

import { passwordZodSchema } from './passwordZod.schema';

/**
 * Schema para validação de senha com confirmação.
 * - `password`: validação conforme `passwordZodSchema`.
 * - `passwordConfirm`: string com mínimo de 5 caracteres.
 * - Garante que `password` e `passwordConfirm` sejam iguais.
 */
export const passwordConfirmZodSchema = z
  .object({
    password: passwordZodSchema,
    passwordConfirm: z.string().min(5, {
      message: 'A confirmação da senha deve ter pelo menos 5 caracteres.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ['passwordConfirm'], // caminho do erro
        message: 'As senhas não correspondem.',
      })
    }
  })

  export type PasswordConfirmeZodSchema = z.infer<typeof passwordConfirmZodSchema>;
