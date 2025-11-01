import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ENVIRONMENT_ZOD_SCHEMA } from './env.zod';

/**
 * 🔧 Serviço responsável por expor variáveis de ambiente validadas e tipadas.
 *
 * Benefícios:
 * - Tipagem forte baseada no schema Zod (`EnvZod`)
 * - Validação no startup (via ConfigModule)
 * - Centralização e organização por domínio (App, Auth, Mail, DB, etc.)
 */
@Injectable()
export class EnvironmentConfigService {
  constructor(private readonly config: ConfigService<ENVIRONMENT_ZOD_SCHEMA, true>) {}

  /**
   * Método genérico para buscar uma variável de ambiente tipada.
   *
   * - Lança erro se o valor for `undefined` e não houver fallback.
   * - Garante consistência e centraliza a validação.
   */
  private getEnvValue<T extends keyof ENVIRONMENT_ZOD_SCHEMA>(
    key: T,
    options?: { fallback?: ENVIRONMENT_ZOD_SCHEMA[T] }
  ): ENVIRONMENT_ZOD_SCHEMA[T] {
    const value = this.config.get<ENVIRONMENT_ZOD_SCHEMA[T]>(key, { infer: true });
    if (value === undefined || value === null) {
      if (options?.fallback !== undefined) {
        return options.fallback;
      }
      throw new Error(`Variável de ambiente '${key}' não definida.`);
    }
    return value as ENVIRONMENT_ZOD_SCHEMA[T];
  }

  // --------------------------------------------------------------------------
  // 🌍 APP CONFIG
  // --------------------------------------------------------------------------

  /** Ambiente da aplicação: development | test | production */
  get nodeEnv(): string {
    return this.getEnvValue('NODE_ENV');
  }

  /** Porta em que a aplicação será executada */
  get port(): number {
    return this.getEnvValue('PORT');
  }

  /** URL base do frontend */
  get frontendUrl(): string {
    return this.getEnvValue('FRONTEND_URL');
  }

  /** Prefixo ou URL base da API (opcional) */
  get prefixUrl(): string {
    return this.getEnvValue('PREFIX_URL');
  }

  // --------------------------------------------------------------------------
  // 🔒 AUTH / JWT CONFIG
  // --------------------------------------------------------------------------

  /** Chave privada JWT usada para assinar tokens */
  get jwtPrivateKey(): string {
    return this.getEnvValue('JWT_PRIVATE_KEY');
  }

  /** Chave pública JWT usada para verificar tokens */
  get jwtPublicKey(): string {
    return this.getEnvValue('JWT_PUBLIC_KEY');
  }

  /** Segredo base JWT */
  get jwtSecret(): string {
    return this.getEnvValue('JWT_SECRET');
  }

  /** Tempo de expiração padrão do JWT */
  get jwtExpiresIn(): string {
    return this.getEnvValue('JWT_EXPIRES_IN');
  }

  /** Segredo do access token */
  get jwtAccessTokenSecret(): string {
    return this.getEnvValue('JWT_ACCESS_TOKEN_SECRET');
  }

  /** Tempo de expiração do access token */
  get jwtAccessTokenExpiration(): string {
    return this.getEnvValue('JWT_ACCESS_TOKEN_EXPIRATION');
  }

  /** Segredo do refresh token */
  get jwtRefreshTokenSecret(): string {
    return this.getEnvValue('JWT_REFRESH_TOKEN_SECRET');
  }

  /** Tempo de expiração do refresh token */
  get jwtRefreshTokenExpiration(): string {
    return this.getEnvValue('JWT_REFRESH_TOKEN_EXPIRATION');
  }

  // --------------------------------------------------------------------------
  // 💾 DATABASE CONFIG
  // --------------------------------------------------------------------------

  /** URL de conexão com o banco de dados */
  get databaseUrl(): string {
    return this.getEnvValue('DATABASE_URL');
  }

  // --------------------------------------------------------------------------
  // 📧 MAIL CONFIG
  // --------------------------------------------------------------------------

  /** Host do servidor SMTP */
  get mailHost(): string {
    return this.getEnvValue('MAIL_HOST');
  }

  /** Porta do servidor SMTP */
  get mailPort(): number {
    return this.getEnvValue('MAIL_PORT');
  }

  /** Usuário de autenticação do servidor SMTP */
  get mailUser(): string {
    return this.getEnvValue('MAIL_USER');
  }

  /** Senha de autenticação do servidor SMTP */
  get mailPassword(): string {
    return this.getEnvValue('MAIL_PASSWORD');
  }

  // --------------------------------------------------------------------------
  // 🔗 FUTURE INTEGRATIONS (AWS, REDIS, ETC.)
  // --------------------------------------------------------------------------
  // Exemplos futuros:
  //
  // get awsBucketName(): string {
  //   return this.getEnvValue('AWS_BUCKET_NAME');
  // }
  //
  // get redisHost(): string {
  //   return this.getEnvValue('REDIS_HOST', { fallback: '127.0.0.1' });
  // }
  //
  // get redisPort(): number {
  //   return this.getEnvValue('REDIS_PORT', { fallback: 6379 });
  // }
}


export const ENVIRONMENT_CONFIG_SERVICE = EnvironmentConfigService;
