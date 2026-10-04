import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { Button, ButtonLink } from '../../components/ui/Button'
import { SECTIONS } from '../../data/navigation'
import { DemoSection } from './DemoSection'

export function ButtonsSection() {
  return (
    <DemoSection
      index={4}
      title="Buttons"
      description="Primary for the one main action, secondary for alternatives, ghost for low-emphasis actions. Hover, press, focus (Tab to it) and disabled states are all visible."
    >
      <StaggerContainer className="space-y-8">
        <StaggerItem className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" withArrow>
            With arrow
          </Button>
          <Button variant="secondary" withArrow>
            With arrow
          </Button>
          <Button variant="ghost" withArrow>
            With arrow
          </Button>
        </StaggerItem>

        <StaggerItem className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" withArrow magnetic>
            Magnetic large
          </Button>
          <ButtonLink to={SECTIONS.fundamentals.path} variant="secondary" withArrow>
            Link styled as button
          </ButtonLink>
        </StaggerItem>

        <StaggerItem className="flex flex-wrap items-center gap-4">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
        </StaggerItem>
      </StaggerContainer>
    </DemoSection>
  )
}
