import type { ReactNode } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface TechnicalLabelProps {
  children: ReactNode
  tone?: 'muted' | 'accent'
  /** Show a small square marker before the text. */
  marker?: boolean
  className?: string
}

/**
 * Small monospaced caps label for engineering metadata: module ids, units, status, scope.
 * Write the text in capitals-friendly form, e.g. <TechnicalLabel>MODULE / 01</TechnicalLabel>.
 */
export function TechnicalLabel({
  children,
  tone = 'muted',
  marker = false,
  className,
}: TechnicalLabelProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-2 font-mono text-label uppercase tracking-label',
        tone === 'accent' ? 'text-accent' : 'text-fg-subtle',
        className,
      )}
    >
      {marker ? <span aria-hidden="true" className="size-1.5 bg-current" /> : null}
      {children}
    </span>
  )
}
