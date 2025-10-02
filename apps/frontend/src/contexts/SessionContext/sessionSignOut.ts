import { destroyCookie } from "nookies";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_COOKIE,
} from "./sessionCookies";

/**
 * Remove todos os cookies relacionados à sessão do usuário
 */
const clearSessionCookies = () => {
  const cookiesToRemove = [
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    USER_COOKIE,
  ];

  cookiesToRemove.forEach((cookieName) => {
    destroyCookie(undefined, cookieName);
  });
};

/**
 * Encerra a sessão do usuário removendo cookies e redirecionando para a home (opcional)
 *
 * @param router - Objeto de roteamento do Next.js, opcional. Se fornecido, redireciona para a home.
 */
export async function sessionSignOut(
  router?: { push: (path: string) => void }
): Promise<void> {
  clearSessionCookies(); // Remove tokens e dados do usuário

  if (router) {
    router.push("/"); // Redireciona para a página inicial
  }
}
