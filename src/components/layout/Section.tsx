import type { ReactNode } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface SectionProps {
  children: ReactNode
  /** id of the heading inside the section, so assistive tech can name the region. */
  labelledBy?: string
  className?: string
}

export function Section({ children, labelledBy, className }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={classNames('py-12', className)}>
      {children}
    </section>
  )
}
