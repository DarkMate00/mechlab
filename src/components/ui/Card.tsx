import type { HTMLAttributes } from 'react'
import { classNames } from '../../lib/utilities/classNames'
import { HOVER_LIFT, INTERACTIVE_TRANSITION } from '../../lib/utilities/interaction'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'li'
  /**
   * Adds the hover/focus response (border, lift, corner marks) and switches the custom
   * cursor to its "card" state. Only set this on cards that are actually clickable.
   */
  interactive?: boolean
}

export function Card({ as: Tag = 'div', interactive = false, className, ...props }: CardProps) {
  return (
    <Tag
      data-cursor={interactive ? 'card' : undefined}
      className={classNames(
        'surface rounded-md p-6',
        interactive && [
          'group corner-marks',
          INTERACTIVE_TRANSITION,
          HOVER_LIFT,
          'hover:border-accent/40 hover:bg-surface-raised focus-within:border-accent/40',
          // A keyboard user tabbing to the card's link sees a clear outline on the whole card.
          'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent',
        ].join(' '),
        className,
      )}
      {...props}
    />
  )
}
