export class TimeUtils {
  private constructor() {}

  static isValidTime(timeStr: string): boolean {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(timeStr)
  }

  static formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  static parseTime(timeStr: string): Date | null {
    if (!this.isValidTime(timeStr)) return null
    const [hours, minutes] = timeStr.split(':').map(Number)
    if (hours === undefined || minutes === undefined) return null
    const now = new Date()
    now.setHours(hours, minutes, 0, 0)
    return now
  }

  static addMinutes(date: Date, minutes: number): Date {
    const result = new Date(date)
    result.setMinutes(result.getMinutes() + minutes)
    return result
  }

  static subtractMinutes(date: Date, minutes: number): Date {
    return this.addMinutes(date, -minutes)
  }

  static isSameTime(time1: string, time2: string): boolean {
    return time1 === time2
  }

  /**
   * Calcula a diferença entre duas horas (em minutos).
   */
  static diffInMinutes(date1: Date, date2: Date): number {
    const diffMs = Math.abs(date1.getTime() - date2.getTime())
    return Math.floor(diffMs / 60000)
  }

  /**
   * Converte uma data para hora local com fuso horário.
   */
  static formatTimeInTimeZone(
    date: Date,
    timeZone: string,
    locale = 'pt-BR',
  ): string {
    return date.toLocaleTimeString(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Retorna se um horário está entre dois outros.
   */
  static isTimeBetween(time: Date, start: Date, end: Date): boolean {
    const t = time.getHours() * 60 + time.getMinutes()
    const s = start.getHours() * 60 + start.getMinutes()
    const e = end.getHours() * 60 + end.getMinutes()

    return t >= s && t <= e
  }

  /**
   * Converte minutos para formato "2h 30m"
   */
  static convertMinutesToReadable(min: number): string {
    const hours = Math.floor(min / 60)
    const minutes = min % 60
    return (
      [hours > 0 ? `${hours}h` : '', minutes > 0 ? `${minutes}m` : '']
        .filter(Boolean)
        .join(' ') || '0m'
    )
  }
}
