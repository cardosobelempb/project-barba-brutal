# 🎯 Novos Métodos Explicados:
1. formatCurrency:

Recebe um número e o formata como uma moeda de acordo com a localidade e a moeda fornecida.
Exemplo: 1234.56 → "R$ 1.234,56" (em português brasileiro).

2. roundToDecimalPlaces:

Arredonda um número para o número especificado de casas decimais.
Exemplo: 2.345 com 2 casas decimais → 2.35.

3. parseCurrency:

Converte uma string de moeda (ex: "R$ 1.234,56") de volta para um número.
Exemplo: "R$ 1.234,56" → 1234.56.

4. formatPercentage:

Formata um número como percentual (multiplicando o número por 100 e adicionando %).
Exemplo: 0.1234 → "12.34%".

5. formatPhoneNumber:

Formata um número de telefone no formato (XX) XXXXX-XXXX (Brasil).
Exemplo: 1234567890 → (12) 34567-8901.

6. calculateTax:

Calcula o valor do imposto sobre um valor (ex: 100 com 15% → 15).
Exemplo: 100 com 15% → 15.

7. isPositive:

Verifica se um número é positivo.
Exemplo: 2 → true, -2 → false.

8. isNegative:

Verifica se um número é negativo.
Exemplo: -2 → true, 2 → false.

9. isInteger:

Verifica se o número é inteiro.
Exemplo: 2 → true, 2.5 → false.

# 🧑‍💻 Como usar:

```
import { NumberUtils } from './NumberUtils';

// Formatar número com duas casas decimais
console.log(NumberUtils.formatNumberWithDecimal(123.4)); // "123.40"

// Formatar como moeda
console.log(NumberUtils.formatCurrency(1234.56)); // "R$ 1.234,56"

// Arredondar para 2 casas decimais
console.log(NumberUtils.roundToDecimalPlaces(2.345, 2)); // 2.35

// Converter de moeda para número
console.log(NumberUtils.parseCurrency("R$ 1.234,56")); // 1234.56

// Formatar como percentual
console.log(NumberUtils.formatPercentage(0.1234)); // "12.34%"

// Formatar número de telefone
console.log(NumberUtils.formatPhoneNumber("1234567890")); // "(12) 34567-8901"

// Calcular imposto
console.log(NumberUtils.calculateTax(100, 15)); // 15

// Verificar se o número é positivo
console.log(NumberUtils.isPositive(10)); // true
console.log(NumberUtils.isPositive(-10)); // false

// Verificar se o número é negativo
console.log(NumberUtils.isNegative(-10)); // true
console.log(NumberUtils.isNegative(10)); // false

// Verificar se o número é inteiro
console.log(NumberUtils.isInteger(10)); // true
console.log(NumberUtils.isInteger(10.5)); // false

```
