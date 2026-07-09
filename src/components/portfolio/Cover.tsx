import type { CaseItem } from '../../data/cases'

const bgMap: Record<string, string> = {
  sun: 'bg-sun',
  cream: 'bg-cream',
  violet: 'bg-violet',
  lilac: 'bg-lilac',
  ink: 'bg-ink',
}

export default function Cover({
  work,
  full = false,
}: {
  work: CaseItem
  full?: boolean
}) {
  const textCol = work.text === 'ink' ? 'text-ink' : 'text-cream'

  // For small cards we scale type via container queries by passing `full`.
  const padding = full ? 'p-6 md:p-8' : 'p-3'
  const labelSize = full ? 'text-[10.5px]' : 'text-[8.5px]'

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${bgMap[work.color]} ${textCol}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Generic cover for newer cases that provide an explicit `cover` path
          (instead of a hardcoded per-id branch below). */}
      {work.cover && (
        <>
          <img
            src={`/${work.cover}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between gap-2 font-mono ${labelSize} uppercase tracking-[0.18em] text-white drop-shadow`}
            >
              <span className="truncate">{work.client}</span>
              <span>&apos;{String(work.year).slice(2)}</span>
            </div>
          </div>
        </>
      )}
      {work.id === '15-krokiv' && (
        <>
          <img
            src="/images/15_krokiv/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-ink/70`}
            >
              <span>будь у курсі · 15 кроків</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'strichka' && (
        <>
          <img
            src="/images/strichka/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-ink/55`}
            >
              <span>strichka · ui/ux</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'vyriy' && (
        <>
          <img
            src="/images/vyriy/Cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>vyriy · autonomous</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === '252b' && (
        <>
          <img
            src="/images/252b/cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-ink/70`}
            >
              <span>252 ошб · штурм</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'med-bat' && (
        <>
          <img
            src="/images/med_bat/ua/Cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>медбат · ui/ux</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'nakotne' && (
        <>
          <img
            src="/images/Nakotne/cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white/70`}
            >
              <span>nākotne · kindergarten</span>
              <span>’24</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'ice-dating' && (
        <>
          <img
            src="/images/ice_dating/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-ink/55`}
            >
              <span>ice dating · ux/ui</span>
              <span>’23</span>
            </div>
          </div>
        </>
      )}
      {work.id === '1st-legion' && (
        <>
          <img
            src="/images/1st_legion/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>1st legion · recruitment</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'wirex-brand' && (
        <>
          <img
            src="/images/wirex/brand-book/cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>wirex · brand book</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'wirex-banners' && (
        <>
          <img
            src="/images/wirex/banners/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>wirex · campaigns</span>
              <span>’26</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'kylon' && (
        <>
          <img
            src="/images/kylon/Коробочка с кулоном.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>heart of ukraine</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'hc' && (
        <>
          <img
            src="/images/medicine/cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 flex flex-col justify-between ${padding} pointer-events-none`}
          >
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>hc · healthcare</span>
              <span>&apos;25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'eps' && (
        <>
          <img
            src="/images/eps/cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>eps · school</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'planty' && (
        <>
          <img
            src="/images/planty/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>planty · plant care</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'mits' && (
        <>
          <img
            src="/images/sil/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>міць · salt</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'zaz' && (
        <>
          <img
            src="/images/zaz/14ff63ec3e36c33ce853538599c1f62c.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>zaz 968 · film</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'citf' && (
        <>
          <img
            src="/images/CITF/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>citf · landing</span>
              <span>’21</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'ctendo' && (
        <>
          <img
            src="/images/Ctendo/Ctendo Upwork_1.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>ctendo · brand</span>
              <span>’24</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'dotpay' && (
        <>
          <img
            src="/images/DotPay/Cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>dotpay · banking</span>
              <span>’24</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'cqc' && (
        <>
          <img
            src="/images/CQC/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/20"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>cqc · consultancy</span>
              <span>’24</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'sls' && (
        <>
          <img
            src="/images/sls/Cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>sls · residences</span>
              <span>’24</span>
            </div>
          </div>
        </>
      )}
      {work.id === 'edu' && (
        <>
          <img
            src="/images/edu-lms/Cover.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/30"></div>
          <div className={`absolute inset-0 flex flex-col justify-between ${padding}`}>
            <div
              className={`flex items-center justify-between font-mono ${labelSize} uppercase tracking-[0.2em] text-white drop-shadow`}
            >
              <span>education · LMS</span>
              <span>’25</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
