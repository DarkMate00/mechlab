import { Suspense, useRef, type MouseEvent } from 'react'
import { Outlet } from 'react-router'
import { useNavigationReset } from '../../hooks/useNavigationReset'
import { Navbar } from '../navigation/Navbar'
import { LoadingScreen } from '../ui/LoadingScreen'
import { Footer } from './Footer'

const MAIN_CONTENT_ID = 'main-content'

/** Shared page frame: skip link, navigation, main content area, footer. */
export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null)
  useNavigationReset(mainRef)

  // With hash routing, a plain `href="#main-content"` would be read as a route change,
  // so the skip link moves focus itself instead of relying on the anchor.
  function handleSkipLink(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    mainRef.current?.focus()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        onClick={handleSkipLink}
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id={MAIN_CONTENT_ID} ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
