import { lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { RootLayout } from './components/layout/RootLayout'
import { SECTIONS } from './data/navigation'
import HomePage from './pages/HomePage'

// Everything except the home page is code-split so the first load stays small.
const FundamentalsPage = lazy(() => import('./pages/FundamentalsPage'))
const InteractiveLabPage = lazy(() => import('./pages/InteractiveLabPage'))
const RealLifePage = lazy(() => import('./pages/RealLifePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/**
 * HashRouter keeps the route after `#` (e.g. /mechlab/#/lab). GitHub Pages only serves real
 * files, so with normal history routing a refresh on /lab would return a 404.
 * Hash URLs always load index.html, so deep links and refreshes just work.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path={SECTIONS.fundamentals.path} element={<FundamentalsPage />} />
          <Route path={SECTIONS.lab.path} element={<InteractiveLabPage />} />
          <Route path={SECTIONS.realLife.path} element={<RealLifePage />} />
          <Route path={SECTIONS.projects.path} element={<ProjectsPage />} />
          <Route path={SECTIONS.about.path} element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
