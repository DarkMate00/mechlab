import { useId, type ReactNode } from 'react'
import { Reveal } from '../../components/animations/Reveal'
import { SectionHeading } from '../../components/layout/SectionHeading'

interface DemoSectionProps {
  /** 1-based position, shown as the section number. */
  index: number
  title: string
  description?: string
  children: ReactNode
}

/** A numbered block of the design-system page. */
export function DemoSection({ index, title, description, children }: DemoSectionProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="border-t border-line py-14 md:py-20">
      <Reveal>
        <SectionHeading
          id={headingId}
          label={`SECTION / ${String(index).padStart(2, '0')}`}
          title={title}
          description={description}
        />
      </Reveal>
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  )
}
