import { BadRequestError } from '../../errors'

// ✅ Responsabilidade única: representar e validar um UUID v4 imutável
export class UUIDVO {
  // Expressão regular para validar UUIDv4 (mantida privada e imutável)
  private static readonly UUIDV4_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  private readonly value: string

  /**
   * Cria uma nova instância de UUIDVO.
   * Se nenhum UUID for informado, gera um novo automaticamente.
   * @param uuid - UUIDv4 válido ou string em formato URN.
   * @throws BadRequestError se o UUID informado for inválido.
   */
  constructor(uuid?: string) {
    const normalizedUUID = UUIDVO.normalize(uuid) ?? UUIDVO.generate()

    if (!UUIDVO.isValid(normalizedUUID)) {
      throw new BadRequestError(`Invalid UUIDv4 format: "${normalizedUUID}"`)
    }

    this.value = normalizedUUID
  }

  /** 🔒 Retorna o valor encapsulado (imutável) */
  public getValue(): string {
    return this.value
  }

  /**
   * 🔁 Compara este UUID com outro Value Object.
   * @param other - Outro UUIDVO para comparação.
   * @returns true se forem iguais.
   */
  public equals(other?: UUIDVO | null): boolean {
    if (!other) return false
    return other.getValue() === this.value
  }

  /** 🧪 Verifica se o UUID é válido (instância atual) */
  public isValid(): boolean {
    return UUIDVO.isValid(this.value)
  }

  /**
   * ⚙️ Gera um UUIDv4 válido (criptograficamente seguro)
   */
  public static generate(): string {
    // Preferência por crypto API — mais segura e compatível com Node e browser modernos
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID()
    }

    // Fallback manual (não recomendado para produção, mas útil em ambientes limitados)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * 🧩 Valida se um UUIDv4 é válido
   * @param uuid - UUID a ser validado.
   * @returns true se o formato for válido.
   */
  public static isValid(uuid: string): boolean {
    if (!uuid) return false
    return UUIDVO.UUIDV4_REGEX.test(uuid.trim().toLowerCase())
  }

  /**
   * 🧹 Normaliza o UUID removendo prefixos como 'urn:uuid:'
   * e convertendo para minúsculas.
   */
  private static normalize(uuid?: string): string | null {
    if (!uuid) return null
    return uuid.replace(/^urn:uuid:/i, '').trim().toLowerCase()
  }

  /** 🪶 Retorna o UUID como string (para JSON, logs, etc.) */
  public toString(): string {
    return this.value
  }
}


/**
 🧩 Exemplo Prático de Uso
 // Criar novo UUID automaticamente
const id1 = new UUIDVO()
console.log(id1.getValue()) // ex: "b3e1f3b2-45cd-47b5-bb67-91ef3b0f6c27"

// Criar a partir de um UUID existente
const id2 = new UUIDVO('urn:uuid:b3e1f3b2-45cd-47b5-bb67-91ef3b0f6c27')

// Comparar
console.log(id1.equals(id2)) // true

// Serializar
console.log(JSON.stringify({ userId: id1 })) // { "userId": "b3e1f3b2-45cd-47b5-bb67-91ef3b0f6c27" }

// Tentar criar com UUID inválido
try {
  new UUIDVO('invalid-uuid')
} catch (err) {
  console.error(err.message) // Invalid UUIDv4 format: "invalid-uuid"
}

 */
