import type { ReactNode } from 'react'
import { classNames } from '../../lib/utilities/classNames'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

/** Centers content and applies the site-wide horizontal gutters and max width. */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={classNames('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
