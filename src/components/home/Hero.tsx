import { type MouseEvent } from 'react'
import { Reveal } from '../animations/Reveal'
import { StaggerContainer, StaggerItem } from '../animations/Stagger'
import { Button, ButtonLink } from '../ui/Button'
import { TechnicalLabel } from '../ui/TechnicalLabel'
import { PageContainer } from '../layout/PageContainer'
import { Section } from '../layout/Section'
import { SECTIONS } from '../../data/navigation'
import { HeroSchematic } from './HeroSchematic'

export function Hero() {
  function handleScrollToJourney(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const target = document.getElementById('journey-heading')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      target.focus({ preventScroll: true })
    }
  }

  return (
    <Section>
      <PageContainer>
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
          <StaggerContainer stagger={0.12} className="max-w-reading lg:max-w-none">
            <StaggerItem>
              <TechnicalLabel tone="accent" marker>
                SYSTEM / ENGINEERING EXPLORATION
              </TechnicalLabel>
            </StaggerItem>

            <StaggerItem
              as="p"
              className="mt-6 font-mono text-h3 uppercase tracking-label text-fg-muted"
            >
              MECHLAB
            </StaggerItem>

            <StaggerItem className="mt-3">
              <h1 className="text-display lg:text-h1">
                Exploring Engineering Through Theory, Simulation &amp; Design
              </h1>
            </StaggerItem>

            <StaggerItem as="p" className="mt-6 max-w-reading text-body-lg text-fg-muted">
              A self-directed project exploring how mathematics, physics, materials, energy,
              motion, and design come together to create and improve real-world systems.
            </StaggerItem>

            <StaggerItem className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink to={SECTIONS.lab.path} size="lg" withArrow magnetic>
                EXPLORE THE LAB
              </ButtonLink>
              <Button onClick={handleScrollToJourney} variant="secondary" size="lg">
                MY ENGINEERING JOURNEY
              </Button>
            </StaggerItem>
          </StaggerContainer>

          <Reveal delay={0.2} amount={0.1}>
            <HeroSchematic />
          </Reveal>
        </div>
      </PageContainer>
    </Section>
  )
}