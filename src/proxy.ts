import { NextResponse, type NextRequest } from 'next/server'

// Вітрина показує лише розділ портфоліо. Усе інше (у т.ч. корінь «/») редіректимо
// на /portfolio — щоб не було жодних сторонніх сторінок, контактів чи посилань.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/portfolio' || pathname.startsWith('/portfolio/')) {
    return NextResponse.next()
  }
  const url = req.nextUrl.clone()
  url.pathname = '/portfolio'
  url.search = ''
  return NextResponse.redirect(url)
}

// Не чіпаємо статику й службові шляхи Next; решту фільтрує proxy.
export const config = {
  matcher: ['/((?!_next/|favicon|img/|images/|fonts/|.*\\.[\\w]+$).*)'],
}
