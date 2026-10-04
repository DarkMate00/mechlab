import { classNames } from '../../lib/utilities/classNames'

export type Status = 'online' | 'ready' | 'idle' | 'warning' | 'error'

interface StatusIndicatorProps {
  status: Status
  /** Text shown next to the dot. The dot's colour never carries meaning on its own. */
  children: string
}

const DOT_CLASSES: Record<Status, string> = {
  online: 'bg-accent animate-status-pulse',
  ready: 'bg-accent',
  idle: 'bg-fg-subtle',
  warning: 'bg-warn',
  error: 'bg-danger',
}

export function StatusIndicator({ status, children }: StatusIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-label text-fg">
      <span aria-hidden="true" className={classNames('size-1.5 rounded-full', DOT_CLASSES[status])} />
      {children}
    </span>
  )
}
