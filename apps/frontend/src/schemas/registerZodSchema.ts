import { z } from "zod";
import { emailZodSchema } from "./emailZodSchema";
import { nameZodSchema } from "./nameZodSchema.shema";
import { passwordConfirmeZodSchema } from "./passwordConfirmeZodSchema";
import { phoneZodSchema } from "./phoneZodSchema.shema";

export const registerZodSchema = z
  .object({
    name: nameZodSchema,
    email: emailZodSchema,
    phone: phoneZodSchema
  })
  .and(passwordConfirmeZodSchema);

export type RegisterZodSchema = z.infer<typeof registerZodSchema>;
