/**
 * Shared hover/focus language so every interactive element moves the same way:
 * fast (200ms), precise easing, and only these properties.
 */
export const INTERACTIVE_TRANSITION =
  'transition-[transform,border-color,background-color,color,opacity] duration-200 ease-precise'

/** Tiny lift on hover, removed automatically for reduced motion. */
export const HOVER_LIFT = 'motion-safe:hover:-translate-y-0.5'
