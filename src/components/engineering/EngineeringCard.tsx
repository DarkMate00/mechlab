import { CONTENT_STATUS_LABELS } from '../../data/contentStatus'
import type { ContentStatus } from '../../types/content'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'

interface EngineeringCardProps {
  title: string
  status: ContentStatus
  summary?: string
  /** Technical label above the title, e.g. "MODULE / 01". */
  label?: string
  /** Make the card respond to hover/focus. Only for cards that lead somewhere. */
  interactive?: boolean
}

/** Card for a module, concept or real-life system. */
export function EngineeringCard({ title, status, summary, label, interactive }: EngineeringCardProps) {
  return (
    <Card as="article" interactive={interactive}>
      <div className="flex items-center justify-between gap-4">
        <TechnicalLabel>{label ?? CONTENT_STATUS_LABELS[status]}</TechnicalLabel>
        {label ? <TechnicalLabel tone="accent">{CONTENT_STATUS_LABELS[status]}</TechnicalLabel> : null}
      </div>
      <h3 className="mt-6 text-h3">{title}</h3>
      {summary ? <p className="mt-2 text-fg-muted">{summary}</p> : null}
    </Card>
  )
}
