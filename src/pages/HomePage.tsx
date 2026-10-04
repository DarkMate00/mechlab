import { PageContainer } from '../components/layout/PageContainer'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { TechnicalLabel } from '../components/ui/TechnicalLabel'
import { SITE_NAME, SITE_TAGLINE } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle()

  return (
    <PageContainer>
      <Section>
        <SectionHeading level={1} title={SITE_NAME} description={SITE_TAGLINE} />
        <p className="mt-8">
          <TechnicalLabel marker>Phase 1 — Project Foundation</TechnicalLabel>
        </p>
      </Section>
    </PageContainer>
  )
}
