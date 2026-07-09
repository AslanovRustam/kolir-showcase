import Link from 'next/link'
import type { CaseItem } from '../../data/cases'
import Cover from './Cover'
import { catsLine, type Locale } from './i18n'

export default function WorkCard({
  work,
  index,
  locale = 'uk',
}: {
  work: CaseItem
  index: number
  locale?: Locale
}) {
  const catsLocalized = catsLine(work.categories, locale)
  return (
    <Link
      href={`/portfolio/${work.id}`}
      className="group block text-left reveal w-full"
      style={{ transitionDelay: `${Math.min(index, 7) * 40}ms` }}
    >
      <div className="relative w-full aspect-[5/4] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 card-hover">
          <Cover work={work} />
        </div>
        <div className="absolute top-2 right-2 arrow-pop">
          <span className="inline-flex w-7 h-7 rounded-full bg-white text-plum items-center justify-center text-xs group-hover:bg-sun">
            ↗
          </span>
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2 mt-3">
        <div className="font-sans font-medium text-[18px] leading-tight text-white truncate">
          {work.title}
        </div>
        <div className="font-sans font-normal text-[15px] text-white/40 shrink-0">
          {work.year}
        </div>
      </div>
      <div className="mt-1.5 font-sans font-normal text-[15px] text-white/40">
        {catsLocalized}
      </div>
    </Link>
  )
}
