import { CONTENT_STATUS_LABELS } from '../../data/contentStatus'
import type { ContentStatus } from '../../types/content'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'

interface EngineeringCardProps {
  title: string
  status: ContentStatus
  summary?: string
}

/** Card for a module, concept or real-life system. */
export function EngineeringCard({ title, status, summary }: EngineeringCardProps) {
  return (
    <Card as="article">
      <TechnicalLabel>{CONTENT_STATUS_LABELS[status]}</TechnicalLabel>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      {summary ? <p className="mt-2 text-slate-600">{summary}</p> : null}
    </Card>
  )
}
