import { BadRequestError } from '../../errors'

interface PhoneValidationOptions {
  minLength?: number
  maxLength?: number
}

export class PhoneVO {
  private readonly value: string

  constructor(phone: string, options: PhoneValidationOptions = {}) {
    const cleaned = PhoneVO.clean(phone)

    if (!PhoneVO.isValid(cleaned)) {
      throw new BadRequestError(`Telefone inválido: ${cleaned}`)
    }

    const min = options.minLength ?? 10
    const max = options.maxLength ?? 11

    this.validate(cleaned, min, max)
    this.value = cleaned
  }

  private validate(cleanedPhone: string, min: number, max: number): void {
    if (cleanedPhone.length < min) {
      throw new BadRequestError(`Telefone deve ter ao menos ${min} dígitos.`)
    }

    if (cleanedPhone.length > max) {
      throw new BadRequestError(`Telefone deve ter no máximo ${max} dígitos.`)
    }
  }

  public getValue(): string {
    return this.value
  }

  public equals(other: PhoneVO): boolean {
    return this.value === other.getValue()
  }

  public format(): string {
    const ddd = this.value.slice(0, 2)
    const isMobile = this.value.length === 11
    const firstPart = isMobile ? this.value.slice(2, 7) : this.value.slice(2, 6)
    const secondPart = isMobile ? this.value.slice(7) : this.value.slice(6)

    return `(${ddd}) ${firstPart}-${secondPart}`
  }

  public static isValid(phone: string): boolean {
    const cleaned = this.clean(phone)
    if (!/^\d{10,11}$/.test(cleaned)) return false

    const ddd = cleaned.slice(0, 2)
    const number = cleaned.slice(2)

    const validDDDs = ['11', '21', '31', '41', '51', '61', '71', '81', '91']
    if (!validDDDs.includes(ddd)) return false

    if (number.length === 9 && number[0] !== '9') return false
    if (
      number.length === 8 &&
      number[0] &&
      !['2', '3', '4', '5'].includes(number[0])
    )
      return false

    return true
  }

  private static clean(phone: string): string {
    return phone.replace(/\D/g, '')
  }
}

/*
const tel1 = new PhoneVO('(11) 91234-5678')
const tel2 = new PhoneVO('+55 (11) 91234-5678')

console.log(tel1.getValue()) // "11912345678"
console.log(tel2.equals(tel1)) // true

const tel3 = new PhoneVO('11912345678')
console.log(tel3.format()) // (11) 91234-5678

const fixo = new PhoneVO('(11) 2345-6789')
console.log(fixo.format()) // (11) 2345-6789

const tel4 = new PhoneVO('11912345678')
console.log(tel4.format()) // (11) 91234-5678
*/
