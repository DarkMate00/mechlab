interface SectionHeadingProps {
  title: string
  /** Heading level. Use 1 once per page, then 2, 3 without skipping levels. */
  level?: 1 | 2 | 3
  description?: string
  id?: string
}

const LEVEL_CLASSES = {
  1: 'text-4xl font-bold tracking-tight sm:text-5xl',
  2: 'text-2xl font-semibold',
  3: 'text-lg font-semibold',
} as const

export function SectionHeading({ title, level = 2, description, id }: SectionHeadingProps) {
  const Heading = `h${level}` as const

  return (
    <div>
      <Heading id={id} className={LEVEL_CLASSES[level]}>
        {title}
      </Heading>
      {description ? <p className="mt-2 max-w-prose text-slate-600">{description}</p> : null}
    </div>
  )
}
