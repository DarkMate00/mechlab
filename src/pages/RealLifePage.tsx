import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { SECTIONS } from '../data/navigation'

export default function RealLifePage() {
  return (
    <PagePlaceholder title={SECTIONS.realLife.label} description={SECTIONS.realLife.description} />
  )
}
