import { useRef } from 'react'
import type { HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import { useRevealState } from '../../hooks/useRevealState'
import { getRevealVariants, REVEAL } from '../../lib/motion'
import { MOTION_TAGS, type MotionTag } from './motionTags'

type BaseProps = Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'ref'
>

interface StaggerContainerProps extends BaseProps {
  as?: MotionTag
  /** Seconds between each child starting. */
  stagger?: number
  /** Seconds before the first child starts. */
  delay?: number
  once?: boolean
  amount?: number
}

/**
 * Wraps a group of StaggerItems. When the group scrolls into view its items reveal one
 * after another. Render as "ul" with StaggerItem as "li" to keep list semantics.
 */
export function StaggerContainer({
  as = 'div',
  stagger = REVEAL.stagger,
  delay = 0,
  once = true,
  amount = 0.15,
  ...props
}: StaggerContainerProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once, amount })
  const Tag = MOTION_TAGS[as]

  return (
    <Tag
      ref={ref}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0.03 : stagger, delayChildren: delay },
        },
      }}
      initial="hidden"
      animate={state}
      {...props}
    />
  )
}

interface StaggerItemProps extends BaseProps {
  as?: MotionTag
  y?: number
  blur?: number
}

/** A child of StaggerContainer. It uses the same reveal as `Reveal`, timed by its parent. */
export function StaggerItem({ as = 'div', y, blur, ...props }: StaggerItemProps) {
  const reduced = useReducedMotion() ?? false
  const Tag = MOTION_TAGS[as]

  return <Tag variants={getRevealVariants({ reduced, y, blur })} {...props} />
}
