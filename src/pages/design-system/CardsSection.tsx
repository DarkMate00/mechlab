import { Link } from 'react-router'
import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { EngineeringCard } from '../../components/engineering/EngineeringCard'
import { Card } from '../../components/ui/Card'
import { TechnicalLabel } from '../../components/ui/TechnicalLabel'
import { SECTIONS } from '../../data/navigation'
import { engineeringModules } from '../../data/modules'
import { DemoSection } from './DemoSection'

// The reveal transform lives on a wrapper, so it never fights the card's own hover lift.
const ITEM_CLASS = '[&>*]:h-full'

export function CardsSection() {
  const [firstModule] = engineeringModules

  return (
    <DemoSection
      index={5}
      title="Cards"
      description="Thin border, small radius, no shadows. Only cards that lead somewhere are interactive: they lift 2px, emphasise the border, draw corner marks and switch the cursor."
    >
      <StaggerContainer className="grid gap-6 md:grid-cols-3">
        <StaggerItem className={ITEM_CLASS}>
          <Card>
            <div className="flex">
              <TechnicalLabel>Static card</TechnicalLabel>
            </div>
            <h3 className="mt-6 text-h3">Not clickable</h3>
            <p className="mt-2 text-fg-muted">
              Static cards do not react to hover, so they never suggest an action that does not
              exist.
            </p>
          </Card>
        </StaggerItem>

        <StaggerItem className={ITEM_CLASS}>
          <Card interactive>
            <div className="flex">
              <TechnicalLabel tone="accent">Interactive card</TechnicalLabel>
            </div>
            <h3 className="mt-6 text-h3">
              {/* The link stretches over the whole card, so the entire card is one keyboard stop. */}
              <Link
                to={SECTIONS.fundamentals.path}
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                Clickable
              </Link>
            </h3>
            <p className="mt-2 text-fg-muted">
              Hover it, or Tab to it. The whole card is the link, and the focus state is on the
              card.
            </p>
          </Card>
        </StaggerItem>

        {firstModule ? (
          <StaggerItem className={ITEM_CLASS}>
            <EngineeringCard
              label="MODULE / 01"
              title={firstModule.title}
              status={firstModule.status}
              summary="EngineeringCard, using real module data from src/data."
            />
          </StaggerItem>
        ) : null}
      </StaggerContainer>
    </DemoSection>
  )
}
