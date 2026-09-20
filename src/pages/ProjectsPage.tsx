import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { SECTIONS } from '../data/navigation'

export default function ProjectsPage() {
  return (
    <PagePlaceholder title={SECTIONS.projects.label} description={SECTIONS.projects.description} />
  )
}
