import { z } from "zod";

export const passwordZodSchema = z.string().min(5, {
  message: "A senha deve ter pelo menos 5 caracteres.",
});
