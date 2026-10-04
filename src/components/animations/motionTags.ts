import type { ElementType } from 'react'
import * as m from 'motion/react-m'

export type MotionTag = 'div' | 'section' | 'article' | 'ul' | 'li' | 'p' | 'span'

/** Elements the animation wrappers can render as, so semantics (lists, articles) are preserved. */
export const MOTION_TAGS: Record<MotionTag, ElementType> = {
  div: m.div,
  section: m.section,
  article: m.article,
  ul: m.ul,
  li: m.li,
  p: m.p,
  span: m.span,
}
