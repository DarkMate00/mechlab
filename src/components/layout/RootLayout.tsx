import { Suspense, useRef, type MouseEvent } from 'react'
import { Outlet } from 'react-router'
import { useNavigationReset } from '../../hooks/useNavigationReset'
import { CustomCursor } from '../animations/CustomCursor'
import { PageTransition } from '../animations/PageTransition'
import { ScrollProgress } from '../animations/ScrollProgress'
import { Navbar } from '../navigation/Navbar'
import { LoadingScreen } from '../ui/LoadingScreen'
import { TechnicalGrid } from '../visuals/TechnicalGrid'
import { Footer } from './Footer'

const MAIN_CONTENT_ID = 'main-content'

/** Shared page frame: background, skip link, navigation, main content area, footer. */
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
    <div className="relative isolate flex min-h-dvh flex-col">
      <TechnicalGrid className="fixed inset-0 -z-10" fade="top" />
      <ScrollProgress />
      <CustomCursor />
      <a
        href={`#${MAIN_CONTENT_ID}`}
        onClick={handleSkipLink}
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[110] focus:rounded-xs focus:bg-surface-raised focus:px-4 focus:py-3 focus:text-sm focus:text-fg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id={MAIN_CONTENT_ID} ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<LoadingScreen />}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
