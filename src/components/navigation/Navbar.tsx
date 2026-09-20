import { Link, NavLink } from 'react-router'
import { NAV_ITEMS, SECTIONS } from '../../data/navigation'
import { SITE_NAME } from '../../data/site'
import { classNames } from '../../lib/utilities/classNames'
import { PageContainer } from '../layout/PageContainer'

export function Navbar() {
  return (
    <header className="border-b border-slate-200">
      <PageContainer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <Link to={SECTIONS.home.path} className="text-lg font-bold tracking-tight">
          {SITE_NAME}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === SECTIONS.home.path}
                  className={({ isActive }) =>
                    classNames(
                      'py-1 hover:underline',
                      isActive ? 'font-semibold text-slate-900' : 'text-slate-600',
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
