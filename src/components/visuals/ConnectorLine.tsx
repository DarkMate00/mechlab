import { classNames } from '../../lib/utilities/classNames'

interface ConnectorLineProps {
  /** Length in px. */
  length?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/** A thin leader line ending in a small square, for pointing a label at something. */
export function ConnectorLine({
  length = 48,
  orientation = 'horizontal',
  className,
}: ConnectorLineProps) {
  const horizontal = orientation === 'horizontal'

  return (
    <span
      aria-hidden="true"
      className={classNames('inline-flex items-center', !horizontal && 'flex-col', className)}
    >
      <span
        style={horizontal ? { width: length } : { height: length }}
        className={horizontal ? 'h-px bg-current' : 'w-px bg-current'}
      />
      <span className="size-1 bg-current" />
    </span>
  )
}
