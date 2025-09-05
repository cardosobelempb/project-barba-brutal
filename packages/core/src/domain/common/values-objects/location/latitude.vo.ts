import { BadRequestError } from '../../errors'

export class LatitudeVO {
  private readonly _value: number

  constructor(value: number) {
    if (!LatitudeVO.isValid(value)) {
      throw new BadRequestError(
        `Invalid latitude: ${value}. Must be between -90 and 90.`,
      )
    }
    this._value = value
  }

  public static isValid(value: number): boolean {
    return value >= -90 && value <= 90
  }

  public get value(): number {
    return this._value
  }

  public toString(): string {
    return this._value.toString()
  }
}
