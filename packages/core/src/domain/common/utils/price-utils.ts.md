### 💰 PriceUtils.ts

```
export class PriceUtils {
  // Formata um número como moeda
  static format(
    value: number,
    currency: string = 'BRL',
    locale: string = 'pt-BR'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  }

  // Aplica um desconto percentual
  static applyDiscount(price: number, percent: number): number {
    if (percent < 0 || percent > 100) {
      throw new Error('Percentual de desconto deve estar entre 0 e 100');
    }
    return parseFloat((price * (1 - percent / 100)).toFixed(2));
  }

  // Soma múltiplos preços com precisão
  static sum(...prices: number[]): number {
    return parseFloat(
      prices.reduce((acc, curr) => acc + curr, 0).toFixed(2)
    );
  }

  // Converte preço entre moedas usando uma taxa de câmbio fornecida
  static convert(price: number, rate: number): number {
    if (rate <= 0) {
      throw new Error('Taxa de câmbio inválida');
    }
    return parseFloat((price * rate).toFixed(2));
  }

  // Calcula valor com imposto (ex: 18%)
  static applyTax(price: number, taxPercent: number): number {
    return parseFloat((price * (1 + taxPercent / 100)).toFixed(2));
  }

  // Remove imposto (ex: saber o valor sem os 18% embutidos)
  static removeTax(priceWithTax: number, taxPercent: number): number {
    return parseFloat((priceWithTax / (1 + taxPercent / 100)).toFixed(2));
  }
}

```

### 🧪 Exemplos de uso
```
const preco = 199.99;

console.log('Formatado:', PriceUtils.format(preco)); // R$ 199,99
console.log('Com 20% de desconto:', PriceUtils.applyDiscount(preco, 20)); // 159.99
console.log('Total:', PriceUtils.sum(99.99, 100)); // 199.99
console.log('Convertido para USD (taxa 0.2):', PriceUtils.convert(preco, 0.2)); // 39.99
console.log('Com imposto de 18%:', PriceUtils.applyTax(preco, 18)); // 235.99
console.log('Sem imposto (de R$ 235.99 com 18%):', PriceUtils.removeTax(235.99, 18)); // 199.99

```


### 📦 Instale decimal.js (caso ainda não tenha)

```
npm install decimal.js

```
### 💰 PriceUtils.ts com decimal.js:

```
import Decimal from 'decimal.js';

export class PriceUtils {
  // Formata um número como moeda
  static format(
    value: Decimal.Value,
    currency: string = 'BRL',
    locale: string = 'pt-BR'
  ): string {
    const num = new Decimal(value).toNumber();
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(num);
  }

  // Aplica um desconto percentual
  static applyDiscount(price: Decimal.Value, percent: Decimal.Value): number {
    const result = new Decimal(price).mul(new Decimal(1).minus(new Decimal(percent).div(100)));
    return result.toDecimalPlaces(2).toNumber();
  }

  // Soma múltiplos preços
  static sum(...prices: Decimal.Value[]): number {
    const total = prices.reduce((acc, curr) => acc.plus(curr), new Decimal(0));
    return total.toDecimalPlaces(2).toNumber();
  }

  // Converte entre moedas com uma taxa
  static convert(price: Decimal.Value, rate: Decimal.Value): number {
    const result = new Decimal(price).mul(rate);
    return result.toDecimalPlaces(2).toNumber();
  }

  // Aplica imposto percentual
  static applyTax(price: Decimal.Value, taxPercent: Decimal.Value): number {
    const result = new Decimal(price).mul(new Decimal(1).plus(new Decimal(taxPercent).div(100)));
    return result.toDecimalPlaces(2).toNumber();
  }

  // Remove imposto percentual (ex: de valor com imposto)
  static removeTax(priceWithTax: Decimal.Value, taxPercent: Decimal.Value): number {
    const result = new Decimal(priceWithTax).div(new Decimal(1).plus(new Decimal(taxPercent).div(100)));
    return result.toDecimalPlaces(2).toNumber();
  }
}

```

### 🧪 Exemplo de uso com decimal.js

```
import { PriceUtils } from './PriceUtils';
import Decimal from 'decimal.js';

const preco = new Decimal('199.99');

console.log('Formatado:', PriceUtils.format(preco)); // R$ 199,99
console.log('Com 20% de desconto:', PriceUtils.applyDiscount(preco, 20)); // 159.99
console.log('Soma:', PriceUtils.sum('99.99', '100')); // 199.99
console.log('Convertido para USD (taxa 0.2):', PriceUtils.convert(preco, 0.2)); // 39.99
console.log('Com 18% de imposto:', PriceUtils.applyTax(preco, 18)); // 235.99
console.log('Removendo 18% de imposto de 235.99:', PriceUtils.removeTax(235.99, 18)); // 199.99

```
