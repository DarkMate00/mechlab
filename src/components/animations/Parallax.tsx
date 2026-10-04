import { useRef, type ReactNode } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface ParallaxProps {
  children: ReactNode
  /**
   * Extra travel in px, in each direction, while the element crosses the viewport.
   * Positive values run ahead of the page scroll (a "near" layer); negative values lag
   * behind it (a "far" layer).
   */
  distance?: number
  /** Classes for the outer, static wrapper (position and size it here, e.g. "absolute inset-0"). */
  className?: string
  /** Classes for the moving layer inside it. Defaults to filling the wrapper. */
  innerClassName?: string
}

/**
 * Moves its children slightly slower/faster than the page while they cross the viewport,
 * for depth in decorative layers. Disabled (no movement) under reduced motion and on
 * screens narrower than 768px.
 */
export function Parallax({
  children,
  distance = 40,
  className,
  innerClassName = 'size-full',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const isWide = useMediaQuery('(min-width: 768px)')
  const enabled = isWide && !reduced

  // Measure the static wrapper, move the inner element, so the measurement isn't affected by the movement.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], enabled ? [distance, -distance] : [0, 0])

  return (
    <div ref={ref} className={className}>
      {/* A transformed element is the containing block for absolute children, so it must have a size. */}
      <m.div style={{ y }} className={innerClassName}>
        {children}
      </m.div>
    </div>
  )
}
