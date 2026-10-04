import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

/**
 * App-wide Motion setup.
 * - LazyMotion + domAnimation keeps the Motion bundle small; use the `m.*` components
 *   (from 'motion/react-m'), never `motion.*`. `strict` throws if the wrong one is used.
 * - reducedMotion="user" makes Motion skip transform/layout animation for people who
 *   enabled "reduce motion" in their OS. Components also check it for their own choices.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
