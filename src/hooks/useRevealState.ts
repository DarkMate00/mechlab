import { useEffect, useState, type RefObject } from 'react'
import { useInView } from 'motion/react'
import { REVEAL } from '../lib/motion'

interface RevealStateOptions {
  once?: boolean
  /** Fraction of the element (0-1) that must be inside the trigger area. */
  amount?: number
}

/**
 * Decides when a scroll-triggered animation should play. Returns "hidden" or "visible".
 *
 * The trigger area is the viewport minus a band along the bottom edge (REVEAL.margin), so
 * animations start where people are actually looking instead of at the very edge of the screen.
 * Anything already on screen at mount (including inside that bottom band) is revealed straight
 * away, so content on a page that cannot scroll can never stay hidden.
 */
export function useRevealState(
  ref: RefObject<Element | null>,
  { once = true, amount = 0.2 }: RevealStateOptions = {},
): 'hidden' | 'visible' {
  const inView = useInView(ref, { once, amount, margin: REVEAL.margin })
  const [onScreenAtMount, setOnScreenAtMount] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const element = ref.current
      if (element && element.getBoundingClientRect().top < window.innerHeight) {
        setOnScreenAtMount(true)
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [ref])

  return inView || (once && onScreenAtMount) ? 'visible' : 'hidden'
}
