import { BadRequestError } from '../../errors'

export class EmailVO {
  private readonly _value: string
  private readonly _label?: string // Atributo opcional, por exemplo: 'trabalho', 'pessoal', etc.

  constructor(value: string, label?: string) {
    if (!EmailVO.isValid(value)) {
      throw new BadRequestError(`Endereço de email inválido: "${value}"`)
    }

    this._value = value.toLowerCase().trim() // Normalização simples
    this._label = label
  }

  static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.toLowerCase())
  }

  public getValue(): string {
    return this._value
  }

  public getLabel(): string | undefined {
    return this._label
  }

  toString(): string {
    return this._value
  }

  equals(other: EmailVO): boolean {
    return this._value === other.getValue()
  }
}
