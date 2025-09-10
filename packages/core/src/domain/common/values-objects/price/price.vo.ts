import { BadRequestError } from '../../errors'
import { messages } from '../locales/locales'

type SupportedLang = 'pt' | 'en'

type PriceOptions = {
  lang?: SupportedLang
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  minValue?: number
}

export class PriceVO {
  private readonly value: number
  private readonly currency: string
  private readonly lang: SupportedLang

  private constructor(value: number, currency: string, lang: SupportedLang) {
    this.value = value
    this.currency = currency
    this.lang = lang
  }

  public static create(
    input: string | number,
    options: PriceOptions = { lang: 'en', currency: 'USD' },
  ): PriceVO {
    const { lang = 'en', currency = 'USD', minValue = 0 } = options
    const msg = messages[lang] ?? messages['en']

    if (!this.isCurrencySupported(currency)) {
      throw new BadRequestError(
        msg.PRICE_UNSUPPORTED_CURRENCY?.replace('{currency}', currency) ??
          `Unsupported currency: ${currency}`,
      )
    }

    if (input === null || input === undefined || input === '') {
      throw new BadRequestError(msg.EMPTY ?? 'Price cannot be empty.')
    }

    let numericValue: number
    if (typeof input === 'string') {
      // Remove símbolos e converte para ponto flutuante
      const cleaned = input
        .replace(/[^\d,.-]/g, '')
        .replace(',', '.')
        .replace(/(\..*)\./g, '$1') // Remove múltiplos pontos

      numericValue = parseFloat(cleaned)
    } else {
      numericValue = input
    }

    if (isNaN(numericValue)) {
      throw new BadRequestError(msg.PRICE_INVALID ?? 'Invalid price value.')
    }

    if (numericValue < minValue) {
      throw new BadRequestError(
        msg.PRICE_NEGATIVE ??
          `Price must be greater than or equal to ${minValue}.`,
      )
    }

    return new PriceVO(numericValue, currency, lang)
  }

  public getValue(): number {
    return this.value
  }

  public getCurrency(): string {
    return this.currency
  }

  public getLang(): SupportedLang {
    return this.lang
  }

  public format(options: PriceOptions = {}): string {
    const {
      lang = this.lang,
      currency = this.currency,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options

    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(this.value)
  }

  public toString(): string {
    return this.format()
  }

  private static isCurrencySupported(currency: string): boolean {
    try {
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(1)
      return true
    } catch {
      return false
    }
  }
}
