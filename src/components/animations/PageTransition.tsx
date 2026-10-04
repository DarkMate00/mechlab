import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { EASE_PRECISE, PAGE_TRANSITION } from '../../lib/motion'

/**
 * Quick fade + 16px rise whenever the route changes. Enter-only on purpose: there is no
 * exit animation, so navigation never waits and the old page never lingers for screen readers.
 * Under reduced motion it is a fade with no movement at all.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduced = useReducedMotion() ?? false

  return (
    <m.div
      key={pathname}
      initial={{ opacity: 0, y: reduced ? 0 : PAGE_TRANSITION.y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: PAGE_TRANSITION.duration, ease: EASE_PRECISE }}
    >
      {children}
    </m.div>
  )
}
