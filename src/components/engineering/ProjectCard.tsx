import { CONTENT_STATUS_LABELS } from '../../data/contentStatus'
import type { Project } from '../../types/content'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article">
      <TechnicalLabel>{CONTENT_STATUS_LABELS[project.status]}</TechnicalLabel>
      <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-slate-600">{project.description}</p>
    </Card>
  )
}
