import { classNames } from '../../lib/utilities/classNames'
import { MeasurementTick } from './MeasurementTick'

interface TechnicalGridProps {
  className?: string
  /** Where the grid fades out. */
  fade?: 'top' | 'center' | 'none'
  /** Add measurement rulers along the top and left edges (desktop only). */
  rulers?: boolean
  /** Very slowly slide the grid. Off by default; never runs on mobile or with reduced motion. */
  drift?: boolean
}

const FADE_CLASSES = {
  top: 'mask-fade-top',
  center: 'mask-fade-center',
  none: '',
} as const

/**
 * Engineering-drawing background: thin blueprint lines on a 96px / 24px grid.
 * Size and position it with `className` (e.g. "absolute inset-0" or "fixed inset-0 -z-10").
 * Purely decorative, so it is hidden from assistive technology and ignores the pointer.
 */
export function TechnicalGrid({
  className,
  fade = 'top',
  rulers = false,
  drift = false,
}: TechnicalGridProps) {
  return (
    <div
      aria-hidden="true"
      className={classNames('pointer-events-none overflow-hidden', className)}
    >
      <div className={classNames('absolute inset-0', FADE_CLASSES[fade])}>
        {/* 6rem larger than the box so drifting by one major cell can loop without gaps. */}
        <div
          className={classNames(
            'bg-technical-grid absolute -inset-24',
            drift && 'animate-grid-drift max-md:animate-none motion-reduce:animate-none',
          )}
        />
      </div>
      {rulers ? (
        <>
          <MeasurementTick
            length="100%"
            className="absolute left-0 top-0 hidden text-fg/25 md:block"
          />
          <MeasurementTick
            orientation="vertical"
            length="100%"
            className="absolute left-0 top-0 hidden text-fg/25 md:block"
          />
        </>
      ) : null}
    </div>
  )
}
