import { useEffect, useMemo, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface CountUpProps {
  /** Target value. */
  to: number
  /** Starting value. */
  from?: number
  /** Animation length in seconds. */
  duration?: number
  /** Number of decimal places shown. */
  decimals?: number
  /** "inView" starts when scrolled into view; "mount" starts immediately. */
  trigger?: 'inView' | 'mount'
  /** BCP 47 locale used for number formatting. */
  locale?: string
  className?: string
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

/**
 * Animates a number from `from` to `to`. Text is written straight to the DOM each frame,
 * so it never re-renders React. Screen readers get the final value once; under reduced
 * motion the final value is shown immediately.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.4,
  decimals = 0,
  trigger = 'inView',
  locale = 'en',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion() ?? false
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const active = trigger === 'mount' || inView

  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    return (value: number) => formatter.format(value)
  }, [locale, decimals])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduced || duration <= 0) {
      node.textContent = format(to)
      return
    }
    if (!active) {
      node.textContent = format(from)
      return
    }

    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      node.textContent = format(from + (to - from) * easeOutQuart(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, reduced, duration, from, to, format])

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className ?? 'tabular-nums'}>
        {format(reduced ? to : from)}
      </span>
      <span className="sr-only">{format(to)}</span>
    </>
  )
}
