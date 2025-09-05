import { BadRequestError } from '../../errors'

export class TIMEVO {
  private readonly value: string

  constructor(time: string) {
    this.value = this.validate(time)
  }

  private validate(time: string): string {
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/

    if (!regex.test(time)) {
      throw new BadRequestError('Time must be in 24h format HH:mm.')
    }

    return time
  }

  public getValue(): string {
    return this.value // returns HH:mm
  }

  public getHours(): number {
    return parseInt(this.value.split(':')[0] ?? '')
  }

  public getMinutes(): number {
    return parseInt(this.value.split(':')[1] ?? '')
  }
}
