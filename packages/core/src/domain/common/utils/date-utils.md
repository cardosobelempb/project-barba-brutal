✅ 1. Durações legíveis
Ex: convertMsToReadable(90061000) → "1d 1h 1m 1s"

✅ 2. Verificação de intervalo (isBetween)
Ex: isBetween(data, inicio, fim)

✅ 3. Conversão para texto amigável
Ex: getRelativeTimeFromNow(new Date()) → "agora mesmo", "há 5 minutos", "em 3 dias"

# Exemplos de uso:

```

// Gera um calendário de Abril/2025
const calendar = DateUtils.generateMonthlyCalendar(2025, 3);
console.log(calendar);

// Verifica se 21 de abril de 2025 é feriado
console.log(DateUtils.isHoliday(new Date('2025-04-21'))); // true (Tiradentes)

// Pega 3 semanas a partir de hoje
console.log(DateUtils.generateWeeks(new Date(), 3));

```
