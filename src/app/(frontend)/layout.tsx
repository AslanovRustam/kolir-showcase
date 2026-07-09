import React from 'react'
// Глобальні стилі сайту (порядок як у статиці: style → brife → animations → redesign)
import '../../site-css/style.css'
import '../../site-css/brife.css'
import '../../site-css/animations.css'
import '../../site-css/redesign.css'
import '../../site-css/override.css'

import ShowcaseHeader from '../../components/ShowcaseHeader'
import ShowcaseFooter from '../../components/ShowcaseFooter'

// Вітрина портфоліо (Upwork-safe): лише каталог і сторінки кейсів, англійською,
// без навігації / контактів / соцмереж. noindex — щоб дублікат не індексувався.
export const metadata = {
  title: 'Kolir — Selected Work',
  description: 'Kolir — selected branding, UI/UX, web and motion work.',
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: '/apple-touch-icon.png',
  },
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800;900&display=swap"
        />
      </head>
      <body className="kolir-body">
        <ShowcaseHeader />
        {children}
        <ShowcaseFooter />
      </body>
    </html>
  )
}
