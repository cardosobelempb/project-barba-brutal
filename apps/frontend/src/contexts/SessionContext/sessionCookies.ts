/**
 * Prefixo usado para identificar cookies da aplicação Belezixa Admin
 */
const COOKIE_PREFIX = "belezixaadmin";

/**
 * Tempo de expiração padrão para cookies de sessão em segundos (30 dias)
 */
const SESSION_COOKIE_EXPIRATION = 60 * 60 * 24 * 30; // 30 dias

/**
 * Nomes dos cookies utilizados para autenticação e sessão do usuário
 */
export const ACCESS_TOKEN_COOKIE = `${COOKIE_PREFIX}.accessToken`;
export const REFRESH_TOKEN_COOKIE = `${COOKIE_PREFIX}.refreshToken`;
export const USER_COOKIE = `${COOKIE_PREFIX}.user`;

/**
 * Tempo de expiração (em segundos) de cada cookie
 */
export const ACCESS_TOKEN_COOKIE_MAX_AGE = SESSION_COOKIE_EXPIRATION;
export const REFRESH_TOKEN_COOKIE_MAX_AGE = SESSION_COOKIE_EXPIRATION;
export const USER_COOKIE_MAX_AGE = SESSION_COOKIE_EXPIRATION;
