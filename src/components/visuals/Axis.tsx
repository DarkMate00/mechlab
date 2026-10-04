interface AxisProps {
  /** Overall size in px. */
  size?: number
  className?: string
}

/** A small X/Y coordinate axis marker. Uses the current text colour. */
export function Axis({ size = 56, className }: AxisProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <path d="M8 48V8M8 48h40" />
      <path d="M4.5 12 8 7l3.5 5M44 44.5l5 3.5-5 3.5" />
      <g fill="currentColor" stroke="none" fontFamily="var(--font-mono)" fontSize="9">
        <text x="14" y="12">
          Y
        </text>
        <text x="46" y="42">
          X
        </text>
      </g>
    </svg>
  )
}
