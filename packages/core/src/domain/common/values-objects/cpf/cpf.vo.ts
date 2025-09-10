import { BadRequestError } from '../../errors'

export class CpfVO {
  private readonly value: string

  constructor(cpf: string) {
    // CPF deve vir sem pontuação
    if (!/^\d{11}$/.test(cpf)) {
      throw new BadRequestError(
        `Formato inválido de CPF: "${cpf}". Deve conter apenas 11 dígitos numéricos.`,
      )
    }
    const onlyDigits = CpfVO.clean(cpf)

    if (!CpfVO.isValid(onlyDigits)) {
      throw new BadRequestError(`CPF inválido: ${cpf} (limpo: ${onlyDigits})`)
    }

    this.value = onlyDigits
  }

  public getValue(): string {
    return this.value
  }

  public getFormatted(): string {
    return CpfVO.format(this.value)
  }

  public equals(other: CpfVO): boolean {
    return this.value === other.getValue()
  }

  public static isValid(cpf: string): boolean {
    const cleaned = this.clean(cpf)

    if (!/^\d{11}$/.test(cleaned)) return false
    if (/^(\d)\1+$/.test(cleaned)) return false

    const digits = cleaned.split('').map(Number)

    const calcCheckDigit = (base: number, arr: number[]): number => {
      const sum = arr
        .slice(0, base)
        .reduce((acc, digit, idx) => acc + digit * (base + 1 - idx), 0)
      const rest = sum % 11
      return rest < 2 ? 0 : 11 - rest
    }

    const d1 = calcCheckDigit(9, digits)
    const d2 = calcCheckDigit(10, [...digits.slice(0, 9), d1])

    return d1 === digits[9] && d2 === digits[10]
  }

  public static format(cpf: string): string {
    const digits = this.clean(cpf)
    if (digits.length !== 11) {
      throw new Error('CPF deve conter 11 dígitos.')
    }
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  private static clean(cpf: string): string {
    return cpf.replace(/\D/g, '')
  }
}

/*
const cpf2 = new CpfVO('52998224725')
console.log(cpf2.getValue())
console.log(cpf2.getFormatted())
*/
