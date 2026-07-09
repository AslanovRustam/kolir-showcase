'use client'

import { useEffect, useMemo, useState } from 'react'
import { CASES } from '../../data/cases'
import { localizeCase } from '../../lib/localizeCase'
import Filters from './Filters'
import WorkCard from './WorkCard'
import { getUI, getCatLabels, getSortOptions, type FilterKey, type SortKey } from './i18n'

export default function PortfolioListing({
  locale = 'uk',
  allowedIds,
}: {
  locale?: 'uk' | 'en'
  /** Ids видимих на цій локалі кейсів (рахується на сервері по наявності картинок). */
  allowedIds?: string[]
}) {
  const [filter, setFilter] = useState<FilterKey>('All')
  const [sort, setSort] = useState<SortKey>('newest')

  const localizedAll = useMemo(() => {
    const src = allowedIds ? CASES.filter((w) => allowedIds.includes(w.id)) : CASES
    return src.map((w) => localizeCase(w, locale))
  }, [locale, allowedIds])
  const UI = getUI(locale)
  const catLabels = getCatLabels(locale)
  const sortOptions = getSortOptions(locale)

  const filtered = useMemo(() => {
    const list =
      filter === 'All'
        ? [...localizedAll]
        : localizedAll.filter((w) => w.categories.includes(filter))
    if (sort === 'newest') list.sort((a, b) => b.year - a.year)
    else if (sort === 'oldest') list.sort((a, b) => a.year - b.year)
    else if (sort === 'az')
      list.sort((a, b) => String(a.title).localeCompare(String(b.title), 'uk'))
    return list
  }, [filter, sort, localizedAll])

  // Reveal-on-scroll. Залежить від `filtered`: при зміні локалі/фільтра/сортування
  // набір карток змінюється, тож ефект перезапускається. Картки, що ВЖЕ у вьюпорті,
  // проявляємо СИНХРОННО (не чекаємо асинхронний колбек обсервера) — інакше при
  // клієнтському перемиканні мови нові/перемонтовані картки лишались прозорими
  // «дірками». Решту (нижче згину) довідкривають обсервером на скролі.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    }
    els.forEach((el) => {
      if (inView(el)) el.classList.add('in')
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 },
    )
    els.forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el)
    })
    return () => io.disconnect()
  }, [filtered])

  return (
    <div className="min-h-screen pt-[7.5rem] md:pt-[12rem] pb-12">
      {/* Контент = 120u по центру (як хедер/футер сайту), гатери 4u — як у статиці */}
      <div
        style={{
          width: 'min(calc(160 * var(--u)), calc(100% - calc(4 * var(--u))))',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Filters
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          total={CASES.length}
          displayed={filtered.length}
          catLabels={catLabels}
          sortOptions={sortOptions}
        />

        <div className="mt-6">
          {filtered.length === 0 ? (
            <div className="py-20 text-center font-sans text-[14px] text-white/40">
              {UI.nothingHere}{' '}
              <button
                onClick={() => setFilter('All')}
                className="text-sun hover:underline"
              >
                {UI.showAll}
              </button>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {filtered.map((w, i) => (
                <WorkCard key={w.id} work={w} index={i} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
