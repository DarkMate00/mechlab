import { useId, type ReactNode } from 'react'
import { Card } from '../ui/Card'

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
      <h2 id={headingId} className="text-xl font-semibold">
        {title}
      </h2>
      {description ? <p className="mt-1 text-slate-600">{description}</p> : null}
      <div className="mt-4 space-y-3">{inputs}</div>
      <div role="status" className="mt-4">
        {result}
      </div>
    </Card>
  )
}
