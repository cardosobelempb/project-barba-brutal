<<<<<<< HEAD
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { BadRequestError, JwtAbstract, Tokens } from '@repo/core';
import { UserPayloadDTO } from '@repo/types';

/**
 * Adaptador JWT compatível com a interface JwtAbstract.
 * Suporta payloads que estendem UserPayloadDTO.
 */
export class JwtAdapter<T extends UserPayloadDTO> implements JwtAbstract<T> {
  constructor(private readonly jwtService: JwtService) {
     console.log('JwtAdapter constructor called');
    console.log('JwtService is', jwtService ? 'defined' : 'undefined');
  }

  // ==============================
  // Constantes e configuração
  // ==============================

  private readonly accessConfig = {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'fallback-access-secret',
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '15m',
  };

  private readonly refreshConfig = {
    secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'fallback-refresh-secret',
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
  };

  private readonly privateKey = process.env.JWT_PRIVATE_KEY;

  // ==============================
  // API pública - Criação de tokens
  // ==============================

  createAccessToken(payload: T): string {
    return this.signToken(payload, this.accessConfig.expiresIn);
  }

  createRefreshToken(payload: T): string {
    return this.signToken(payload, this.refreshConfig.expiresIn);
  }

  async createAsyncAccessToken(payload: T): Promise<string> {
    return this.signAsyncToken(payload, this.accessConfig.expiresIn);
  }

  async createAsyncRefreshToken(payload: T): Promise<string> {
    return this.signAsyncToken(payload, this.refreshConfig.expiresIn);
  }

  /**
   * Gera ambos os tokens (access + refresh) para retorno consolidado.
   */
  createTokens(payload: T): Tokens {
    return {
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createRefreshToken(payload),
    };
  }

  // ==============================
  // API pública - Verificação de tokens
  // ==============================

  verifyAccessToken(token: string): T | null {
    return this.verifyToken(token, this.accessConfig.secret);
  }

  verifyRefreshToken(token: string): T | null {
    return this.verifyToken(token, this.refreshConfig.secret);
  }

  isAccessToken(token: string): boolean {
    return this.verifyAccessToken(token) !== null;
  }

  isRefreshToken(token: string): boolean {
    return this.verifyRefreshToken(token) !== null;
  }

  // ==============================
  // API pública - Decodificação
  // ==============================

  decodeAccessToken(token: string): T | null {
    return this.decodeToken(token, this.accessConfig.secret, 'Invalid access token');
  }

  decodeRefreshToken(token: string): T | null {
    return this.decodeToken(token, this.refreshConfig.secret, 'Invalid refresh token');
  }

  // ==============================
  // Métodos privados reutilizáveis
  // ==============================

  /**
   * Cria e assina o token de forma síncrona.
   */
  private signToken(payload: T, expiresIn: string | number): string {
    const options: JwtSignOptions = {
      secret: this.accessConfig.secret,
      expiresIn,
    };

    return this.jwtService.sign(payload as UserPayloadDTO, options);
  }

  /**
   * Cria e assina o token de forma assíncrona.
   */
  private async signAsyncToken(payload: T, expiresIn: string | number): Promise<string> {
    const options: JwtSignOptions = {
      algorithm: 'RS256',
      privateKey: this.privateKey,
      expiresIn,
    };

    return this.jwtService.signAsync(payload as UserPayloadDTO, options);
  }

  /**
   * Verifica a validade do token e retorna o payload.
   */
  private verifyToken(token: string, secret: string): T | null {
    try {
      const options: JwtVerifyOptions = { secret, algorithms: ['RS256'] };
      const decoded = this.jwtService.verify(token, options);
      return typeof decoded === 'object' ? (decoded as T) : null;
    } catch {
      return null;
    }
  }

  /**
   * Decodifica o token, lançando erro se inválido.
   */
  private decodeToken(token: string, secret: string, errorMsg: string): T | null {
    try {
      const options: JwtVerifyOptions = { secret, algorithms: ['RS256'], ignoreExpiration: true };
      const decoded = this.jwtService.verify(token, options);
      return decoded as T;
    } catch {
      // Aqui sim lançamos o erro, conforme esperado para o fluxo de exceções
      throw new BadRequestError(errorMsg);
    }
  }
}
=======
// import { BadRequestError, JwtAbstract, Tokens } from '@repo/core';
// import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

