import { z } from "zod";
import { passwordZodSchema } from "./passwordZodSchema";

export const passwordConfirmeZodSchema = z
  .object({
    password: passwordZodSchema,
    passwordConfirm: z.string().min(5, {
      message: "Password confirm must be at least 5 characters.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Password do not match.",
      });
    }
  });
