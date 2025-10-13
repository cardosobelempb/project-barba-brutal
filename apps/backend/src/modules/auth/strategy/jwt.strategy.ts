import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenDTO } from '@repo/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvZod } from 'src/shared/schemas/envZod.schema';

/**
 * Estratégia JWT customizada para autenticação usando Passport no NestJS.
 * Utiliza o algoritmo RS256 com validação de chave pública.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrai o token JWT do cabeçalho Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Exige que o token esteja dentro da validade
      ignoreExpiration: false,

      // Algoritmo de assinatura esperado (RSA com SHA256)
      algorithms: ['RS256'],

      // Chave pública usada para validar o token JWT (vinda do .env, codificada em base64)
      secretOrKey: JwtStrategy.getPublicKeyFromEnv(),
    });
  }

  /**
   * Função de validação do JWT decodificado.
   * O retorno desse método será injetado no `@Request()` como `request.user`.
   */
  async validate(payload: TokenDTO): Promise<TokenDTO> {
    return {
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
  }

  /**
   * Recupera e decodifica a chave pública do arquivo `.env`, que deve estar em base64.
   * Se a variável de ambiente não estiver definida, lança um erro descritivo.
   */
  private static getPublicKeyFromEnv(): string {
    const configService = new  ConfigService<EnvZod, true>()
    const base64Key = configService.get<string>('JWT_PUBLIC_KEY');

    if (!base64Key) {
      throw new Error(
        '[JwtStrategy] Variável de ambiente JWT_PUBLIC_KEY não definida. ' +
        'Certifique-se de que a chave pública do JWT foi configurada corretamente.'
      );
    }

    return Buffer.from(base64Key, 'base64').toString('utf-8');
  }
}

/**
 * Interface opcional para tipar o payload do JWT decodificado.
 * Ajuda no autocomplete e entendimento do payload esperado.
 */
interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  roles: string[];
}

/**
 * Interface para tipar o usuário validado que será inserido no contexto da requisição.
 */
interface ValidatedUser {
  userId: string;
  username: string;
  email: string;
  roles: string[];
}

