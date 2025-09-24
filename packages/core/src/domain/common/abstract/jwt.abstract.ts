export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export abstract class JwtAbstract<T extends object> {
  /**
   * Cria um accessToken com base no payload.
   */
  abstract createAccessToken(payload: T): string;

  /**
   * Cria um refreshToken com base no payload.
   */
  abstract createRefreshToken(payload: T): string;

  /**
   * Cria ambos: accessToken e refreshToken.
   */
  abstract createTokens(payload: T): Tokens;

  /**
   * Verifica se um accessToken é válido.
   */
  abstract verifyAccessToken(token: string): T | null;

  /**
   * Verifica se um refreshToken é válido.
   */
  abstract verifyRefreshToken(token: string): T | null;;

   /**
   * Verifica se um accessToken é válido.
   */
  abstract checkAccessToken(token: string): boolean;

  /**
   * Verifica se um refreshToken é válido.
   */
  abstract checkRefreshToken(token: string): boolean;

  /**
 * Decodifica e retorna o payload do accessToken, se válido.
 */
abstract decodeAccessToken(token: string): T | null;

/**
 * Decodifica e retorna o payload do refreshToken, se válido.
 */
abstract decodeRefreshToken(token: string): T | null;

}
