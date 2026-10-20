import { SITE_NAME } from '../../data/site'
import { PageContainer } from './PageContainer'

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <PageContainer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-caption text-fg-muted">
          {SITE_NAME} is a self-directed engineering exploration project..
        </p>
      </PageContainer>
    </footer>
  )
}
