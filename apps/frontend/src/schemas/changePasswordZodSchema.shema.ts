import { z } from "zod";

import { passwordConfirmeZodSchema } from "./passwordConfirmeZodSchema";
import { passwordZodSchema } from "./passwordZodSchema";

export const changePasswordZodSchema = z
  .object({
    currentPassword: passwordZodSchema,
  })
  .and(passwordConfirmeZodSchema);

export type FormChangePasswordShema = z.infer<typeof changePasswordZodSchema>;
