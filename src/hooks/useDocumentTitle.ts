import { useEffect } from 'react'
import { SITE_NAME, SITE_TAGLINE } from '../data/site'

/** Sets the browser tab title. Pass nothing for the default (home) title. */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`
  }, [pageTitle])
}
