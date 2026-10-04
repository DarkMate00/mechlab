import { useId, type ReactNode } from 'react'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'

interface CalculatorPanelProps {
  title: string
  description?: string
  /** Input controls. Each control must have a visible `<label>`. */
  inputs: ReactNode
  /** Calculated output. Announced politely to screen readers when it changes. */
  result: ReactNode
}

/** Layout shell for a calculator. Holds no engineering logic: that lives in `src/lib/calculations`. */
export function CalculatorPanel({ title, description, inputs, result }: CalculatorPanelProps) {
  const headingId = useId()

  return (
    <Card as="section" aria-labelledby={headingId}>
      <TechnicalLabel tone="accent" marker>
        Calculation
      </TechnicalLabel>
      <h2 id={headingId} className="mt-4 text-h3">
        {title}
      </h2>
      {description ? <p className="mt-2 text-fg-muted">{description}</p> : null}
      <div className="mt-6 space-y-4">{inputs}</div>
      <div role="status" className="surface-raised mt-6 rounded-sm p-4">
        {result}
      </div>
    </Card>
  )
}
