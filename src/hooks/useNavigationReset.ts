import { useEffect, useRef, type RefObject } from 'react'
import { useLocation } from 'react-router'

/**
 * After a client-side navigation, scroll to the top and move keyboard/screen-reader focus
 * to the main content, which is what a full page load would do. Skips the first render.
 */
export function useNavigationReset(mainRef: RefObject<HTMLElement | null>): void {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, mainRef])
}
