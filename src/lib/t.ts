import dict from './static-i18n.json'

// Перекладач за словником, витягнутим з data-en статики (uk → en).
// Працює і на сервері, і на клієнті (JSON-імпорт). Якщо перекладу нема —
// повертаємо uk-рядок як є.
const map = dict as Record<string, string>

export type Locale = 'uk' | 'en'

export function makeT(locale: Locale) {
  return (uk: string): string => (locale === 'en' ? (map[uk] ?? uk) : uk)
}
