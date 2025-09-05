import { BadRequestError } from '../../errors'

export class DATEVO {
  private readonly value: Date

  constructor(dateString: string) {
    this.value = this.validate(dateString)
  }

  private validate(dateString: string): Date {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      throw new BadRequestError('Invalid date format. Use YYYY-MM-DD.')
    }

    const iso = dateString.split('T')[0] || ''
    const regex = /^\d{4}-\d{2}-\d{2}$/

    if (!regex.test(iso)) {
      throw new BadRequestError('Date must be in format YYYY-MM-DD.')
    }

    return new Date(iso) // strips time
  }

  public getValue(): string {
    return this.value.toISOString().split('T')[0] ?? '' // returns YYYY-MM-DD
  }

  public getDate(): Date {
    return this.value
  }
}
