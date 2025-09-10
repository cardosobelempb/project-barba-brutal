export class PriceUtils {
  // Formata um número como moeda
  static format(
    value: number,
    currency: string = 'BRL',
    locale: string = 'pt-BR',
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value)
  }

  // Aplica um desconto percentual
  static applyDiscount(price: number, percent: number): number {
    if (percent < 0 || percent > 100) {
      throw new Error('Percentual de desconto deve estar entre 0 e 100')
    }
    return parseFloat((price * (1 - percent / 100)).toFixed(2))
  }

  // Soma múltiplos preços com precisão
  static sum(...prices: number[]): number {
    return parseFloat(prices.reduce((acc, curr) => acc + curr, 0).toFixed(2))
  }

  // Converte preço entre moedas usando uma taxa de câmbio fornecida
  static convert(price: number, rate: number): number {
    if (rate <= 0) {
      throw new Error('Taxa de câmbio inválida')
    }
    return parseFloat((price * rate).toFixed(2))
  }

  // Calcula valor com imposto (ex: 18%)
  static applyTax(price: number, taxPercent: number): number {
    return parseFloat((price * (1 + taxPercent / 100)).toFixed(2))
  }

  // Remove imposto (ex: saber o valor sem os 18% embutidos)
  static removeTax(priceWithTax: number, taxPercent: number): number {
    return parseFloat((priceWithTax / (1 + taxPercent / 100)).toFixed(2))
  }
}
