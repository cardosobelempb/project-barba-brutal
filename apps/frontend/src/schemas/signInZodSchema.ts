import { z } from "zod";
import { emailZodSchema } from "./emailZodSchema";
import { passwordZodSchema } from "./passwordZodSchema";

export const signInZodSchema = z
  .object({
    email: emailZodSchema,
    password: passwordZodSchema
  })

export type SignInZodSchema = z.infer<typeof signInZodSchema>;
