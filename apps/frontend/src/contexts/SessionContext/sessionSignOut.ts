import { destroyCookie } from "nookies";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, USER_COOKIE } from "./sessionCookies";

export async function sessionSignOut(router?: { push: (path: string) => void }) {
  destroyCookie(undefined, ACCESS_TOKEN_COOKIE);
  destroyCookie(undefined, REFRESH_TOKEN_COOKIE);
  destroyCookie(undefined, USER_COOKIE);

  if (router) {
    router.push("/");
  }
}
