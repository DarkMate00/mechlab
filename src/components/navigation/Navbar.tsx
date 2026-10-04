import { useState, type KeyboardEvent } from 'react'
import { Link, NavLink } from 'react-router'
import { NAV_ITEMS, SECTIONS } from '../../data/navigation'
import { SITE_NAME } from '../../data/site'
import { classNames } from '../../lib/utilities/classNames'
import { PageContainer } from '../layout/PageContainer'

const MENU_ID = 'primary-menu'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 14h14" />}
    </svg>
  )
}

/** Primary navigation: a horizontal bar from `md` up, a disclosure menu below it. */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') setMenuOpen(false)
  }

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md"
    >
      <PageContainer className="flex flex-wrap items-center justify-between gap-x-8">
        <Link
          to={SECTIONS.home.path}
          className="-mx-2 inline-flex min-h-14 items-center px-2 font-semibold tracking-[0.2em]"
        >
          {SITE_NAME}
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 font-mono text-label uppercase tracking-label text-fg-muted hover:text-fg md:hidden"
        >
          Menu
          <MenuIcon open={menuOpen} />
        </button>

        <nav
          id={MENU_ID}
          aria-label="Primary"
          className={classNames('w-full pb-3 md:block md:w-auto md:pb-0', menuOpen ? 'block' : 'hidden')}
        >
          <ul className="flex flex-col md:flex-row md:gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === SECTIONS.home.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    classNames(
                      'relative flex min-h-11 items-center px-2 text-sm transition-colors duration-200 md:px-3',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                      // Active marker: a short accent line under the label on desktop.
                      isActive &&
                        'after:absolute after:inset-x-3 after:bottom-1 after:hidden after:h-px after:bg-accent md:after:block',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </PageContainer>
    </header>
  )
}
