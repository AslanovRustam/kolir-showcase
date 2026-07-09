'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CASES } from '../../data/cases'
import type {
  CaseItem,
  GalleryImage,
  LocalBlock,
  VideoBlock,
} from '../../data/cases'
import { localizeCase } from '../../lib/localizeCase'
import WorkCard from './WorkCard'
import { getUI, catsLine, type Locale, type UIStrings } from './i18n'

// Дані кейсів зберігають шляхи як `images/...` (без слешу) — у Next вони лежать
// у /public/images, тож для відносних шляхів додаємо ведучий «/».
const asset = (s: string) => (s && !/^(https?:)?\/\//.test(s) && !s.startsWith('/') ? '/' + s : s)

/* ===================== Gallery sub-renderers ===================== */

function GalleryFigure({ item }: { item: LocalBlock | VideoBlock }) {
  if (item.type === 'local') {
    return (
      <figure className="col-span-12 reveal">
        <div className="relative w-full rounded-2xl overflow-hidden bg-grape text-center">
          <img
            src={asset(item.src)}
            alt={item.caption || ''}
            className="block max-w-full h-auto mx-auto"
            loading="lazy"
          />
        </div>
        <figcaption className="mt-3 font-sans text-[14px] text-white/40">
          {item.caption}
        </figcaption>
      </figure>
    )
  }

  // video
  return (
    <figure className="col-span-12 reveal">
      <div className="relative w-full rounded-2xl overflow-hidden bg-grape text-center">
        <video
          className="block max-w-full h-auto mx-auto"
          controls
          playsInline
          preload="metadata"
          poster={asset(item.poster)}
        >
          <source src={asset(item.src)} type="video/mp4" />
        </video>
        <div className="absolute top-3 left-3 font-mono text-[10.5px] uppercase tracking-[0.22em] bg-ink/70 text-sun rounded-full px-3 py-1.5 pointer-events-none">
          ▶ Film
        </div>
      </div>
      <figcaption className="mt-3 font-sans text-[14px] text-white/40">
        {item.caption}
      </figcaption>
    </figure>
  )
}

function Slider({ images }: { images: GalleryImage[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const scrollTo = (i: number) => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
  }
  const onScroll = () => {
    const el = ref.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== idx) setIdx(i)
  }
  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={onScroll}
        className="overflow-x-auto snap-x snap-mandatory no-scrollbar flex rounded-2xl bg-grape"
      >
        {images.map((img, i) => (
          <div key={i} className="snap-center shrink-0 w-full text-center">
            <img
              src={asset(img.src)}
              alt=""
              className="block max-w-full max-h-[700px] h-auto w-auto mx-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {idx > 0 && (
        <button
          onClick={() => scrollTo(idx - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 backdrop-blur text-white hover:bg-sun hover:text-plum transition flex items-center justify-center"
        >
          ←
        </button>
      )}
      {idx < images.length - 1 && (
        <button
          onClick={() => scrollTo(idx + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 backdrop-blur text-white hover:bg-sun hover:text-plum transition flex items-center justify-center"
        >
          →
        </button>
      )}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-6 bg-sun' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Strip any row-span tokens — rows auto-size to image's natural aspect, no cropping
const colsOnly = (s?: string) =>
  (s || '').replace(/\b(md:|sm:|lg:|xl:|2xl:)?row-span-\d+\b/g, '').trim()

/* ===================== Meta (sidebar / modal body) ===================== */

function CaseMeta({ work, ui: UI, locale }: { work: CaseItem; ui: UIStrings; locale: Locale }) {
  const catsLocalized = catsLine(work.categories, locale)
  return (
    <>
      <div className="font-sans text-[16px] text-white/40">{catsLocalized}</div>
      <h1 className="mt-3 font-sans font-medium leading-[1.05] text-3xl lg:text-4xl xl:text-[44px] text-white">
        {work.title.split(' ')[0]}
        <span className="text-sun"> {work.title.split(' ').slice(1).join(' ')}</span>
      </h1>
      <p className="mt-4 font-sans font-normal text-white/80 text-[15px] leading-[1.6]">
        {work.description}
      </p>

      <dl className="mt-5 border-t border-white/10 divide-y divide-white/10">
        <div className="grid grid-cols-3 gap-3 py-2.5">
          <dt className="font-sans text-[14px] text-white/40">{UI.client}</dt>
          <dd className="col-span-2 font-sans text-[14px] leading-snug">{work.client}</dd>
        </div>
        <div className="grid grid-cols-3 gap-3 py-2.5">
          <dt className="font-sans text-[14px] text-white/40">{UI.year}</dt>
          <dd className="col-span-2 font-sans text-[14px]">{work.year}</dd>
        </div>
        <div className="grid grid-cols-3 gap-3 py-2.5">
          <dt className="font-sans text-[14px] text-white/40">{UI.scope}</dt>
          <dd className="col-span-2 font-sans text-[14px] leading-snug space-y-0.5">
            {work.scope.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </dd>
        </div>
        {work.results && (
          <div className="grid grid-cols-3 gap-3 py-2.5">
            <dt className="font-sans text-[14px] text-white/40">{UI.outcome}</dt>
            <dd className="col-span-2 font-sans text-[14px] leading-snug space-y-1">
              {work.results.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-sun shrink-0">+</span>
                  <span>{r}</span>
                </div>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </>
  )
}

/* ===================== Nav controls (back + prev/next/close) ===================== */

function BackLink({ label }: { label: string }) {
  return (
    <Link href="/portfolio" className="flex items-center gap-2 text-sm hover:text-sun transition">
      <span className="inline-flex w-9 h-9 rounded-full border border-white/20 items-center justify-center shrink-0">
        ←
      </span>
      <span className="font-sans text-[14px] text-white/70">{label}</span>
    </Link>
  )
}

function NavControls({ prevId, nextId }: { prevId: string; nextId: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link
        href={`/portfolio/${prevId}`}
        aria-label="Previous"
        className="inline-flex w-9 h-9 rounded-full border border-white/20 items-center justify-center hover:border-sun hover:text-sun transition"
      >
        ←
      </Link>
      <Link
        href={`/portfolio/${nextId}`}
        aria-label="Next"
        className="inline-flex w-9 h-9 rounded-full border border-white/20 items-center justify-center hover:border-sun hover:text-sun transition"
      >
        →
      </Link>
      <Link
        href="/portfolio"
        aria-label="Close"
        className="ml-1 inline-flex w-9 h-9 rounded-full bg-sun text-plum items-center justify-center text-base hover:bg-sunbright transition"
      >
        ×
      </Link>
    </div>
  )
}

/* ===================== Detail ===================== */

export default function CaseDetail({
  work: rawWork,
  locale = 'uk',
}: {
  work: CaseItem
  locale?: 'uk' | 'en'
}) {
  const work = localizeCase(rawWork, locale)
  // Locale-aware media: paths may carry a `{lang}` token (e.g. localized image
  // folders ua/ vs en/). uk → 'ua', en → 'en'. No-op when the token is absent.
  const mediaLang = locale === 'en' ? 'en' : 'ua'
  const lAsset = (s: string) => asset(s.replace('{lang}', mediaLang))
  const UI = getUI(locale)
  const catsLocalized = catsLine(work.categories, locale)
  const [infoOpen, setInfoOpen] = useState(false)

  // next / prev by index in CASES, wrapping.
  const idx = CASES.findIndex((w) => w.id === rawWork.id)
  const nextId = CASES[(idx + 1) % CASES.length].id
  const prevId = CASES[(idx - 1 + CASES.length) % CASES.length].id

  // "other cases" — 3 інших кейси (рівно на 1 ряд по 3 колонки, без переносу).
  const others = CASES.filter((w) => w.id !== rawWork.id)
    .slice(0, 3)
    .map((w) => localizeCase(w, locale))

  useEffect(() => {
    setInfoOpen(false)
  }, [rawWork.id])

  // Reveal-on-scroll (transcribed; rooted to viewport now that we're in-flow).
  useEffect(() => {
    const els = document.querySelectorAll('.detail-scope .reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      // threshold 0 + a small bottom margin: reveal as soon as the block enters
      // the viewport. (A fixed % threshold never fires for very tall blocks —
      // e.g. a single `group` of 12 full-width boards taller than the viewport.)
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rawWork.id])

  return (
    <div className="bg-void pt-[9.5rem] md:pt-[10rem]">
      {/* MOBILE nav — плаваюча плашка-капсула (як фільтри на портфоліо), не на всю ширину */}
      <div className="md:hidden sticky top-[9.5rem] z-10 px-4 py-3">
        <div className="flex items-center justify-between gap-3 backdrop-blur-[8px] bg-void/80 border border-white/20 px-2 py-1.5 rounded-full">
          <BackLink label={UI.backToPortfolio} />
          <NavControls prevId={prevId} nextId={nextId} />
        </div>
      </div>

      <article className="detail-scope max-w-[1600px] mx-auto">
        <div className="md:grid md:grid-cols-12 md:gap-x-8 px-4 md:px-8 pt-6 md:pt-8 md:items-start">
          {/* LEFT — case content (скролиться: галерея → інші кейси внизу) */}
          <div className="md:col-span-8 min-w-0">
            {/* Gallery items */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {work.gallery.map((item, i) => {
                switch (item.type) {
                  case 'text':
                    return (
                      <div key={i} className="col-span-12 reveal py-3 md:py-6">
                        <div className="max-w-[68ch]">
                          {item.heading && (
                            <div className="font-sans font-medium text-[18px] text-sun mb-3">
                              {item.heading}
                            </div>
                          )}
                          {item.body && (
                            <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-cream/85 font-normal">
                              {item.body}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  case 'group':
                    return (
                      <figure key={i} className="col-span-12 reveal">
                        <div className="relative w-full rounded-2xl overflow-hidden bg-grape leading-[0] text-center">
                          {item.images.map((img, j) =>
                            /\.(mp4|webm)$/i.test(img.src) ? (
                              <video
                                key={j}
                                className="block w-full h-auto"
                                style={{ marginTop: 0, marginBottom: 0 }}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              >
                                <source src={lAsset(img.src)} type="video/mp4" />
                              </video>
                            ) : img.topFade ? (
                              <div
                                key={j}
                                className="relative block leading-[0]"
                                style={{ margin: 0 }}
                              >
                                <img
                                  src={lAsset(img.src)}
                                  alt=""
                                  className="block max-w-full h-auto mx-auto"
                                  style={{ marginTop: 0, marginBottom: 0 }}
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-x-0 top-0 pointer-events-none"
                                  style={{
                                    height: '18%',
                                    background:
                                      'linear-gradient(to bottom, #26272e 0%, rgba(38,39,46,0.7) 35%, rgba(38,39,46,0) 100%)',
                                  }}
                                />
                              </div>
                            ) : (
                              <img
                                key={j}
                                src={lAsset(img.src)}
                                alt=""
                                className="block max-w-full h-auto mx-auto"
                                style={{ marginTop: 0, marginBottom: 0 }}
                                loading="lazy"
                              />
                            ),
                          )}
                        </div>
                      </figure>
                    )
                  case 'logos':
                    // Варіанти лого (процес) — на єдиному кремовому тлі
                    return (
                      <figure key={i} className="col-span-12 reveal">
                        <div
                          className="rounded-2xl p-4 md:p-10"
                          style={{ background: '#f5f1e6' }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-6">
                            {item.images.map((src, j) => (
                              <img
                                key={j}
                                src={asset(src)}
                                alt=""
                                className="block w-full h-auto rounded-lg"
                                loading="lazy"
                              />
                            ))}
                          </div>
                        </div>
                      </figure>
                    )
                  case 'slider':
                    return (
                      <figure key={i} className="col-span-12 reveal">
                        <Slider images={item.images} />
                        {item.caption && (
                          <figcaption className="mt-3 font-sans text-[14px] text-white/40">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  case 'bento':
                    return (
                      <div key={i} className="col-span-12 reveal">
                        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-start">
                          {item.images.map((img, j) => (
                            <div
                              key={j}
                              className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-grape col-span-2 ${
                                colsOnly(img.cls) || 'md:col-span-4'
                              } text-center`}
                              style={img.aspect ? { aspectRatio: img.aspect } : undefined}
                            >
                              <img
                                src={asset(img.src)}
                                alt=""
                                className={
                                  img.aspect
                                    ? 'absolute inset-0 w-full h-full object-contain'
                                    : 'block max-w-full max-h-[700px] h-auto w-auto mx-auto'
                                }
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                        {item.caption && (
                          <figcaption className="mt-3 font-sans text-[14px] text-white/40">
                            {item.caption}
                          </figcaption>
                        )}
                      </div>
                    )
                  case 'local':
                  case 'video':
                    return <GalleryFigure key={i} item={item} />
                  default:
                    return null
                }
              })}
            </div>
            {/* Other cases — усередині лівої (скролючої) колонки, внизу */}
            {others.length > 0 && (
              <section className="mt-16 md:mt-24 pb-12 md:pb-16">
                <div className="flex items-baseline justify-between mb-5 md:mb-7">
                  <div className="font-sans text-[16px] text-white/40">{UI.otherCases}</div>
                  <Link
                    href="/portfolio"
                    className="font-sans text-[16px] text-white/40 hover:text-sun transition"
                  >
                    {UI.allWorks}
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                  {others.map((w, i) => (
                    <WorkCard key={w.id} work={w} index={i} locale={locale} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT — навігація над текстом; колонка липка й НЕ скролиться зі сторінкою
              (скролиться лише ліва — до інших кейсів). Якщо текст довший за екран —
              він має внутрішній невидимий скрол, а сама колонка лишається на місці. */}
          <aside className="hidden md:flex md:col-span-4 md:flex-col md:sticky md:top-[10rem] md:self-start md:h-[calc(100vh-12rem)] reveal">
            <div className="flex flex-col h-full border-l border-white/10 md:pl-8">
              {/* NAV MENU — над текстом */}
              <div className="shrink-0 flex items-center justify-between gap-3 pb-5">
                <BackLink label={UI.backToPortfolio} />
                <NavControls prevId={prevId} nextId={nextId} />
              </div>
              {/* META — текст кейсу */}
              <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar pt-5 border-t border-white/10">
                <CaseMeta work={work} ui={UI} locale={locale} />
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Sticky «i» (info) — лише моб: відкриває фуллскрін з усім текстом кейсу */}
      <button
        onClick={() => setInfoOpen(true)}
        aria-label="Info"
        className="md:hidden fixed z-[66] right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+80px)] w-14 h-14 rounded-full bg-sun text-plum shadow-xl flex items-center justify-center font-display font-extrabold text-2xl leading-none"
      >
        i
      </button>

      {/* Фуллскрін-модалка з інформацією (моб) */}
      {infoOpen && (
        <div className="md:hidden fixed inset-0 z-[80] bg-void flex flex-col">
          <div className="shrink-0 bg-void/90 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 py-4">
            <div className="font-sans text-[14px] text-white/60">
              {work.title} · {work.year}
            </div>
            <button
              onClick={() => setInfoOpen(false)}
              aria-label="Close"
              className="inline-flex w-9 h-9 rounded-full bg-sun text-plum items-center justify-center text-base"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6">
            <div className="font-sans text-[14px] text-white/40">{catsLocalized}</div>
            <h2 className="mt-3 font-display font-extrabold leading-[0.95] tracking-tightest text-[12vw]">
              {work.title.split(' ')[0]}
              <span className="text-sun"> {work.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="mt-5 text-white/80 text-[17px] leading-relaxed">
              {work.description}
            </p>
            <dl className="mt-7 border-t border-white/10 divide-y divide-white/10">
              <div className="grid grid-cols-3 gap-3 py-4">
                <dt className="font-sans text-[14px] text-white/40">{UI.client}</dt>
                <dd className="col-span-2 text-sm">{work.client}</dd>
              </div>
              <div className="grid grid-cols-3 gap-3 py-4">
                <dt className="font-sans text-[14px] text-white/40">{UI.year}</dt>
                <dd className="col-span-2 text-sm">{work.year}</dd>
              </div>
              <div className="grid grid-cols-3 gap-3 py-4">
                <dt className="font-sans text-[14px] text-white/40">{UI.scope}</dt>
                <dd className="col-span-2 text-sm space-y-1">
                  {work.scope.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </dd>
              </div>
              {work.results && (
                <div className="grid grid-cols-3 gap-3 py-4">
                  <dt className="font-sans text-[14px] text-white/40">{UI.outcome}</dt>
                  <dd className="col-span-2 text-sm space-y-1">
                    {work.results.map((r, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-sun">+</span>
                        {r}
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
