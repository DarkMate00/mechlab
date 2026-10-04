/**
 * Custom cursor state helpers.
 *
 * Any element can opt in to a cursor state with data-cursor="link|button|card|simulation".
 * Without the attribute, links and buttons are detected automatically.
 *
 * Priority (first match wins):
 *  1. text fields           -> "native" (the real caret/pointer stays visible)
 *  2. disabled controls     -> "default"
 *  3. nearest data-cursor   -> that variant (so a card beats a stretched link inside it,
 *                              and a ButtonLink inside a card beats the card)
 *  4. links                 -> "link"
 *  5. buttons               -> "button"
 *  6. anything else         -> "default"
 */
export type CursorVariant = 'default' | 'link' | 'button' | 'card' | 'simulation' | 'native'

const EXPLICIT_VARIANTS: readonly CursorVariant[] = ['link', 'button', 'card', 'simulation']

/** Elements where the real pointer/caret must stay visible; the custom cursor hides itself. */
export const NATIVE_CURSOR_SELECTOR =
  'input, textarea, select, [contenteditable]:not([contenteditable="false"])'

const DISABLED_SELECTOR = ':disabled, [aria-disabled="true"]'
const BUTTON_SELECTOR = 'button, [role="button"], summary'

export function resolveCursorVariant(target: EventTarget | null): CursorVariant {
  if (!(target instanceof Element)) return 'default'

  if (target.closest(NATIVE_CURSOR_SELECTOR)) return 'native'
  if (target.closest(DISABLED_SELECTOR)) return 'default'

  const explicit = target.closest('[data-cursor]')?.getAttribute('data-cursor')
  const match = EXPLICIT_VARIANTS.find((variant) => variant === explicit)
  if (match) return match

  if (target.closest('a[href]')) return 'link'
  if (target.closest(BUTTON_SELECTOR)) return 'button'
  return 'default'
}
