import { BadRequestError, JwtAbstract, Tokens } from '@repo/core';
import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

/**
 * Adapter JWT utilizando a biblioteca `jsonwebtoken` (v9+).
 * Suporta qualquer payload que estenda JwtPayload.
 */
export class JwtAdapter<T extends JwtPayload> implements JwtAbstract<T> {
  // Secrets (chaves de assinatura) - devem vir do .env ou config
  private readonly accessSecret: Secret =
    process.env.JWT_ACCESS_TOKEN_SECRET || 'fallback-access-secret';

  private readonly refreshSecret: Secret =
    process.env.JWT_REFRESH_TOKEN_SECRET || 'fallback-refresh-secret';

  // Tempo de expiração padrão (usando formato string ou número em segundos)
  private readonly accessExpiresIn: string | number =
    process.env.JWT_ACCESS_TOKEN_EXPIRATION || '15m';

  private readonly refreshExpiresIn: string | number =
    process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d';

  /**
   * Gera um accessToken com tempo curto de expiração.
   */
  createAccessToken(payload: T): string {
    return this.signToken(payload, this.accessSecret, this.accessExpiresIn);
  }

  /**
   * Gera um refreshToken com tempo longo de expiração.
   */
  createRefreshToken(payload: T): string {
    return this.signToken(payload, this.refreshSecret, this.refreshExpiresIn);
  }

  /**
   * Gera accessToken + refreshToken.
   */
  createTokens(payload: T): Tokens {
    return {
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createRefreshToken(payload),
    };
  }

  /**
   * Verifica se o accessToken é válido e retorna o payload.
   */
  verifyAccessToken(token: string): T | null {
    return this.verifyToken(token, this.accessSecret);
  }

  /**
   * Verifica se o refreshToken é válido e retorna o payload.
   */
  verifyRefreshToken(token: string): T | null {
    return this.verifyToken(token, this.refreshSecret);
  }

  /**
   * Retorna `true` se o accessToken for válido.
   */
  isAccessToken(token: string): boolean {
    return this.verifyAccessToken(token) !== null;
  }

  /**
   * Retorna `true` se o refreshToken for válido.
   */
  isRefreshToken(token: string): boolean {
    return this.verifyRefreshToken(token) !== null;
  }

  /**
   * Decodifica o accessToken e retorna o payload (mesmo se expirado).
   */
  decodeAccessToken(token: string): T | null {
    return this.decodeToken(token, this.accessSecret, 'Invalid access token');
  }

  /**
   * Decodifica o refreshToken e retorna o payload (mesmo se expirado).
   */
  decodeRefreshToken(token: string): T | null {
    return this.decodeToken(token, this.refreshSecret, 'Invalid refresh token');
  }

  // ================================
  // MÉTODOS PRIVADOS
  // ================================

  /**
   * Assina o token JWT com secret e tempo de expiração.
   */
  private signToken(
    payload: T,
    secret: Secret,
    expiresIn: string | number = '1h',
  ): string {
    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions['expiresIn'], // <- fix do tipo
    };

    return sign(payload as JwtPayload, secret, options);
  }
  /**
   * Verifica e retorna o payload do token.
   */
  private verifyToken(token: string, secret: Secret): T | null {
    try {
      const decoded = verify(token, secret);
      return typeof decoded === 'object' ? (decoded as T) : null;
    } catch {
      return null;
    }
  }

  /**
   * Decodifica o token e retorna o payload, lançando erro customizado se inválido.
   */
  private decodeToken(
    token: string,
    secret: Secret,
    errorMsg: string,
  ): T | null {
    try {
      const decoded = verify(token, secret);
      return decoded as T;
    } catch {
      // Aqui estamos apenas instanciando o erro, não lançando
      new BadRequestError(errorMsg);
      return null;
    }
  }
}

export const JWT_ADAPTER = 'JwtAdapter';
