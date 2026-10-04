import type { CSSProperties } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface MeasurementTickProps {
  orientation?: 'horizontal' | 'vertical'
  /** Length of the strip, in px or any CSS length. */
  length?: number | string
  /** Distance in px between minor ticks. */
  step?: number
  /** Every n-th tick is longer. */
  majorEvery?: number
  className?: string
}

/** A ruler strip. Drawn with two repeating CSS gradients, so it costs no DOM nodes. Colour it with `text-*`. */
export function MeasurementTick({
  orientation = 'horizontal',
  length = 240,
  step = 8,
  majorEvery = 5,
  className,
}: MeasurementTickProps) {
  const horizontal = orientation === 'horizontal'
  const direction = horizontal ? 'to right' : 'to bottom'
  const tick = (spacing: number) =>
    `repeating-linear-gradient(${direction}, currentColor 0 1px, transparent 1px ${spacing}px)`

  const style: CSSProperties = {
    width: horizontal ? length : 12,
    height: horizontal ? 12 : length,
    backgroundImage: `${tick(step * majorEvery)}, ${tick(step)}`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: horizontal ? '100% 12px, 100% 6px' : '12px 100%, 6px 100%',
    backgroundPosition: 'left top',
  }

  return <span aria-hidden="true" style={style} className={classNames('block max-w-full', className)} />
}
