import { Link } from 'react-router'
import { PageContainer } from '../components/layout/PageContainer'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { SECTIONS } from '../data/navigation'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <PageContainer>
      <Section>
        <SectionHeading
          level={1}
          title="Page not found"
          description="There is nothing at this address."
        />
        <p className="mt-6">
          <Link to={SECTIONS.home.path} className="underline">
            Back to the home page
          </Link>
        </p>
      </Section>
    </PageContainer>
  )
}
