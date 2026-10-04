import { classNames } from '../../lib/utilities/classNames'

/** Right arrow that nudges forward when an ancestor with the `group` class is hovered. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={classNames(
        'shrink-0 transition-transform duration-200 ease-precise motion-safe:group-hover:translate-x-1',
        className,
      )}
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  )
}
