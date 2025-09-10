export class DateUtils {
  private constructor() {}

  static isValidDate(date: string | Date): boolean {
    const d = new Date(date)
    return !isNaN(d.getTime())
  }

  static formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  static formatDateISO(date: Date): string {
    return date.toISOString().split('T')[0] ?? '' // YYYY-MM-DD
  }

  static formatDateUS(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  static parseDate(dateStr: string): Date | null {
    const [day, month, year] = dateStr.split('/')
    if (!day || !month || !year) {
      return null
    }
    const date = new Date(+year, +month - 1, +day)
    return this.isValidDate(date) ? date : null
  }

  static isPast(date: Date): boolean {
    return date.getTime() < new Date().getTime()
  }

  static isFuture(date: Date): boolean {
    return date.getTime() > new Date().getTime()
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  static subtractDays(date: Date, days: number): Date {
    return this.addDays(date, -days)
  }

  /**
   * Retorna a diferença em dias entre duas datas.
   */
  static diffInDays(date1: Date, date2: Date): number {
    const diff = Math.abs(date1.getTime() - date2.getTime())
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  /**
   * Converte a data para uma string com fuso horário específico (ex: "pt-BR", "en-US")
   */
  static formatWithLocale(
    date: Date,
    locale: string = 'pt-BR',
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(options || {}),
    }).format(date)
  }

  /**
   * Retorna a data atual com o fuso horário especificado.
   */
  static nowInTimezone(timeZone: string): string {
    return new Date().toLocaleString('en-US', { timeZone })
  }

  /**
   * Retorna se uma data está entre duas outras.
   */
  static isBetween(date: Date, start: Date, end: Date): boolean {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
  }

  /**
   * Converte milissegundos para duração legível: "1d 2h 30m 10s"
   */
  static convertMsToReadable(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / (1000 * 60)) % 60)
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))

    return [
      days > 0 ? `${days}d` : '',
      hours > 0 ? `${hours}h` : '',
      minutes > 0 ? `${minutes}m` : '',
      seconds > 0 ? `${seconds}s` : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  /**
   * Retorna uma string amigável da diferença da data em relação ao agora.
   * Ex: "há 3 minutos", "em 2 dias"
   */
  static getRelativeTimeFromNow(date: Date, locale = 'pt-BR'): string {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const absDiff = Math.abs(diff)

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
      ['second', 1000],
      ['minute', 1000 * 60],
      ['hour', 1000 * 60 * 60],
      ['day', 1000 * 60 * 60 * 24],
      ['week', 1000 * 60 * 60 * 24 * 7],
      ['month', 1000 * 60 * 60 * 24 * 30],
      ['year', 1000 * 60 * 60 * 24 * 365],
    ]

    for (let i = units.length - 1; i >= 0; i--) {
      const unitEntry = units[i]
      if (!unitEntry) continue
      const [unit, msInUnit] = unitEntry
      const delta = diff / msInUnit

      if (Math.abs(delta) >= 1) {
        return rtf.format(Math.round(delta), unit)
      }
    }

    return rtf.format(0, 'second')
  }

  /**
   * Gera uma matriz representando um calendário mensal.
   * Cada semana é um array de 7 datas.
   */
  static generateMonthlyCalendar(
    year: number,
    month: number,
    startOnMonday = false,
  ): Date[][] {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const calendar: Date[][] = []
    let week: Date[] = []

    const firstWeekday = (firstDay.getDay() + (startOnMonday ? 6 : 0)) % 7
    for (let i = 0; i < firstWeekday; i++) {
      week.push(new Date(NaN)) // vazio
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day)
      week.push(date)
      if (week.length === 7) {
        calendar.push(week)
        week = []
      }
    }

    if (week.length) {
      while (week.length < 7) {
        week.push(new Date(NaN)) // vazio
      }
      calendar.push(week)
    }

    return calendar
  }

  /**
   * Gera uma lista de semanas a partir de uma data base.
   */
  static generateWeeks(startDate: Date, numberOfWeeks: number): Date[][] {
    const weeks: Date[][] = []
    const start = new Date(startDate)
    start.setDate(start.getDate() - start.getDay()) // começa no domingo

    for (let i = 0; i < numberOfWeeks; i++) {
      const week: Date[] = []
      for (let d = 0; d < 7; d++) {
        week.push(new Date(start))
        start.setDate(start.getDate() + 1)
      }
      weeks.push(week)
    }

    return weeks
  }

  /**
   * Retorna a lista de feriados nacionais fixos e móveis (BR).
   */
  static getBrazilianHolidays(year: number): Date[] {
    const holidays: Date[] = []

    // Feriados fixos
    holidays.push(new Date(year, 0, 1)) // Confraternização Universal
    holidays.push(new Date(year, 3, 21)) // Tiradentes
    holidays.push(new Date(year, 4, 1)) // Dia do Trabalhador
    holidays.push(new Date(year, 8, 7)) // Independência
    holidays.push(new Date(year, 9, 12)) // Nossa Senhora Aparecida
    holidays.push(new Date(year, 10, 2)) // Finados
    holidays.push(new Date(year, 10, 15)) // Proclamação da República
    holidays.push(new Date(year, 11, 25)) // Natal

    // Feriados móveis
    const easter = this.calculateEaster(year)
    const carnival = new Date(easter)
    carnival.setDate(easter.getDate() - 47)
    const corpusChristi = new Date(easter)
    corpusChristi.setDate(easter.getDate() + 60)
    const goodFriday = new Date(easter)
    goodFriday.setDate(easter.getDate() - 2)

    holidays.push(carnival)
    holidays.push(goodFriday)
    holidays.push(easter)
    holidays.push(corpusChristi)

    return holidays
  }

  /**
   * Cálculo da data da Páscoa (algoritmo de Gauss).
   */
  static calculateEaster(year: number): Date {
    const f = Math.floor
    const G = year % 19
    const C = f(year / 100)
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30
    const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11))
    const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7
    const L = I - J
    const month = 3 + f((L + 40) / 44) - 1
    const day = L + 28 - 31 * f(month / 4)
    return new Date(year, month, day)
  }

  /**
   * Verifica se a data é feriado nacional no Brasil.
   */
  static isHoliday(date: Date): boolean {
    const holidays = this.getBrazilianHolidays(date.getFullYear())
    return holidays.some(h => this.isSameDay(h, date))
  }

  static formatDateForBlog(dateString: string, prefix?: string): string {
    const date = new Date(dateString)

    // Formata para DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Meses são base 0
    const year = date.getFullYear()

    const formattedDate = `${day}/${month}/${year}`

    // Retorna com prefixo se existir
    return prefix ? `${prefix} ${formattedDate}` : formattedDate
  }
}
