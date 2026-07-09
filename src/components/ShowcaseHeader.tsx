import Link from 'next/link'

// Хедер для режиму «вітрина»: лише лого (EN), без навігації, перемикача мови,
// CTA і будь-яких зовнішніх/контактних посилань. Лого веде на /portfolio (внутр.).
const LOGO_EN = '/img/Logo-kolir.svg'

export default function ShowcaseHeader() {
  return (
    <header className="site-header" aria-label="Site header">
      <div className="hero-head">
        <div className="hh-left">
          <Link className="brand" href="/portfolio" aria-label="Kolir">
            <img src={LOGO_EN} alt="Kolir" />
          </Link>
        </div>
      </div>

      {/* Mobile top bar — лише лого */}
      <div className="m-top" aria-label="Mobile top bar">
        <Link className="m-brand" href="/portfolio">
          <img src={LOGO_EN} alt="Kolir" />
        </Link>
      </div>
    </header>
  )
}
