import dayjs, { Dayjs } from 'dayjs'
import { AbstractDateOfBirth } from './date-of-birth.abstract'
import { BadRequestError } from '../../../errors'

export class DateOfBirthVO extends AbstractDateOfBirth {
  protected date: Dayjs

  constructor(input: string | Date | Dayjs) {
    super()
    const parsed = dayjs(input)

    if (!parsed.isValid()) {
      throw new BadRequestError('Invalid date.')
    }

    const age = DateOfBirthVO.calculateAge(parsed)
    if (!super.isValidAge(age)) {
      throw new BadRequestError(
        'Age outside the permitted range (0-130 years).',
      )
    }

    this.date = parsed.startOf('day')
  }

  getValue(): Dayjs {
    return this.date
  }

  toString(): string {
    return this.date.format('YYYY-MM-DD')
  }

  isValid(): boolean {
    return this.date.isValid() && super.isValidAge(this.getAge())
  }

  getAge(): number {
    return DateOfBirthVO.calculateAge(this.date)
  }

  private static calculateAge(date: Dayjs): number {
    const today = dayjs()
    return today.diff(date, 'year')
  }
}

// const date = new DateOfBirthVO('1977/06/26')
// console.log(date.getValue().year())