// /**
//  * Adapter JWT utilizando a biblioteca `jsonwebtoken` (v9+).
//  * Suporta qualquer payload que estenda JwtPayload.
//  */
// export class JwtAdapter<T extends JwtPayload> implements JwtAbstract<T> {
//   // Secrets (chaves de assinatura) - devem vir do .env ou config
//   private readonly accessSecret: Secret =
//     process.env.JWT_ACCESS_TOKEN_SECRET || 'fallback-access-secret';

//   private readonly privateKey: Secret =
//     process.env.JWT_PRIVATE_KEY || 'fallback-access-secret';

//   private readonly refreshSecret: Secret =
//     process.env.JWT_REFRESH_TOKEN_SECRET || 'fallback-refresh-secret';

//   // Tempo de expiração padrão (usando formato string ou número em segundos)
//   private readonly accessExpiresIn: string | number =
//     process.env.JWT_ACCESS_TOKEN_EXPIRATION || '15m';

//   private readonly refreshExpiresIn: string | number =
//     process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d';

//   /**
//    * Gera um accessToken com tempo curto de expiração.
//    */
//   createAccessToken(payload: T): string {
//     return this.signToken(payload, this.accessSecret, this.accessExpiresIn);
//   }

//   /**
//    * Gera um refreshToken com tempo longo de expiração.
//    */
//   createRefreshToken(payload: T): string {
//     return this.signToken(payload, this.refreshSecret, this.refreshExpiresIn);
//   }

//   /**
//    * Gera accessToken + refreshToken.
//    */
//   createTokens(payload: T): Tokens {
//     return {
//       accessToken: this.createAccessToken(payload),
//       refreshToken: this.createRefreshToken(payload),
//     };
//   }

//   /**
//    * Verifica se o accessToken é válido e retorna o payload.
//    */
//   verifyAccessToken(token: string): T | null {
//     return this.verifyToken(token, this.accessSecret);
//   }

//   /**
//    * Verifica se o refreshToken é válido e retorna o payload.
//    */
//   verifyRefreshToken(token: string): T | null {
//     return this.verifyToken(token, this.refreshSecret);
//   }

//   /**
//    * Retorna `true` se o accessToken for válido.
//    */
//   isAccessToken(token: string): boolean {
//     return this.verifyAccessToken(token) !== null;
//   }

//   /**
//    * Retorna `true` se o refreshToken for válido.
//    */
//   isRefreshToken(token: string): boolean {
//     return this.verifyRefreshToken(token) !== null;
//   }

//   /**
//    * Decodifica o accessToken e retorna o payload (mesmo se expirado).
//    */
//   decodeAccessToken(token: string): T | null {
//     return this.decodeToken(token, this.accessSecret, 'Invalid access token');
//   }

//   /**
//    * Decodifica o refreshToken e retorna o payload (mesmo se expirado).
//    */
//   decodeRefreshToken(token: string): T | null {
//     return this.decodeToken(token, this.refreshSecret, 'Invalid refresh token');
//   }

//   // ================================
//   // MÉTODOS PRIVADOS
//   // ================================

//   /**
//    * Assina o token JWT com secret e tempo de expiração.
//    */
//   private signToken(
//     payload: T,
//     secret: Secret,
//     expiresIn: string | number = '1h',
//   ): string {
//     const options: SignOptions = {
//       algorithm: "HS256",
//       expiresIn: expiresIn as SignOptions['expiresIn'], // <- fix do tipo
//     };

//     return sign(payload as JwtPayload, secret, options);
//   }
//   /**
//    * Verifica e retorna o payload do token.
//    */
//   private verifyToken(token: string, secret: Secret): T | null {
//     try {
//       const decoded = verify(token, secret);
//       return typeof decoded === 'object' ? (decoded as T) : null;
//     } catch {
//       return null;
//     }
//   }
>>>>>>> 76c59092360c13693d66e096b815d5bc4273c6a9

//   /**
//    * Decodifica o token e retorna o payload, lançando erro customizado se inválido.
//    */
//   private decodeToken(
//     token: string,
//     secret: Secret,
//     errorMsg: string,
//   ): T | null {
//     try {
//       const decoded = verify(token, secret);
//       return decoded as T;
//     } catch {
//       // Aqui estamos apenas instanciando o erro, não lançando
//       new BadRequestError(errorMsg);
//       return null;
//     }
//   }
// }

// export const JWT_ADAPTER = 'JwtAdapter';
