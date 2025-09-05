import { BadRequestError } from '../../errors'
import { messages } from './desciption-message.vo'

type DescriptionValidationOptions = {
  required?: boolean
  maxLength?: number
  minLength?: number
}

export class DescriptionVO {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(
    rawValue: string,
    lang: 'pt' | 'en' = 'en',
    options: DescriptionValidationOptions = { required: true, maxLength: 500 },
  ): DescriptionVO {
    const msg = messages[lang] ?? messages['en']
    const value = rawValue?.trim() ?? ''

    const { required = true, maxLength = 500, minLength = 0 } = options

    if (required && value.length === 0) {
      throw new BadRequestError(msg.EMPTY)
    }

    if (value.length < minLength) {
      throw new BadRequestError(
        msg.TOO_SHORT ?? `Minimum length is ${minLength}`,
      )
    }

    if (value.length > maxLength) {
      throw new BadRequestError(
        msg.TOO_LONG ?? `Maximum length is ${maxLength}`,
      )
    }

    return new DescriptionVO(value)
  }

  public getValue(): string {
    return this.value
  }

  public toString(): string {
    return this.value
  }
}
