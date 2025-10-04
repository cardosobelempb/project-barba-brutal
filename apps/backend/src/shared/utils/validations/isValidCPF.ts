// Validação real de CPF
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

  const calcDigit = (factor: number) =>
    cpf
      .substring(0, factor - 1)
      .split('')
      .reduce((acc, digit, index) => acc + Number(digit) * (factor - index), 0)

  const digit1 = (calcDigit(10) * 10) % 11 % 10
  const digit2 = (calcDigit(11) * 10) % 11 % 10

  return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10])
}


