import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { BadRequestError, JwtAbstract, Tokens } from '@repo/core';
import { UserPayloadDTO } from '@repo/types';

/**
 * Adaptador JWT compatível com a interface JwtAbstract.
 * Suporta payloads que estendem UserPayloadDTO.
 */
export class JwtAdapter<T extends UserPayloadDTO> implements JwtAbstract<T> {
  constructor(private readonly jwtService: JwtService) {
    //  console.log('JwtAdapter constructor called');
    // console.log('JwtService is', jwtService ? 'defined' : 'undefined');
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

  private readonly privateKey = Buffer.from(`${process.env.JWT_PRIVATE_KEY}`, "base64");

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

export const JWT_ADAPTER = 'JwtAdapter';
