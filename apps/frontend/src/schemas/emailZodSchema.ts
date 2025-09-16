import { z } from "zod";

export const emailZodSchema = z.string().email({
  message: "E-mail inválido.",
});
