export abstract class AbstractScheduled {
  protected abstract date: unknown

  /** Retorna a data no formato YYYY-MM-DD HH:mm */
  abstract toString(): string

  /** Retorna o valor bruto da data (Date, Dayjs, etc.) */
  abstract getValue(): unknown

  /** Verifica se a data está dentro de um intervalo de agendamento permitido */
  abstract isValid(): boolean

  /** Validações genéricas: data deve ser futura mas não muito distante */
  protected isValidSchedule(dateTimestamp: number, now: number): boolean {
    const oneYearAhead = now + 1000 * 60 * 60 * 24 * 365
    return dateTimestamp >= now && dateTimestamp <= oneYearAhead
  }
}
