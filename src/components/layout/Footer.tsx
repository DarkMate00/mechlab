import { SITE_NAME } from '../../data/site'
import { PageContainer } from './PageContainer'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6 text-sm text-slate-600">
      <PageContainer>
        <p>{SITE_NAME} is a personal Mechanical Engineering project.</p>
      </PageContainer>
    </footer>
  )
}
