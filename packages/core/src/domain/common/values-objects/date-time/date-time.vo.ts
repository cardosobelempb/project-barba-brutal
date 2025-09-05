import { DATEVO } from './date.vo'
import { TIMEVO } from './time.vo'

export class DateTimeVO {
  private readonly dateVO: DATEVO
  private readonly timeVO: TIMEVO

  constructor(date: string, time: string) {
    this.dateVO = new DATEVO(date)
    this.timeVO = new TIMEVO(time)
  }

  public getISO(): string {
    const date = this.dateVO.getValue() // YYYY-MM-DD
    const time = this.timeVO.getValue() // HH:mm
    return `${date}T${time}:00` // ISO format: YYYY-MM-DDTHH:mm:00
  }

  public getDate(): Date {
    return new Date(this.getISO())
  }

  public getDateValue(): string {
    return this.dateVO.getValue()
  }

  public getTimeValue(): string {
    return this.timeVO.getValue()
  }
}
