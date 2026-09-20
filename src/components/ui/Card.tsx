import type { HTMLAttributes } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'li'
}

export function Card({ as: Tag = 'div', className, ...props }: CardProps) {
  return (
    <Tag className={classNames('rounded-lg border border-slate-200 p-5', className)} {...props} />
  )
}
