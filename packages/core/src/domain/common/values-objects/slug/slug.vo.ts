import { BadRequestError } from '../../errors'

export class SlugVO {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): SlugVO {
    return new SlugVO(value)
  }

  static createFromText(text: string): SlugVO {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    if (!slugText || slugText.length < 3) {
      throw new BadRequestError('Slug must be at least 3 characters.')
    }

    if (slugText.length > 100) {
      throw new BadRequestError('Slug must be less than 100 characters.')
    }

    return new SlugVO(slugText)
  }

  public getValue(): string {
    return this.value
  }
}
