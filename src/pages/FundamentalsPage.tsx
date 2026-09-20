import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { SECTIONS } from '../data/navigation'

export default function FundamentalsPage() {
  return (
    <PagePlaceholder title={SECTIONS.fundamentals.label} description={SECTIONS.fundamentals.description} />
  )
}
