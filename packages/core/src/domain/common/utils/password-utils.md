### 🔧 PasswordUtils.ts (classe principal com integração)
```
  import { HashComparer } from '../abstract'

export class PasswordUtils {
  constructor(private hasher: HashComparer) {}
  // Gera uma senha aleatória
  static generatePassword(
    length: number = 12,
    useUpperCase: boolean = true,
    useNumbers: boolean = true,
    useSymbols: boolean = true,
  ): string {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = lowerCase
    if (useUpperCase) chars += upperCase
    if (useNumbers) chars += numbers
    if (useSymbols) chars += symbols

    let password = ''
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length)
      password += chars[index]
    }

    return password
  }

  // Valida requisitos mínimos de senha
  static validatePassword(password: string): boolean {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSymbol
    )
  }

  // Verifica força da senha (simples)
  static getPasswordStrength(password: string): 'Fraca' | 'Média' | 'Forte' {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++

    if (score <= 1) return 'Fraca'
    if (score === 2 || score === 3) return 'Média'
    return 'Forte'
  }

  async hash(password: string): Promise<string> {
    return this.hash(password)
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return this.compare(password, hashed)
  }
}

```

### 💡 Exemplo de uso
```
import { BcryptPasswordHasher } from './BcryptPasswordHasher';
import { PasswordUtils } from './PasswordUtils';

const utils = new PasswordUtils(new BcryptPasswordHasher());

const senha = PasswordUtils.generatePassword();
console.log('Senha gerada:', senha);

const hash = await utils.hash(senha);
console.log('Hash:', hash);

const ok = await utils.compare(senha, hash);
console.log('Senha confere?', ok);
```
