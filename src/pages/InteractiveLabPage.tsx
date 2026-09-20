import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { SECTIONS } from '../data/navigation'

export default function InteractiveLabPage() {
  return (
    <PagePlaceholder title={SECTIONS.lab.label} description={SECTIONS.lab.description} />
  )
}
