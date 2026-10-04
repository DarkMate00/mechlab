import { INTERACTIVE_TRANSITION } from '../../lib/utilities/interaction'
import { classNames } from '../../lib/utilities/classNames'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

const BASE =
  'group inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xs font-medium active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-strong',
  secondary:
    'border border-line-strong text-fg hover:border-accent/60 hover:bg-surface-hover',
  ghost: 'text-fg-muted hover:text-fg',
}

// Minimum 44px tall so touch targets stay comfortable.
const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-body',
}

/** One source of truth for button appearance, shared by Button (button) and ButtonLink (link). */
export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return classNames(
    BASE,
    INTERACTIVE_TRANSITION,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  )
}
