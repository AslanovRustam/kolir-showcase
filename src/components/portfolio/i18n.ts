// Двомовні i18n-хелпери портфоліо (uk/en), перенесені зі статичного portfolio.html.
import type { Category } from '../../data/cases'

export type FilterKey = 'All' | Category
export type SortKey = 'newest' | 'oldest' | 'az'
export type Locale = 'uk' | 'en'

export const CATEGORIES: FilterKey[] = ['All', 'Branding', 'Web', 'Product', 'Motion', 'Editorial']

const CAT_LABELS_BY: Record<Locale, Record<FilterKey, string>> = {
  uk: {
    All: 'Усі',
    Branding: 'Брендинг',
    Web: 'Веб',
    Product: 'Продукт',
    Motion: 'Моушн',
    Editorial: 'Видавничий',
  },
  en: {
    All: 'All',
    Branding: 'Branding',
    Web: 'Web',
    Product: 'Product',
    Motion: 'Motion',
    Editorial: 'Editorial',
  },
}

export type UIStrings = {
  sortNewest: string
  sortOldest: string
  sortAZ: string
  nothingHere: string
  showAll: string
  galleryLabel: string
  backToPortfolio: string
  otherCases: string
  allWorks: string
  client: string
  year: string
  scope: string
  outcome: string
}

const UI_BY: Record<Locale, UIStrings> = {
  uk: {
    sortNewest: 'Новіші',
    sortOldest: 'Старіші',
    sortAZ: 'А–Я',
    nothingHere: 'Поки що в цій категорії порожньо.',
    showAll: 'Показати все',
    galleryLabel: '[ § ] Галерея',
    backToPortfolio: 'До портфоліо',
    otherCases: 'Інші кейси',
    allWorks: 'Усі роботи ↑',
    client: 'Проєкт',
    year: 'Рік',
    scope: 'Обсяг робіт',
    outcome: 'Результат',
  },
  en: {
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    sortAZ: 'A–Z',
    nothingHere: 'Nothing in this category yet.',
    showAll: 'Show all',
    galleryLabel: '[ § ] Gallery',
    backToPortfolio: 'Back to portfolio',
    otherCases: 'Other cases',
    allWorks: 'All works ↑',
    client: 'Project',
    year: 'Year',
    scope: 'Scope',
    outcome: 'Outcome',
  },
}

export const getUI = (locale: Locale = 'uk'): UIStrings => UI_BY[locale] || UI_BY.uk
export const getCatLabels = (locale: Locale = 'uk') => CAT_LABELS_BY[locale] || CAT_LABELS_BY.uk

export const getSortOptions = (locale: Locale = 'uk'): { key: SortKey; label: string }[] => {
  const u = getUI(locale)
  return [
    { key: 'newest', label: u.sortNewest },
    { key: 'oldest', label: u.sortOldest },
    { key: 'az', label: u.sortAZ },
  ]
}

export function catsLine(categories: Category[], locale: Locale = 'uk'): string {
  const L = getCatLabels(locale)
  return categories.map((c) => L[c] || c).join(' · ')
}
