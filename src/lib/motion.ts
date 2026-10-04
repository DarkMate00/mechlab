import type { Variants } from 'motion/react'

/**
 * Motion tokens for JavaScript-driven animation. The matching CSS easing is
 * `--ease-precise` in index.css; keep the two in sync.
 */
export const EASE_PRECISE = [0.22, 1, 0.36, 1] as const

export const REVEAL = {
  /** Start offset in px. */
  y: 30,
  /** Start blur in px. */
  blur: 8,
  duration: 0.6,
  /** Reveals under reduced motion are a short opacity fade only. */
  reducedDuration: 0.2,
  /** Delay between siblings in a stagger. */
  stagger: 0.08,
  /** Trigger area: the viewport minus 12% along the bottom, so reveals start in view, not at the edge. */
  margin: '0px 0px -12% 0px',
} as const

export const PAGE_TRANSITION = {
  duration: 0.45,
  y: 16,
} as const

interface RevealOptions {
  reduced: boolean
  y?: number
  blur?: number
  /** Seconds to wait before this element's own reveal. Leave unset inside a stagger. */
  delay?: number
}

/**
 * The site-wide reveal: opacity + small upward translation + blur reduction.
 * With reduced motion it becomes a plain quick fade (no movement, no blur).
 */
export function getRevealVariants({
  reduced,
  y = REVEAL.y,
  blur = REVEAL.blur,
  delay,
}: RevealOptions): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: REVEAL.reducedDuration } },
    }
  }

  return {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      // Drop the filter afterwards so finished elements don't keep a compositing layer.
      transitionEnd: { filter: 'none' },
      // Only set `delay` when asked for. A child's own delay would otherwise override the
      // parent's stagger (Motion applies the child's transition last), flattening the stagger.
      transition: {
        duration: REVEAL.duration,
        ease: EASE_PRECISE,
        ...(delay ? { delay } : {}),
      },
    },
  }
}
