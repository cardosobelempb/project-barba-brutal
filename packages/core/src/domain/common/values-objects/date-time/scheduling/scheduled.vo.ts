import dayjs, { Dayjs } from 'dayjs'
import { AbstractScheduled } from './scheduling.abstract'
import { BadRequestError } from '../../../errors'

export class ScheduledVO extends AbstractScheduled {
  protected date: Dayjs

  constructor(input: string | Date | Dayjs) {
    super()
    const parsed = dayjs(input)

    if (!parsed.isValid()) {
      throw new BadRequestError('Invalid appointment date.')
    }

    const now = dayjs()
    if (!super.isValidSchedule(parsed.valueOf(), now.valueOf())) {
      throw new BadRequestError(
        'Appointments must be in the future, up to 1 year from today.',
      )
    }

    this.date = parsed
  }

  getValue(): Dayjs {
    return this.date
  }

  toString(): string {
    return this.date.format('YYYY-MM-DD HH:mm')
  }

  isValid(): boolean {
    const now = dayjs()
    return (
      this.date.isValid() &&
      super.isValidSchedule(this.date.valueOf(), now.valueOf())
    )
  }
}
