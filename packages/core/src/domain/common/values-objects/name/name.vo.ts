import { I18n } from '../../../../interfaces'
import { I18nAbstract } from '../../abstract'
import { BadRequestError } from '../../errors'

interface NameOptions {
  minLength?: number
  maxLength?: number
}

export class NameVO {
  private readonly value: string

  constructor(name: string, options: NameOptions = {}, i18n?: I18nAbstract) {
    const min = options.minLength ?? 2
    const max = options.maxLength ?? 50

    const normalizedName = NameVO.normalize(name)
    NameVO.validate(normalizedName, min, max, i18n)
    this.value = normalizedName
  }

  // Retorna o valor do nome
  public getValue(): string {
    return this.value
  }

  // Compara com outro NameVO
  public equals(other: NameVO): boolean {
    return this.value === other.getValue()
  }

  // Remove espaços duplicados e trim
  private static normalize(name: string): string {
    return name.trim().replace(/\s+/g, ' ')
  }

  // Valida o nome
  private static validate(
    name: string,
    min: number,
    max: number,
    i18n?: I18n,
  ): void {
    const t = i18n?.t.bind(i18n) ?? NameVO.defaultMessages

    if (!name) {
      throw new BadRequestError(t('errors.name.empty'))
    }

    if (name.length < min) {
      throw new BadRequestError(t('errors.name.tooShort', { args: { min } }))
    }

    if (name.length > max) {
      throw new BadRequestError(t('errors.name.tooLong', { args: { max } }))
    }

    const nameParts = name.split(' ')
    if (nameParts.length < 2) {
      throw new BadRequestError(t('errors.name.surnameMissing'))
    }

    const nameRegex = /^[\p{L}\s'-]+$/u
    if (!nameRegex.test(name)) {
      throw new BadRequestError(t('errors.name.invalidChars'))
    }
  }

  // Mensagens de fallback (quando não há i18n)
  private static defaultMessages(
    key: string,
    options?: { args?: Record<string, any> },
  ): string {
    const args = options?.args ?? {}

    const messages: Record<string, Record<string, string>> = {
      'errors.name.empty': {
        en: 'Name cannot be empty.',
        pt: 'O nome não pode estar vazio.',
      },
      'errors.name.tooShort': {
        en: 'Name must be at least {min} characters.',
        pt: 'O nome deve ter pelo menos {min} caracteres.',
      },
      'errors.name.tooLong': {
        en: 'Name must be at most {max} characters.',
        pt: 'O nome deve ter no máximo {max} caracteres.',
      },
      'errors.name.surnameMissing': {
        en: 'Surname is required.',
        pt: 'Sobrenome é obrigatório.',
      },
      'errors.name.invalidChars': {
        en: 'Only letters, spaces, apostrophes, and hyphens are allowed.',
        pt: 'Apenas letras, espaços, apóstrofos e hífens são permitidos.',
      },
    }

    const lang = 'pt' // ou detectar dinamicamente de algum lugar
    const template = messages[key]?.[lang] ?? key

    return template.replace(/\{(\w+)\}/g, (_, k) => args[k] ?? `{${k}}`)
  }
}
