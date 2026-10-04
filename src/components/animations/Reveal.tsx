import { useRef } from 'react'
import type { HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import { useRevealState } from '../../hooks/useRevealState'
import { getRevealVariants } from '../../lib/motion'
import { MOTION_TAGS, type MotionTag } from './motionTags'

interface RevealProps extends Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'ref'
> {
  as?: MotionTag
  /** Seconds to wait before the reveal starts. */
  delay?: number
  /** Start offset in px (default from REVEAL.y). */
  y?: number
  /** Start blur in px (default from REVEAL.blur). Use 0 on very large blocks. */
  blur?: number
  /** Reveal only the first time it scrolls into view. */
  once?: boolean
  /** How much of the element must be visible (0-1) before it reveals. */
  amount?: number
}

/**
 * Fades an element in with a small upward move and a blur reduction when it scrolls into view.
 * Under reduced motion this is a plain fade. For groups of items use StaggerContainer instead.
 */
export function Reveal({
  as = 'div',
  delay,
  y,
  blur,
  once = true,
  amount = 0.2,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once, amount })
  const Tag = MOTION_TAGS[as]

  return (
    <Tag
      ref={ref}
      variants={getRevealVariants({ reduced, y, blur, delay })}
      initial="hidden"
      animate={state}
      {...props}
    />
  )
}
