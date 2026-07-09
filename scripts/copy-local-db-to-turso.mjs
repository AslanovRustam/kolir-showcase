// Копіює дані з локальної SQLite-бази (kolir.db) у віддалену Turso (libSQL).
// Джерело — локальний файл kolir.db; призначення — Turso з .env (TURSO_*).
// Запуск (з кореня проєкту):
//   node scripts/copy-local-db-to-turso.mjs
//
// Креди Turso беруться з .env: TURSO_DATABASE_URI + TURSO_AUTH_TOKEN
// (fallback на DATABASE_URI / DATABASE_AUTH_TOKEN, якщо TURSO_* не задані).

import 'dotenv/config'
import { createClient } from '@libsql/client'

const SRC_URL = process.env.SOURCE_DB || 'file:./kolir.db'
const DST_URL = process.env.TURSO_DATABASE_URI || process.env.DATABASE_URI
const DST_TOKEN = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

if (!DST_URL) {
  console.error('✗ Не задано TURSO_DATABASE_URI (URL цільової Turso-бази) у .env.')
  process.exit(1)
}
if (!DST_URL.startsWith('libsql://')) {
  console.error(`✗ Призначення не схоже на Turso: ${DST_URL}. Очікується libsql://...`)
  process.exit(1)
}
if (!DST_TOKEN) {
  console.error('✗ Для Turso потрібен TURSO_AUTH_TOKEN у .env.')
  process.exit(1)
}

// НЕ чіпаємо системні та прод-керовані таблиці:
// - payload_migrations: у Turso свій стан міграцій (npm run ci);
// - users/users_sessions: адмін-користувачів заводять на проді, локальні не переносимо;
// - media: файли живуть у Vercel Blob, керуються на проді;
// - payload_kv/locked/preferences: службові, специфічні для середовища.
const SKIP = new Set([
  'payload_migrations',
  'users',
  'users_sessions',
  'media',
  'payload_kv',
  'payload_locked_documents',
  'payload_locked_documents_rels',
  'payload_preferences',
  'payload_preferences_rels',
])

const src = createClient({ url: SRC_URL })
const dst = createClient({ url: DST_URL, authToken: DST_TOKEN })

const tables = (
  await src.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
  )
).rows.map((r) => r.name)

let totalRows = 0
let totalTables = 0

for (const table of tables) {
  if (SKIP.has(table)) continue

  const rows = (await src.execute(`SELECT * FROM "${table}"`)).rows
  if (!rows.length) continue

  const cols = (await src.execute(`PRAGMA table_info("${table}")`)).rows.map((r) => r.name)
  const colList = cols.map((c) => `"${c}"`).join(', ')
  const placeholders = cols.map(() => '?').join(', ')

  // Спочатку очищаємо таблицю, потім вставляємо актуальні рядки —
  // так видалені локально записи не лишаються «висіти» в Turso.
  // DELETE + INSERT в одному batch = атомарна транзакція.
  const stmts = [
    { sql: `DELETE FROM "${table}"`, args: [] },
    ...rows.map((row) => ({
      sql: `INSERT INTO "${table}" (${colList}) VALUES (${placeholders})`,
      args: cols.map((c) => row[c]),
    })),
  ]

  await dst.batch(stmts, 'write')
  totalRows += rows.length
  totalTables += 1
  console.log(`  ${String(rows.length).padStart(4)}  → ${table}`)
}

console.log(`\n✓ Скопійовано ${totalRows} рядків у ${totalTables} таблиць.`)
process.exit(0)
