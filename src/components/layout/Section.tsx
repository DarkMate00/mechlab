import type { ReactNode } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface SectionProps {
  children: ReactNode
  /** id of the heading inside the section, so assistive tech can name the region. */
  labelledBy?: string
  className?: string
}

/** A page section with the standard vertical rhythm (`py-section`). */
export function Section({ children, labelledBy, className }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={classNames('py-section', className)}>
      {children}
    </section>
  )
}
