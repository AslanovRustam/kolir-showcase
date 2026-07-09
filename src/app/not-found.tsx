import Link from 'next/link'
// Глобальний 404 для НЕсопоставлених URL. У проєкті кілька root-layout, тож для
// невідомих маршрутів Next рендерить власний DefaultLayout з <html>/<body> —
// тому ТУТ <html>/<body> НЕ додаємо (інакше вкладені html/body → hydration error).
// Рендеримо лише вміст; глобальні стилі підключаються імпортом, хедер/футер — вручну.
import '../site-css/style.css'
import '../site-css/brife.css'
import '../site-css/animations.css'
import '../site-css/redesign.css'
import '../site-css/override.css'

import ShowcaseHeader from '../components/ShowcaseHeader'
import ShowcaseFooter from '../components/ShowcaseFooter'

export const metadata = { title: '404 — page not found · Kolir' }

export default function GlobalNotFound() {
  return (
    <div className="kolir-body">
      <ShowcaseHeader />
      <style>{`
        .error404{ min-height:70vh; display:grid; place-items:center; text-align:center; padding:6rem 2rem; background:#5E00CF; color:#fff; }
        .error404 .code{ font-size:clamp(8rem,22vw,18rem); font-weight:700; line-height:.9; letter-spacing:-.03em; }
        .error404 h1{ font-size:clamp(2rem,4vw,3.2rem); margin:1rem 0 .6rem; font-weight:600; }
        .error404 p{ font-size:1.6rem; opacity:.85; margin:0 0 2.6rem; }
        .error404 a.home{ display:inline-block; background:#FFCB45; color:#1c1340; font-weight:600; font-size:1.5rem; padding:1.3rem 3rem; border-radius:999px; text-decoration:none; transition:transform .25s, filter .25s; }
        .error404 a.home:hover{ filter:brightness(1.05); }
      `}</style>
      <section className="error404">
        <div>
          <div className="code">404</div>
          <h1>Page not found</h1>
          <p>The page may have been moved or no longer exists.</p>
          <Link className="home" href="/portfolio">
            Back to portfolio
          </Link>
        </div>
      </section>
      <ShowcaseFooter />
    </div>
  )
}
