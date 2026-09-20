import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { SECTIONS } from '../data/navigation'

export default function AboutPage() {
  return (
    <PagePlaceholder title={SECTIONS.about.label} description={SECTIONS.about.description} />
  )
}
