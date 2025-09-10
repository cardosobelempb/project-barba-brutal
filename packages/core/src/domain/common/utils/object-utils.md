# Exemplos de uso:
```
// Clonando profundamente
const user = { name: 'Ana', contact: { email: 'ana@email.com' } };
const clone = ObjectUtils.deepClone(user);

// Verificando se está vazio
ObjectUtils.isEmpty({}); // true
ObjectUtils.isEmpty([]); // true

// Merge profundo
const base = { config: { theme: 'light', lang: 'en' } };
const override = { config: { lang: 'pt' } };
const merged = ObjectUtils.mergeDeep(base, override);
console.log(merged); // { config: { theme: 'light', lang: 'pt' } }

```
