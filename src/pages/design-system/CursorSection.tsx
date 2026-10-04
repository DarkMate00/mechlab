import { Link } from 'react-router'
import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { SimulationContainer } from '../../components/simulations/SimulationContainer'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { TechnicalLabel } from '../../components/ui/TechnicalLabel'
import { SECTIONS } from '../../data/navigation'
import { DemoSection } from './DemoSection'

export function CursorSection() {
  return (
    <DemoSection
      index={7}
      title="Custom cursor"
      description="On a mouse or trackpad the ring trails the pointer and reacts to what is under it. On touch devices the real pointer is untouched. Text fields keep the native caret."
    >
      <StaggerContainer className="grid gap-6 md:grid-cols-2">
        <StaggerItem className="[&>*]:h-full">
          <Card>
            <TechnicalLabel>Default, link, button</TechnicalLabel>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Link
                to={SECTIONS.about.path}
                className="underline decoration-line-strong underline-offset-4 hover:decoration-accent"
              >
                A text link
              </Link>
              <Button variant="secondary">A button</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
            <div className="mt-8">
              <label htmlFor="cursor-test-input" className="text-caption text-fg-muted">
                Text field (native caret)
              </label>
              <input
                id="cursor-test-input"
                type="text"
                placeholder="Type here"
                className="mt-2 block min-h-11 w-full rounded-xs border border-line-strong bg-surface-raised px-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:border-accent"
              />
            </div>
          </Card>
        </StaggerItem>

        <StaggerItem className="[&>*]:h-full">
          <SimulationContainer
            title="Simulation surface"
            description="Cursor state over a simulation stage."
          >
            <div className="grid h-40 place-items-center">
              <TechnicalLabel>Move the pointer here</TechnicalLabel>
            </div>
          </SimulationContainer>
        </StaggerItem>
      </StaggerContainer>
    </DemoSection>
  )
}
