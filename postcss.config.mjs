/** PostCSS — лише для Tailwind v4 (@tailwindcss/postcss).
 *  Плагін трансформує тільки файли з Tailwind-директивами; решта CSS
 *  (site-css/*) проходить без змін. */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
