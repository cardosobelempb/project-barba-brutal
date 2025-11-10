import { BadRequestError } from '../../errors'

/**
 * ✅ Value Object responsável por representar e validar um Slug.
 * Garante imutabilidade, padronização e formato seguro para URLs.
 */
export class SlugVO {
  private static readonly MIN_LENGTH = 3
  private static readonly MAX_LENGTH = 100
  private static readonly SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  private readonly value: string

  /** 🔒 Construtor privado: use os métodos de fábrica `create` ou `createFromText`. */
  private constructor(value: string) {
    this.value = value
  }

  // ===============================
  // 🚀 MÉTODOS DE FÁBRICA
  // ===============================

  /**
   * Cria um Slug a partir de uma string **já formatada**.
   * @throws BadRequestError se o slug for inválido.
   */
  public static create(value: string): SlugVO {
    const normalized = value?.trim().toLowerCase()

    if (!SlugVO.isValid(normalized)) {
      throw new BadRequestError(`Invalid slug format: "${value}"`)
    }

    return new SlugVO(normalized)
  }

  /**
   * Gera um Slug a partir de um texto bruto (ex: título, nome, etc).
   * @throws BadRequestError se o resultado não atender aos critérios.
   */
  public static createFromText(text: string): SlugVO {
    if (!text || text.trim().length === 0) {
      throw new BadRequestError('Slug source text cannot be empty.')
    }

    // 🧹 Normalização Unicode (remove acentos e diacríticos)
    let slugText = text
      .normalize('NFD') // compatível com mais idiomas
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // troca espaços por hífen
      .replace(/[^\w-]+/g, '') // remove símbolos
      .replace(/_/g, '-') // substitui underscores
      .replace(/--+/g, '-') // evita múltiplos hífens
      .replace(/^-+|-+$/g, '') // remove hífens nas bordas

    // 🔎 Regras de tamanho
    if (slugText.length < SlugVO.MIN_LENGTH) {
      throw new BadRequestError(
        `Slug must be at least ${SlugVO.MIN_LENGTH} characters.`
      )
    }

    if (slugText.length > SlugVO.MAX_LENGTH) {
      throw new BadRequestError(
        `Slug must be less than ${SlugVO.MAX_LENGTH} characters.`
      )
    }

    return new SlugVO(slugText)
  }

  // ===============================
  // 🧩 MÉTODOS DE INSTÂNCIA
  // ===============================

  /** Retorna o valor encapsulado (imutável). */
  public getValue(): string {
    return this.value
  }

  /** Compara se dois SlugVO representam o mesmo valor. */
  public equals(other?: SlugVO | null): boolean {
    if (!other) return false
    return this.value === other.value
  }

  /** Representação de string (para logs, JSON, etc). */
  public toString(): string {
    return this.value
  }

  // ===============================
  // 🧪 MÉTODOS ESTÁTICOS DE VALIDAÇÃO
  // ===============================

  /** Verifica se o slug informado é válido. */
  public static isValid(value: string): boolean {
    if (!value) return false
    return (
      value.length >= SlugVO.MIN_LENGTH &&
      value.length <= SlugVO.MAX_LENGTH &&
      SlugVO.SLUG_REGEX.test(value)
    )
  }
}

/**
 🧪 Exemplo Prático de Uso
const slug1 = SlugVO.createFromText('Curso de TypeScript Avançado!')
console.log(slug1.getValue()) // 'curso-de-typescript-avancado'

const slug2 = SlugVO.create('curso-de-typescript-avancado')
console.log(slug1.equals(slug2)) // true

// Exemplo de erro
try {
  SlugVO.createFromText('a!')
} catch (err) {
  console.error(err.message)
  // Slug must be at least 3 characters.
}

 */
