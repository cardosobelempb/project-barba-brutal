import { SupportedLocales } from './types'
import { localeContent } from './index'

export class I18nRoot {
  constructor(private locale: SupportedLocales = 'pt') {
    this.locale = locale
  }

  setLocale(locale: SupportedLocales) {
    this.locale = locale
  }

  get messages() {
    return localeContent[this.locale].messages
  }

  get placeholders() {
    return localeContent[this.locale].placeholders
  }

  get titles() {
    return localeContent[this.locale].titles
  }

  get descriptions() {
    return localeContent[this.locale].descriptions
  }

  get buttons() {
    return localeContent[this.locale].buttons
  }

  get errors() {
    return localeContent[this.locale].errors
  }

  get labels() {
    return localeContent[this.locale].labels
  }

  get httpErrors() {
    return localeContent[this.locale].httpErrors
  }

  getHttpErrorMessage(statusCode: number): string {
    return (
      this.httpErrors[statusCode] || this.errors.unknown // fallback genérico
    )
  }
}

export const i18n = new I18nRoot()
console.log(i18n.errors.duplicateCheckin)
