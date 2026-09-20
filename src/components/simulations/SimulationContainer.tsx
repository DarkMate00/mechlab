import { useId, type ReactNode } from 'react'
import { Card } from '../ui/Card'

interface SimulationContainerProps {
  title: string
  description?: string
  /** The visual area (canvas, SVG ...). */
  children: ReactNode
  /** Optional controls rendered below the stage. */
  controls?: ReactNode
}

/** Layout shell for a simulation. Simulation logic belongs in `src/lib`, not here. */
export function SimulationContainer({
  title,
  description,
  children,
  controls,
}: SimulationContainerProps) {
  const headingId = useId()

  return (
    <Card as="section" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-xl font-semibold">
        {title}
      </h2>
      {description ? <p className="mt-1 text-slate-600">{description}</p> : null}
      <div className="mt-4">{children}</div>
      {controls ? <div className="mt-4">{controls}</div> : null}
    </Card>
  )
}
