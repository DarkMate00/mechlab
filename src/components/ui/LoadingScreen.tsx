import { StatusIndicator } from '../visuals/StatusIndicator'

/** Shown while a lazily-loaded page is being fetched. */
export function LoadingScreen() {
  return (
    <div role="status" className="py-32 text-center">
      <StatusIndicator status="online">Loading</StatusIndicator>
    </div>
  )
}
