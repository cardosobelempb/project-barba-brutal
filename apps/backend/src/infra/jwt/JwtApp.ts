import {
  BadRequestError,
  ErrorConstants,
  JwtAbstract,
  Tokens,
} from '@repo/core';
import { sign, verify } from 'jsonwebtoken';

export class JwtApp<T extends object> extends JwtAbstract<T> {
  private readonly jwtAccessTokenSecretKey =
    process.env.JWT_ACCESS_TOKEN_SECRET || 'fallback-secret';

  private readonly jwtAccessTokenExpiration =
    Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION) || '1h';

  private readonly jwtRefreshTokenSecretKey =
    process.env.JWT_REFRESH_TOKEN_SECRET || 'fallback-refresh-secret';

  private readonly jwtRefreshTokenExpiration =
    Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION) || '7d';

  createAccessToken(payload: T): string {
    return sign(payload, this.jwtAccessTokenSecretKey, {
      expiresIn: this.jwtAccessTokenExpiration,
    });
  }

  createRefreshToken(payload: T): string {
    return sign(payload, this.jwtRefreshTokenSecretKey, {
      expiresIn: this.jwtRefreshTokenExpiration,
    });
  }

  createTokens(payload: T): Tokens {
    return {
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createRefreshToken(payload),
    };
  }

  verifyAccessToken(token: string): T | null {
    try {
      const decoded = verify(token, this.jwtAccessTokenSecretKey);
      if (typeof decoded === 'string') {
        // If decoded is a string, it's not the expected payload type
        return null;
      }
      return decoded as T;
    } catch {
      throw new BadRequestError('Invalid access token');
    }
  }

  verifyRefreshToken(token: string): T | null {
    try {
      const decoded = verify(token, this.jwtAccessTokenSecretKey);
      if (typeof decoded === 'string') {
        // If decoded is a string, it's not the expected payload type
        return null;
      }
      return decoded as T;
    } catch {
      new BadRequestError('Invalid access token');
      return null;
    }
  }

  checkAccessToken(token: string): boolean {
    try {
      verify(token, this.jwtAccessTokenSecretKey);
      return true;
    } catch {
      throw new BadRequestError(ErrorConstants.INVALID_CREDENTIALS);
    }
  }

  checkRefreshToken(token: string): boolean {
    try {
      verify(token, this.jwtRefreshTokenSecretKey);
      return true;
    } catch {
      throw new BadRequestError(ErrorConstants.INVALID_CREDENTIALS);
    }
  }

  decodeAccessToken(token: string): T | null {
    try {
      const decoded = verify(token, this.jwtAccessTokenSecretKey);
      return decoded as T;
    } catch {
      new BadRequestError('Invalid access token');
      return null;
    }
  }

  decodeRefreshToken(token: string): T | null {
    try {
      const decoded = verify(token, this.jwtRefreshTokenSecretKey);
      return decoded as T;
    } catch {
      new BadRequestError('Invalid access token');
      return null;
    }
  }
}

export const JWT_APP = 'JwtApp';
