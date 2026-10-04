interface CrosshairProps {
  /** Overall size in px. */
  size?: number
  className?: string
}

/** Registration mark: a crosshair with a gap at the centre. Uses the current text colour. */
export function Crosshair({ size = 16, className }: CrosshairProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <path d="M8 0v6M8 10v6M0 8h6M10 8h6" />
    </svg>
  )
}
