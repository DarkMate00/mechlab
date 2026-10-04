import { useRef } from 'react'
import type { SVGMotionProps } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useRevealState } from '../../hooks/useRevealState'
import { EASE_PRECISE } from '../../lib/motion'

interface DrawLineProps extends Omit<
  SVGMotionProps<SVGPathElement>,
  'initial' | 'animate' | 'whileInView' | 'variants' | 'viewport' | 'ref'
> {
  /** SVG path data. A straight line is just "M x1 y1 L x2 y2". */
  d: string
  duration?: number
  /** Seconds before drawing starts (use increasing delays to draw a diagram in sequence). */
  delay?: number
  once?: boolean
}

/**
 * An SVG path that draws itself when it scrolls into view. Must be rendered inside an <svg>.
 * Stroke defaults to currentColor, so colour it with a text colour class on the <svg> or path.
 * Under reduced motion the path is simply shown fully drawn.
 */
export function DrawLine({ d, duration = 1.6, delay = 0, once = true, ...props }: DrawLineProps) {
  const ref = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once, amount: 0 })

  return (
    <m.path
      ref={ref}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      initial={{ pathLength: reduced ? 1 : 0 }}
      // Reduced motion: always fully drawn, never waiting for the trigger.
      animate={{ pathLength: reduced || state === 'visible' ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : duration, delay, ease: EASE_PRECISE }}
      {...props}
    />
  )
}
