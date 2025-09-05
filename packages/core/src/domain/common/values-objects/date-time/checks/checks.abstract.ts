import dayjs, { Dayjs } from 'dayjs'

export abstract class ChecksAbstract {
  protected readonly value: Dayjs

  protected constructor(input: Date | string | Dayjs) {
    const parsed = dayjs(input)

    if (!parsed.isValid()) {
      throw new Error('Data inválida.')
    }

    this.value = parsed.startOf('day')
  }

  public isSame(other: ChecksAbstract): boolean {
    return this.value.isSame(other.value, 'day')
  }

  public isBefore(other: ChecksAbstract): boolean {
    return this.value.isBefore(other.value, 'day')
  }

  public isAfter(other: ChecksAbstract): boolean {
    return this.value.isAfter(other.value, 'day')
  }

  public toDate(): Date {
    return this.value.toDate()
  }

  public format(format: string = 'YYYY-MM-DD'): string {
    return this.value.format(format)
  }
}
