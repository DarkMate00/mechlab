import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { StaggerContainer, StaggerItem } from '../animations/Stagger'
import { PageContainer } from '../layout/PageContainer'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { TechnicalLabel } from './TechnicalLabel'

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
        {/* The heading block, then the status label, enter one after the other. */}
        <StaggerContainer stagger={0.14}>
          <StaggerItem>
            <SectionHeading level={1} title={title} description={description} />
          </StaggerItem>
          <StaggerItem as="p" className="mt-8">
            <TechnicalLabel marker>Not built yet</TechnicalLabel>
          </StaggerItem>
        </StaggerContainer>
      </Section>
    </PageContainer>
  )
}
