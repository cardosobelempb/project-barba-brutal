// Validação real de CNPJ
export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

  const calcDigit = (length: number) => {
    const numbers = cnpj.slice(0, length).split('').map(Number)
    const multipliers = Array.from({ length }, (_, i) =>
      i < length - 7 ? length - i + 1 : length - i - 7
    )
    const sum = numbers.reduce((acc, num, i) => acc + num * multipliers[i], 0)
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const digit1 = calcDigit(12)
  const digit2 = calcDigit(13)

  return digit1 === Number(cnpj[12]) && digit2 === Number(cnpj[13])
}
