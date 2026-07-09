// Build-time генератор карти локалей кейсів.
// Скануємо public/images і записуємо src/data/case-locales.json:
//   { [caseId]: { uk: boolean, en: boolean } }
// Рантайм (src/lib/caseLocales.ts) читає лише цей JSON — без fs-сканування public,
// тож Next.js не тягне всю папку public у serverless-функцію.
//
// Запуск: npx tsx scripts/gen-case-locales.ts   (або npm run gen:case-locales)
// Перезапускати після додавання/видалення локалізованих папок зображень.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CASES, type CaseItem } from '../src/data/cases'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(dirname, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const IMG_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i

function dirExists(rel: string): boolean {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, rel)).isDirectory()
  } catch {
    return false
  }
}

function dirHasImages(rel: string): boolean {
  try {
    const full = path.join(PUBLIC_DIR, rel)
    if (!fs.statSync(full).isDirectory()) return false
    return fs.readdirSync(full).some((f) => IMG_RE.test(f))
  } catch {
    return false
  }
}

function collectSrcs(gallery: unknown): string[] {
  const out: string[] = []
  if (!Array.isArray(gallery)) return out
  for (const block of gallery as Array<Record<string, unknown>>) {
    if (!block) continue
    if (typeof block.src === 'string') out.push(block.src)
    if (Array.isArray(block.images)) {
      for (const im of block.images as Array<Record<string, unknown>>) {
        if (im && typeof im.src === 'string') out.push(im.src)
      }
    }
  }
  return out
}

function langBases(work: CaseItem): string[] {
  const bases = new Set<string>()
  for (const s of collectSrcs((work as { gallery?: unknown }).gallery)) {
    const m = s.match(/^(.*?)\/\{lang\}\//)
    if (m) bases.add(m[1])
  }
  return [...bases]
}

function computeLocales(work: CaseItem): { uk: boolean; en: boolean } {
  const bases = langBases(work)
  if (bases.length === 0) return { uk: true, en: true }
  if (!bases.every((b) => dirExists(b))) return { uk: true, en: true }
  return {
    uk: bases.every((b) => dirHasImages(`${b}/ua`)),
    en: bases.every((b) => dirHasImages(`${b}/en`)),
  }
}

const map: Record<string, { uk: boolean; en: boolean }> = {}
for (const work of CASES) {
  map[(work as { id: string }).id] = computeLocales(work)
}

const outPath = path.join(ROOT, 'src/data/case-locales.json')
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + '\n')
// eslint-disable-next-line no-console
console.log(`✓ Згенеровано ${outPath} (${Object.keys(map).length} кейсів)`)
