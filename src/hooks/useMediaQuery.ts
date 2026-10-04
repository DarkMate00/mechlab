import { useCallback, useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/**
 * True for a precise, hover-capable pointer (mouse or trackpad) when forced-colors
 * (Windows High Contrast) is off. Mirrors the media query around the cursor CSS in index.css.
 */
export const FINE_POINTER_QUERY = '(pointer: fine) and (hover: hover) and (not (forced-colors: active))'
