// Визначає, для яких локалей у кейса є картинки, і фільтрує видимість.
// Карта uk/en предвичислюється на білді (scripts/gen-case-locales.ts сканує public/images)
// і лежить у case-locales.json. Рантайм читає лише JSON — без fs-сканування public,
// інакше Next.js тягне всю папку public у serverless-функцію (сотні МБ).
// Додав/прибрав локалізовану папку → перезапусти `npm run gen:case-locales`.
import { CASES, type CaseItem } from '../data/cases'
import caseLocaleMap from '../data/case-locales.json'

const MAP = caseLocaleMap as Record<string, { uk: boolean; en: boolean }>

// Явні перевизначення видимості для кейсів без локалізованих папок (один набір
// картинок, але показувати лише на одній мові). undefined = не чіпаємо.
const FORCE_LOCALES: Record<string, Partial<{ uk: boolean; en: boolean }>> = {
  ctendo: { uk: false },          // Ctendo Group — лише EN
  'wirex-brand': { uk: false, en: false }, // Wirex 2026 — приховано повністю
  'wirex-banners': { uk: false }, // Wirex Campaigns — лише EN
}

function computeLocales(work: CaseItem): { uk: boolean; en: boolean } {
  // Невідомий кейс (немає в згенерованій карті) — показуємо на обох локалях.
  return MAP[(work as { id: string }).id] ?? { uk: true, en: true }
}

/** Which locales the case has images for. No {lang} → language-neutral → both. */
export function caseLocales(work: CaseItem): { uk: boolean; en: boolean } {
  const base = computeLocales(work)
  const force = FORCE_LOCALES[(work as { id: string }).id]
  return force ? { uk: force.uk ?? base.uk, en: force.en ?? base.en } : base
}

export function isCaseVisible(work: CaseItem, locale: 'uk' | 'en'): boolean {
  return caseLocales(work)[locale === 'en' ? 'en' : 'uk']
}

/** Ids of cases visible on the given locale (for the listing). */
export function allowedCaseIds(locale: 'uk' | 'en'): string[] {
  return CASES.filter((c) => isCaseVisible(c, locale)).map((c) => c.id)
}
