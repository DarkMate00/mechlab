import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { PageContainer } from '../layout/PageContainer'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'

interface PagePlaceholderProps {
  title: string
  description: string
}

/** Temporary page body for areas that are routed but not built yet. */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  useDocumentTitle(title)

  return (
    <PageContainer>
      <Section>
        <SectionHeading level={1} title={title} description={description} />
        <p className="mt-6 text-sm text-slate-600">This section is not built yet.</p>
      </Section>
    </PageContainer>
  )
}
