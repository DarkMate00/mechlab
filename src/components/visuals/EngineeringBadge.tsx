import type { ReactNode } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface EngineeringBadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
}

/** Compact outlined tag for scope or units, e.g. "SI UNITS" or "EDUCATIONAL MODEL". */
export function EngineeringBadge({ children, tone = 'neutral' }: EngineeringBadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-xs border px-2 py-1 font-mono text-label uppercase tracking-label',
        tone === 'accent' ? 'border-accent/40 text-accent' : 'border-line-strong text-fg-muted',
      )}
    >
      {children}
    </span>
  )
}
