import { BadRequestError } from '../../../errors'
import { CheckInVO } from './check-in.vo'
import { ChecksAbstract } from './checks.abstract'

export class CheckOutVO extends ChecksAbstract {
  private constructor(input: Date | string) {
    super(input)
  }

  public static create(input: Date | string, checkIn?: CheckInVO): CheckOutVO {
    const instance = new CheckOutVO(input)

    if (checkIn && instance.isBefore(checkIn)) {
      throw new BadRequestError(
        'Check-out date cannot be earlier than check-in date.',
      )
    }

    return instance
  }

  public isPast(): boolean {
    return this.toDate().getTime() < new Date().setHours(0, 0, 0, 0)
  }

  public isFuture(): boolean {
    return this.toDate().getTime() > new Date().setHours(0, 0, 0, 0)
  }
}
