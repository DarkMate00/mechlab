import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  /** Fraction of the pointer offset to follow (0-1). */
  strength?: number
  /** Maximum movement in px. */
  max?: number
}

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value))

/**
 * Nudges its child a few pixels toward the pointer. Use sparingly, on primary calls to action
 * only. Inactive for touch input and reduced motion.
 */
export function Magnetic({ children, strength = 0.25, max = 6 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion() ?? false
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY)
  const enabled = hasFinePointer && !reduced

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 })

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (!enabled || !ref.current) return
    // The outer span never moves, so the offset is measured against a stable box.
    const rect = ref.current.getBoundingClientRect()
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * strength, max))
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * strength, max))
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className="inline-flex"
    >
      <m.span style={{ x: springX, y: springY }} className="inline-flex">
        {children}
      </m.span>
    </span>
  )
}
