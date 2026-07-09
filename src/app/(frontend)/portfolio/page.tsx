import PortfolioListing from '../../../components/portfolio/PortfolioListing'
import { allowedCaseIds } from '../../../lib/caseLocales'

// Вітрина — завжди англійська.
export const metadata = { title: 'Selected Work · Kolir' }

export default function PortfolioPage() {
  const allowedIds = allowedCaseIds('en')
  return <PortfolioListing locale="en" allowedIds={allowedIds} />
}
