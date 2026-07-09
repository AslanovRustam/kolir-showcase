import { UK_OVERRIDES } from '../data/cases'
import type { CaseItem, GalleryBlock } from '../data/cases'

/**
 * Returns a Ukrainian-localized view of a case by deep-merging
 * `UK_OVERRIDES[id]` over the English base `CaseItem`.
 *
 * - Flat fields (title/client/teaser/description/scope/results) are replaced
 *   when present in the override.
 * - Nested `gallery` overrides are keyed by block INDEX and merge
 *   caption/heading/body onto the block at that index.
 * - Falls back to the base English value when no override exists.
 *
 * (Transcribed from `localizeWork` in the static portfolio.html; uk only.)
 */
export function localizeCase(work: CaseItem, locale: 'uk' | 'en' = 'uk'): CaseItem {
  // Базові дані кейсів — англійською; UK_OVERRIDES дають українську.
  if (locale === 'en') return work
  const ov = UK_OVERRIDES[work.id]
  if (!ov) return work
  const galleryOv = ov.gallery || {}
  return {
    ...work,
    title: ov.title != null ? ov.title : work.title,
    client: ov.client != null ? ov.client : work.client,
    teaser: ov.teaser != null ? ov.teaser : work.teaser,
    description: ov.description != null ? ov.description : work.description,
    scope: ov.scope != null ? ov.scope : work.scope,
    results: ov.results != null ? ov.results : work.results,
    gallery: work.gallery.map((item, i): GalleryBlock => {
      const o = galleryOv[i]
      if (!o) return item
      const out = { ...item } as GalleryBlock & {
        caption?: string
        heading?: string
        body?: string
        images?: unknown
      }
      if (o.caption !== undefined) out.caption = o.caption
      if (o.heading !== undefined) out.heading = o.heading
      if (o.body !== undefined) out.body = o.body
      // Локалізований набір зображень (інша к-сть/назви бордів на UK) — заміна цілком.
      if (o.images !== undefined && 'images' in out) out.images = o.images
      return out
    }),
  }
}
