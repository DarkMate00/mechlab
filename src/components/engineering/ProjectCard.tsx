import { CONTENT_STATUS_LABELS } from '../../data/contentStatus'
import type { Project } from '../../types/content'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article">
      <TechnicalLabel>{CONTENT_STATUS_LABELS[project.status]}</TechnicalLabel>
      <h3 className="mt-6 text-h3">{project.title}</h3>
      <p className="mt-2 text-fg-muted">{project.description}</p>
    </Card>
  )
}
