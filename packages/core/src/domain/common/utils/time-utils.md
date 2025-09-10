# 🧪 Exemplos rápidos:
```
import { DateUtils } from './DateUtils';
import { TimeUtils } from './TimeUtils';
console.log(DateUtils.formatDate(new Date())); // ex: "23/04/2025"
console.log(DateUtils.isPast(new Date("2022-01-01"))); // true
console.log(TimeUtils.isValidTime("13:45")); // true
console.log(TimeUtils.formatTime(new Date())); // ex: "09:30"
console.log(DateUtils.diffInDays(new Date("2025-01-01"), new Date("2025-01-10"))); // 9
console.log(DateUtils.formatWithLocale(new Date(), "en-US")); // 04/23/2025
console.log(TimeUtils.diffInMinutes(new Date("2025-04-23T10:00"), new Date("2025-04-23T11:00"))); // 60
console.log(TimeUtils.formatTimeInTimeZone(new Date(), "America/Sao_Paulo")); // ex: "10:30"
console.log(DateUtils.isBetween(new Date("2025-05-01"), new Date("2025-04-01"), new Date("2025-06-01"))); // true
console.log(DateUtils.convertMsToReadable(90061000)); // "1d 1h 1m 1s"
console.log(DateUtils.getRelativeTimeFromNow(new Date(Date.now() + 3600000))); // "em 1 hora"
console.log(TimeUtils.convertMinutesToReadable(150)); // "2h 30m"

```
