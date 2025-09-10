import { BadRequestError } from '../../errors'

export class CnpjVO {
  private readonly value: string

  constructor(cnpj: string) {
    const onlyDigits = CnpjVO.clean(cnpj)

    if (!/^\d{14}$/.test(cnpj)) {
      throw new BadRequestError(
        `Formato inválido: CNPJ deve conter apenas 14 dígitos numéricos. Valor recebido: "${cnpj}"`,
      )
    }

    if (!CnpjVO.isValid(onlyDigits)) {
      throw new BadRequestError(`CNPJ inválido: ${cnpj} (limpo: ${onlyDigits})`)
    }

    this.value = onlyDigits
  }

  public getValue(): string {
    return this.value
  }

  public getFormatted(): string {
    return CnpjVO.format(this.value)
  }

  public equals(other: CnpjVO): boolean {
    return this.value === other.getValue()
  }

  public static isValid(cnpj: string): boolean {
    const cleaned = this.clean(cnpj)

    if (!/^\d{14}$/.test(cleaned)) return false
    if (/^(\d)\1+$/.test(cleaned)) return false

    const digits = cleaned.split('').map(Number)

    const calcCheckDigit = (length: number): number => {
      const weights =
        length === 12
          ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
          : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

      const sum = digits
        .slice(0, length)
        .reduce((acc, digit, index) => acc + digit * (weights?.[index] ?? 0), 0)

      const rest = sum % 11
      return rest < 2 ? 0 : 11 - rest
    }

    const d1 = calcCheckDigit(12)
    const d2 = calcCheckDigit(13)

    return d1 === digits[12] && d2 === digits[13]
  }

  public static format(cnpj: string): string {
    const digits = this.clean(cnpj)

    if (digits.length !== 14) {
      throw new Error('CNPJ deve conter 14 dígitos.')
    }

    return digits.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    )
  }

  private static clean(cnpj: string): string {
    return cnpj.replace(/\D/g, '')
  }
}

/*
const cnpj = new CnpjVO('12345678000195')
console.log(cnpj.getValue())
console.log(cnpj.getFormatted())
*/
