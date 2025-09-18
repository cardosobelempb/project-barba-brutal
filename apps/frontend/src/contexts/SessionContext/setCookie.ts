interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

  if (options.maxAge) {
    cookieString += ` Max-Age=${options.maxAge};`;
  }

  if (options.expires) {
    cookieString += ` Expires=${options.expires.toUTCString()};`;
  }

  if (options.path) {
    cookieString += ` Path=${options.path};`;
  }

  if (options.domain) {
    cookieString += ` Domain=${options.domain};`;
  }

  if (options.secure) {
    cookieString += ` Secure;`;
  }

  if (options.httpOnly) {
    cookieString += ` HttpOnly;`;
  }

  document.cookie = cookieString;
}

