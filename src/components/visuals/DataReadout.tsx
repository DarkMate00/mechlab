import type { ReactNode } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface DataReadoutProps {
  label: string
  value: ReactNode
  unit?: string
  className?: string
}

/** A labelled instrument value, e.g. TORQUE / 42.0 N·m. Renders a one-item description list. */
export function DataReadout({ label, value, unit, className }: DataReadoutProps) {
  return (
    <dl className={classNames('font-mono', className)}>
      <dt className="text-label uppercase tracking-label text-fg-subtle">{label}</dt>
      <dd className="mt-1 flex items-baseline gap-1.5 text-data tabular-nums text-fg">
        {value}
        {unit ? <span className="text-caption text-fg-muted">{unit}</span> : null}
      </dd>
    </dl>
  )
}
