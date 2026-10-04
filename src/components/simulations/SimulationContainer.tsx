import { useId, type ReactNode } from 'react'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'
import { TechnicalGrid } from '../visuals/TechnicalGrid'

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
      <TechnicalLabel tone="accent" marker>
        Simulation
      </TechnicalLabel>
      <h2 id={headingId} className="mt-4 text-h3">
        {title}
      </h2>
      {description ? <p className="mt-2 text-fg-muted">{description}</p> : null}
      {/* data-cursor switches the custom cursor to its crosshair "simulation" state. */}
      <div
        data-cursor="simulation"
        className="surface-raised relative mt-6 overflow-hidden rounded-sm"
      >
        <TechnicalGrid className="absolute inset-0" fade="center" />
        <div className="relative">{children}</div>
      </div>
      {controls ? <div className="mt-6">{controls}</div> : null}
    </Card>
  )
}
