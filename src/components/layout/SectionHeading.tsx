import { TechnicalLabel } from '../ui/TechnicalLabel'

interface SectionHeadingProps {
  title: string
  /** Heading level. Use 1 once per page, then 2, 3 without skipping levels. */
  level?: 1 | 2 | 3
  description?: string
  /** Optional technical label above the heading, e.g. "MODULE / 01". */
  label?: string
  id?: string
}

const LEVEL_CLASSES = {
  1: 'text-h1',
  2: 'text-h2',
  3: 'text-h3',
} as const

export function SectionHeading({ title, level = 2, description, label, id }: SectionHeadingProps) {
  const Heading = `h${level}` as const

  return (
    <div>
      {label ? (
        <p className="mb-4">
          <TechnicalLabel tone="accent" marker>
            {label}
          </TechnicalLabel>
        </p>
      ) : null}
      <Heading id={id} className={LEVEL_CLASSES[level]}>
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 max-w-reading text-body-lg text-fg-muted">{description}</p>
      ) : null}
    </div>
  )
}
