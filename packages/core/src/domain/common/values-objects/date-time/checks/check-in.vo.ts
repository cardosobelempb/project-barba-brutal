import { ChecksAbstract } from './checks.abstract'

export class CheckInVO extends ChecksAbstract {
  private constructor(input: Date | string) {
    super(input)
  }

  public static create(input: Date | string): CheckInVO {
    return new CheckInVO(input)
  }

  public isPast(): boolean {
    return this.toDate().getTime() < new Date().setHours(0, 0, 0, 0)
  }

  public isFuture(): boolean {
    return this.toDate().getTime() > new Date().setHours(0, 0, 0, 0)
  }

  public isToday(): boolean {
    const today = new Date()
    const checkIn = this.toDate()
    return checkIn.toDateString() === today.toDateString()
  }

  /**
   * Verifica se o check-in está expirado (antes de hoje)
   */

  public isExpired(): boolean {
    return this.isPast()
  }

  /**
   * Verifica se a data de hoje está dentro do intervalo fornecido.
   * @param start Data de início (inclusive)
   * @param end Data de fim (inclusive)
   */
  public static isTodayWithinRange(
    start: Date | string,
    end: Date | string,
  ): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startDate = new Date(start)
    const endDate = new Date(end)

    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    return (
      today.getTime() >= startDate.getTime() &&
      today.getTime() <= endDate.getTime()
    )
  }
}

// const checkin1 = CheckInVO.create('1977/06/26')
// const checkin2 = CheckInVO.create('1977/06/26')
// console.log(checkin1)
// console.log(checkin1.format('DD/MM/YYYY'))
// console.log(checkin1.isBefore(checkin2))
// console.log(checkin1.isAfter(checkin2))
// console.log(checkin1.isFuture())
// console.log(checkin1.isPast())
// console.log(checkin1.isToday())
// console.log(checkin1.toDate())
// console.log(checkin1.isSame(checkin2))
