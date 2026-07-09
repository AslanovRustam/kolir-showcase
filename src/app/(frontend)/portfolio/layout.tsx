import './portfolio-tw.css'

// Обгортка роутів портфоліо: підключає Tailwind (utilities-only) і дає корінь
// .portfolio-root для локального скоупу стилів. Спільні Header/Footer
// успадковуються з (frontend)/layout.tsx — тобто портфоліо тепер має той самий
// персистентний хедер, що й решта сайту (закриває відкладений пункт).
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className="portfolio-root">{children}</div>
}
