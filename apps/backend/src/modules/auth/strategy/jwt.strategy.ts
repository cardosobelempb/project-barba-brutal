import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenDTO } from '@repo/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENVIRONMENT_ZOD_SCHEMA } from 'src/modules/settings/env/env.zod';

// const tokenSchema = z.object({
//   sub: z.uuid(),
// })

// type TokenPayload = z.infer<typeof tokenSchema>;
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
      secretOrKey: JwtStrategy.getPublicKey(),
    });
  }

  /**
   * Função de validação do JWT decodificado.
   * O retorno desse método será injetado no `@Request()` como `request.user`.
   */
  async validate(payload: TokenDTO): Promise<TokenDTO> {
    console.log('Payload JWT validado:', payload);
    return payload;
  }

  /**
   * Recupera e decodifica a chave pública do arquivo `.env`, que deve estar em base64.
   * Se a variável de ambiente não estiver definida, lança um erro descritivo.
   */
  private static getPublicKey(): string {
    const configService = new  ConfigService<ENVIRONMENT_ZOD_SCHEMA, true>()
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


