export class NumberUtils {
  private constructor() {}

  /**
   * Formata um número para sempre ter duas casas decimais.
   * Exemplo: 123.4 -> 123.40, 123 -> 123.00
   */
  static formatNumberWithDecimal(num: number): string {
    const [int, decimal] = num.toString().split('.')
    return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
  }

  /**
   * Formata um número como moeda (ex: 1234.56 -> R$ 1.234,56).
   */
  static formatCurrency(
    num: number,
    locale: string = 'pt-BR',
    currency: string = 'BRL',
  ): string {
    return num.toLocaleString(locale, { style: 'currency', currency })
  }

  /**
   * Arredonda um número para um número específico de casas decimais.
   * Exemplo: roundToDecimalPlaces(2.345, 2) -> 2.35
   */
  static roundToDecimalPlaces(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces)
    return Math.round(num * factor) / factor
  }

  /**
   * Converte uma string de moeda de volta para um número.
   * Exemplo: parseCurrency('R$ 1.234,56') -> 1234.56
   */
  static parseCurrency(currencyString: string): number {
    const numberString = currencyString
      .replace(/[^\d,-]/g, '')
      .replace(',', '.')
    return parseFloat(numberString)
  }

  /**
   * Formata um número como percentual (ex: 0.1234 -> 12.34%).
   */
  static formatPercentage(num: number): string {
    return `${(num * 100).toFixed(2)}%`
  }

  /**
   * Formata um número de telefone (ex: 1234567890 -> (12) 34567-8901).
   */
  static formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '') // Remove non-numeric characters
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/) // Match pattern (xx) xxxxx-xxxx

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }

    return phone // Retorna o número original se não corresponder ao padrão
  }

  /**
   * Calcula o valor do imposto de um número com uma determinada porcentagem.
   * Exemplo: calculateTax(100, 15) -> 15
   */
  static calculateTax(amount: number, taxRate: number): number {
    return (amount * taxRate) / 100
  }

  /**
   * Verifica se o número é positivo.
   */
  static isPositive(num: number): boolean {
    return num > 0
  }

  /**
   * Verifica se o número é negativo.
   */
  static isNegative(num: number): boolean {
    return num < 0
  }

  /**
   * Verifica se o número é um inteiro.
   */
  static isInteger(num: number): boolean {
    return Number.isInteger(num)
  }
}
