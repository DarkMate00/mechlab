import { PageContainer } from '../components/layout/PageContainer'
import { EngineeringBadge } from '../components/visuals/EngineeringBadge'
import { TechnicalGrid } from '../components/visuals/TechnicalGrid'
import { TechnicalLabel } from '../components/ui/TechnicalLabel'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ButtonsSection } from './design-system/ButtonsSection'
import { CardsSection } from './design-system/CardsSection'
import { ColorSection } from './design-system/ColorSection'
import { CursorSection } from './design-system/CursorSection'
import { EnvironmentSection } from './design-system/EnvironmentSection'
import { LabelsSection } from './design-system/LabelsSection'
import { MotionSection } from './design-system/MotionSection'
import { TypographySection } from './design-system/TypographySection'
import { VisualsSection } from './design-system/VisualsSection'

/**
 * INTERNAL PAGE: the design-system playground used to verify the Phase 2 foundation.
 * It is routed at /design-system but is not in the navigation and is not the homepage.
 */
export default function DesignSystemPage() {
  useDocumentTitle('Design System')

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <TechnicalGrid className="absolute inset-0" fade="top" rulers />
        <PageContainer className="relative py-16 md:py-24">
          <TechnicalLabel tone="accent" marker>
            MECHLAB DESIGN SYSTEM
          </TechnicalLabel>
          <h1 className="mt-6 text-display">Design System</h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <EngineeringBadge tone="accent">PHASE 2 TEST AREA</EngineeringBadge>
            <p className="text-caption text-fg-muted">
              Internal page. Not the homepage and not part of the public navigation.
            </p>
          </div>
        </PageContainer>
      </header>

      <PageContainer>
        <EnvironmentSection />
        <ColorSection />
        <TypographySection />
        <ButtonsSection />
        <CardsSection />
        <LabelsSection />
        <CursorSection />
        <MotionSection />
        <VisualsSection />
      </PageContainer>
    </>
  )
}
