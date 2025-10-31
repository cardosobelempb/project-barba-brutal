import { destroyCookie } from "nookies";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_COOKIE,
} from "./sessionCookies";

/**
 * Lista de cookies relacionados à sessão do usuário.
 * Facilita manutenção futura (adicionar/remover cookies de sessão).
 */
const SESSION_COOKIES = [
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_COOKIE,
];

/**
 * Remove todos os cookies relacionados à sessão do usuário.
 *
 * ⚠️ Importante: Deve ser chamado sempre que a sessão expirar ou usuário fizer logout.
 */
export function clearSessionCookies(): void {
  SESSION_COOKIES.forEach((cookieName) => {
    destroyCookie(undefined, cookieName, { path: "/" }); // Garante remoção correta em todas as rotas
  });
}

/**
 * Encerra a sessão do usuário.
 * - Remove cookies de sessão
 * - Redireciona para a home se o router for fornecido
 *
 * @param router - Objeto de roteamento do Next.js (opcional)
 */
export function sessionSignOut(router?: { push: (path: string) => void }): void {
  clearSessionCookies();

  if (router?.push) {
    router.push("/"); // Redireciona para a página inicial
  }
}
