export class StringUtils {
  private constructor() {}

  // Verifica se a string é nula, indefinida ou vazia após trim
  static isBlank(value: string | null | undefined): boolean {
    return !value || value.trim().length === 0
  }

  // Retorna o inverso de isBlank
  static isNotBlank(value: string | null | undefined): boolean {
    return !this.isBlank(value)
  }

  // Capitaliza a primeira letra da string
  static capitalize(value: string | null | undefined): string | undefined {
    if (this.isBlank(value)) return value ?? undefined
    return value!.charAt(0).toUpperCase() + value!.slice(1).toLowerCase()
  }

  // Remove acentos da string
  static removeAccents(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  // Converte a string em slug (ex: "Olá Mundo" -> "ola-mundo")
  static toSlug(value: string): string {
    return this.removeAccents(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  // Limita a string a um tamanho máximo e adiciona "..."
  static truncate(value: string, maxLength: number): string {
    if (!value || value.length <= maxLength) return value
    return value.substring(0, maxLength).trimEnd() + '...'
  }

  // Conta quantas vezes uma substring aparece em um texto
  static countOccurrences(text: string, search: string): number {
    if (this.isBlank(text) || this.isBlank(search)) return 0
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return (text.match(new RegExp(escaped, 'g')) || []).length
  }

  // Inverte a string
  static reverse(value: string): string {
    return value.split('').reverse().join('')
  }

  // Valida e-mail usando regex básica
  static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Verifica se uma URL é válida
  static isValidURL(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Valida CPF com base nos dígitos verificadores
  static isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) sum += +cpf.charAt(i) * (10 - i)
    let rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== +cpf.charAt(9)) return false

    sum = 0
    for (let i = 0; i < 10; i++) sum += +cpf.charAt(i) * (11 - i)
    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0

    return rest === +cpf.charAt(10)
  }

  // Valida CNPJ com base nos dígitos verificadores
  static isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

    const calcCheckDigit = (base: string, factors: number[]) =>
      factors.reduce((sum, factor, i) => sum + +base.charAt(i) * factor, 0)

    const base = cnpj.slice(0, 12)
    const digit1 =
      calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11
    const check1 = digit1 < 2 ? 0 : 11 - digit1

    const base2 = base + check1
    const digit2 =
      calcCheckDigit(base2, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) % 11
    const check2 = digit2 < 2 ? 0 : 11 - digit2

    return cnpj.endsWith(`${check1}${check2}`)
  }

  // Converte para camelCase
  static toCamelCase(value: string): string {
    return value
      .replace(/[-_]+/g, ' ')
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, '')
  }

  // Converte para snake_case
  static toSnakeCase(value: string): string {
    return value
      .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      .replace(/[\s\-]+/g, '_')
      .replace(/__+/g, '_')
      .toLowerCase()
  }

  // Converte para kebab-case
  static toKebabCase(value: string): string {
    return value
      .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      .replace(/[\s_]+/g, '-')
      .replace(/--+/g, '-')
      .toLowerCase()
  }

  // Gera string aleatória básica
  static generateRandomString(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Gera string aleatória segura com crypto
  static generateSecureRandomString(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    return Array.from(array, byte => chars[byte % chars.length]).join('')
  }

  // Retorna as iniciais de um nome
  static getInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .map(word => word[0]?.toUpperCase())
      .join('')
  }
}

/*
const str = 'cláudio Cardoso'
const str1 = StringUtils.isBlank('')
const str2 = StringUtils.capitalize(str)
console.log(str1)
console.log(str2)
*/
