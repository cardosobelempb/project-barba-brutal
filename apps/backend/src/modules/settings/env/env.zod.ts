import { z } from 'zod';

/**
 * 🔧 Schema Zod para validação das variáveis de ambiente.
 *
 * Estrutura organizada por domínios:
 * - App: Configurações gerais
 * - Auth: JWT, tokens e chaves
 * - Mail: SMTP e credenciais
 * - Database: conexão principal
 *
 * Usa coerção (`z.coerce`) para permitir valores string vindos do `.env`.
 */
export const envZodSchema = z.object({
  /** 🌍 Configuração geral da aplicação */
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.url(),
  PREFIX_URL: z.string().default('api/v1'),

  /** 🔒 Configurações JWT e autenticação */
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1h'),

  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRATION: z.string().default('15m'),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRATION: z.string().default('7d'),

  /** 💾 Banco de dados */
  DATABASE_URL: z.string().url(),

  /** 📧 Configuração de e-mail */
  MAIL_HOST: z.string().default('smtp.mailtrap.io'),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USER: z.string().default('myemailuser'),
  MAIL_PASSWORD: z.string().default('myemailpassword'),

  /** 🔗 Integrações futuras (S3, Redis, etc.) */
  // AWS_BUCKET_NAME: z.string().optional(),
  // REDIS_HOST: z.string().default('127.0.0.1'),
});

export type ENVIRONMENT_ZOD_SCHEMA = z.infer<typeof envZodSchema>;
