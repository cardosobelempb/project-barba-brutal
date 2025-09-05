import pt from './pt'
import en from './en'
import { SupportedLocales, LocaleContentType } from './types'
import { I18nRoot, i18n } from './i18n.root'

export const localeContent: Record<SupportedLocales, LocaleContentType> = {
  pt,
  en,
}
export { I18nRoot, i18n }
