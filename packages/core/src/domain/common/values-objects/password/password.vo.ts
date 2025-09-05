import { Hashed } from '../../abstract/hash.abstract'
import { BadRequestError } from '../../errors'

interface PasswordOptions {
  minLength?: number
  maxLength?: number
  requireUppercase?: boolean
  requireLowercase?: boolean
  requireDigit?: boolean
  requireSpecialChar?: boolean
}

export class PasswordVO {
  private readonly password: string

  constructor(
    password: string,
    private readonly hashed?: Hashed,
    private readonly options: PasswordOptions = {},
  ) {
    this.password = password

    const {
      minLength = 8,
      maxLength = 64,
      requireUppercase = true,
      requireLowercase = true,
      requireDigit = true,
      requireSpecialChar = true,
    } = this.options

    this.validate(password, {
      minLength,
      maxLength,
      requireUppercase,
      requireLowercase,
      requireDigit,
      requireSpecialChar,
    })
  }

  private validate(password: string, options: Required<PasswordOptions>): void {
    const {
      minLength,
      maxLength,
      requireUppercase,
      requireLowercase,
      requireDigit,
      requireSpecialChar,
    } = options

    if (!password || password.trim().length === 0) {
      throw new BadRequestError('Password cannot be empty.')
    }

    if (password.length < minLength) {
      throw new BadRequestError(
        `Password must be at least ${minLength} characters.`,
      )
    }

    if (password.length > maxLength) {
      throw new BadRequestError(
        `Password must be at most ${maxLength} characters.`,
      )
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
      throw new BadRequestError(
        'Password must include at least one uppercase letter.',
      )
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
      throw new BadRequestError(
        'Password must include at least one lowercase letter.',
      )
    }

    if (requireDigit && !/\d/.test(password)) {
      throw new BadRequestError('Password must include at least one number.')
    }

    if (
      requireSpecialChar &&
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=~`]/.test(password)
    ) {
      throw new BadRequestError(
        'Password must include at least one special character.',
      )
    }
  }

  // ⚠️ Verifica se senha e confirmação são iguais
  public static confirm(password: string, confirmPassword: string): void {
    if (password !== confirmPassword) {
      throw new BadRequestError('Password and confirmation do not match.')
    }
  }

  // ✅ Verifica se a senha antiga bate com o hash salvo
  public static async validateOldPassword(
    oldPassword: string,
    oldHash: string,
    hasher: Hashed,
  ): Promise<void> {
    const match = await hasher.compare(oldPassword, oldHash)
    if (!match) {
      throw new BadRequestError('Old password is incorrect.')
    }
  }

  // Gera uma senha aleatória
  public static generatePassword(
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

  public async hashPassword(saltRounds: number = 10): Promise<string> {
    if (!this.hashed) {
      throw new Error('Hasher not provided. Cannot hash password.')
    }

    // const salt = await this.hashed.salt(saltRounds)
    return this.hashed.hash(this.password)
  }

  public async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    if (!this.hashed) {
      throw new BadRequestError('Hasher not provided. Cannot verify password.')
    }

    return this.hashed.compare(password, hash)
  }

  public async isValidHash(hash: string): Promise<boolean> {
    if (!this.hashed) {
      throw new BadRequestError(
        'Hasher not provided. Cannot check hash validity.',
      )
    }

    return this.hashed.compare(this.password, hash)
  }

  /**
   * Verifica se uma string tem formato de hash bcrypt válido.
   * @param hash A string a ser validada.
   * @returns `true` se for um hash bcrypt válido.
   */
  public static isValidBcryptHash(hash: string): boolean {
    const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/
    return typeof hash === 'string' && bcryptRegex.test(hash)
  }

  public getValue(): string {
    return this.password
  }
}

/*
const password = new PasswordVO('Example123!')
console.log(password.hashPassword(12))
const password = new PasswordVO('Example123!', new BcryptHasher())
const hash = await password.hashPassword()

const password = new PasswordVO(
  'MySecureP@ss123',
  new BcryptHasher(), // Supondo que implemente Hashed
  {
    minLength: 10,
    requireSpecialChar: true,
  },
)
  */
