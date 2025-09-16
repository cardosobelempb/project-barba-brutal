import { z } from "zod";
import { passwordZodSchema } from "./passwordZodSchema";

export const passwordConfirmeZodSchema = z
  .object({
    password: passwordZodSchema,
    passwordConfirm: z.string().min(5, {
      message: "A confirmação da senha deve ter pelo menos 5 caracteres.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "As senhas não correspondem.",
      });
    }
  });
