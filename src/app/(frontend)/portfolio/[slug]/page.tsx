import { notFound } from 'next/navigation'
import { CASES } from '../../../../data/cases'
import CaseDetail from '../../../../components/portfolio/CaseDetail'
import { isCaseVisible } from '../../../../lib/caseLocales'

// Вітрина — завжди англійська; показуємо лише кейси з англомовними картинками.
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = CASES.find((c) => c.id === slug)
  if (!work) notFound()
  if (!isCaseVisible(work, 'en')) notFound()

  return <CaseDetail work={work} locale="en" />
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.id }))
}
