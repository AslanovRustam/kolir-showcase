'use client'

import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, type FilterKey, type SortKey } from './i18n'

export default function Filters({
  filter,
  setFilter,
  sort,
  setSort,
  catLabels,
  sortOptions,
}: {
  filter: FilterKey
  setFilter: (f: FilterKey) => void
  sort: SortKey
  setSort: (s: SortKey) => void
  total?: number
  displayed?: number
  catLabels: Record<FilterKey, string>
  sortOptions: { key: SortKey; label: string }[]
}) {
  const [openF, setOpenF] = useState(false)
  const [openS, setOpenS] = useState(false)
  const currentSort = sortOptions.find((o) => o.key === sort) || sortOptions[0]
  const currentFilterLabel = catLabels[filter] || filter
  const fRef = useRef<HTMLDivElement>(null)
  const sRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (fRef.current && !fRef.current.contains(e.target as Node)) setOpenF(false)
      if (sRef.current && !sRef.current.contains(e.target as Node)) setOpenS(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])
  const trigCls =
    'flex items-center gap-2 h-[36px] px-3.5 rounded-full bg-ink text-white text-[15px] font-sans transition'
  const menuCls =
    'absolute mt-2 min-w-[190px] bg-grape border border-white/10 rounded-xl shadow-xl overflow-hidden z-30'
  const itemCls = (on: boolean) =>
    `block w-full text-left px-3 py-2 text-[14px] hover:bg-white/5 transition ${on ? 'text-sun' : ''}`
  return (
    <div className="flex items-center justify-between gap-3 sticky z-20 backdrop-blur-[8px] bg-white/[0.05] border border-white/[0.14] px-2 py-1.5 rounded-full">
      {/* Фільтр — дропдаун з іконкою-воронкою (зліва) */}
      <div className="relative" ref={fRef}>
        <button
          onClick={() => {
            setOpenF((v) => !v)
            setOpenS(false)
          }}
          className={trigCls}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 5h18l-7 8.2V20l-4 2v-8.8L3 5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{currentFilterLabel}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform ${openF ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {openF && (
          <div className={`${menuCls} left-0`}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setFilter(c)
                  setOpenF(false)
                }}
                className={itemCls(filter === c)}
              >
                {catLabels[c]}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Сортування — дропдаун з іконкою (справа) */}
      <div className="relative" ref={sRef}>
        <button
          onClick={() => {
            setOpenS((v) => !v)
            setOpenF(false)
          }}
          className={trigCls}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 6h11M3 12h8M3 18h5M18 6v12m0 0l-3.2-3.2M18 18l3.2-3.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{currentSort.label}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform ${openS ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {openS && (
          <div className={`${menuCls} right-0`}>
            {sortOptions.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  setSort(o.key)
                  setOpenS(false)
                }}
                className={itemCls(sort === o.key)}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
