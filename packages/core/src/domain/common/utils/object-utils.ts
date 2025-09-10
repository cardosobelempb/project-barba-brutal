export class ObjectUtils {
  private constructor() {}

  /**
   * Remove referências de protótipos e funções, deixando apenas dados JSON-compatíveis.
   */
  static convertToPlainObject<T>(value: T): T {
    return JSON.parse(JSON.stringify(value))
  }

  /**
   * Faz uma cópia profunda do objeto.
   */
  static deepClone<T>(value: T): T {
    return this.convertToPlainObject(value)
  }

  /**
   * Verifica se o valor é um objeto não nulo.
   */
  static isObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  }

  /**
   * Verifica se o objeto está vazio (não possui chaves próprias).
   */
  static isEmpty(value: any): boolean {
    if (value == null) return true
    if (Array.isArray(value)) return value.length === 0
    if (this.isObject(value)) return Object.keys(value).length === 0
    return false
  }

  /**
   * Faz merge profundo de dois objetos.
   */
  static mergeDeep<T>(target: T, source: Partial<T>): T {
    if (!this.isObject(target) || !this.isObject(source)) {
      return source as T
    }

    const result = { ...target } as Record<string, any>

    for (const key in source) {
      if (this.isObject(source[key])) {
        if (!result[key]) {
          result[key] = {}
        }
        result[key] = this.mergeDeep(result[key], source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result as T
  }
}

/*
Exemplos de uso:
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

 */
