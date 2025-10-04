import { z } from 'zod';

import { emailZodSchema } from './emailZodSchema';
import { nameZodSchema } from './nameZodSchema.shema';
import { passwordZodSchema } from './passwordZodSchema';
import { phoneZodSchema } from './phoneZodSchema.shema';

export const registerAccountSchema = z.object({
    name: nameZodSchema,
    email: emailZodSchema,
    password: passwordZodSchema,
    phone: phoneZodSchema
  })

export type RegisterAccountZodSchema = z.infer<typeof registerAccountSchema>;
