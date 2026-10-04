import { useEffect, useState } from 'react'
import { useReducedMotion, useScroll, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { classNames } from '../../lib/utilities/classNames'

/**
 * A 2px accent line at the top of the viewport that fills as the page is scrolled.
 * - Purely visual (aria-hidden).
 * - Only shown when the page can actually scroll; on short pages "100% scrolled" would be
 *   meaningless, so it stays hidden.
 * - Smoothed with a spring, unless reduced motion is on, in which case it tracks the scroll
 *   position directly.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    const update = () =>
      setScrollable(document.documentElement.scrollHeight - window.innerHeight > 1)

    // Content height changes on every route/lazy load; the window resize covers viewport changes.
    // (ResizeObserver also reports the initial size right after observe(), so no manual first call.)
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : smoothed }}
      className={classNames(
        'pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent transition-opacity duration-200',
        scrollable ? 'opacity-100' : 'opacity-0',
      )}
    />
  )
}
