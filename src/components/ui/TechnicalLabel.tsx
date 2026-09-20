import type { ReactNode } from 'react'

/** Small label for engineering metadata such as units, status or category. */
export function TechnicalLabel({ children }: { children: ReactNode }) {
  return <span className="text-xs font-medium text-slate-600">{children}</span>
}
