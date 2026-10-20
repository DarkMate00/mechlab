import { type MouseEvent } from 'react'
import { Section } from '../layout/Section'
import { PageContainer } from '../layout/PageContainer'
import { TechnicalLabel } from '../ui/TechnicalLabel'
import { Button, ButtonLink } from '../ui/Button'
import { Reveal } from '../animations/Reveal'
import { StaggerContainer, StaggerItem } from '../animations/Stagger'
import { DrawLine } from '../animations/DrawLine'
import { SECTIONS } from '../../data/navigation'

export function Closing() {
  function handleRevisit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const target = document.getElementById('journey-heading')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      // Shift focus for keyboard accessibility
      target.focus({ preventScroll: true })
    }
  }

  return (
    <Section className="relative z-10 pb-16 lg:pb-24">
      <PageContainer>
        <div className="flex flex-col items-center text-center">
          
          {/* Subtle Technical Geometric Lead-in */}
          <div className="mb-12 flex flex-col items-center">
            <svg 
              width="2" 
              height="80" 
              viewBox="0 0 2 80" 
              aria-hidden="true" 
              className="pointer-events-none text-line-strong"
            >
              <DrawLine d="M 1 0 L 1 80" strokeWidth="1.5" duration={1.2} />
            </svg>
            <Reveal delay={0.6}>
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent ring-4 ring-accent/20" />
            </Reveal>
          </div>

          {/* Core Content */}
          <StaggerContainer className="flex max-w-4xl flex-col items-center">
            <StaggerItem className="mb-6">
              <TechnicalLabel>END OF OVERVIEW / CONTINUE EXPLORING</TechnicalLabel>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-6 text-h1 text-fg lg:text-display">
                ENGINEERING STARTS WITH CURIOSITY.
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mb-6 text-h3 font-medium text-fg-muted">
                Explore the principles. Test the ideas. Understand the systems.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="mb-12 max-w-2xl text-body-lg text-fg-subtle">
                MECHLAB brings mathematics, physics, technical exploration, and practical problem-solving together in one evolving project.
              </p>
            </StaggerItem>

            {/* CTAs */}
            <StaggerItem className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
              <ButtonLink 
                to={SECTIONS.lab.path} 
                size="lg" 
                withArrow 
                magnetic 
                className="w-full sm:w-auto"
              >
                EXPLORE THE LAB
              </ButtonLink>
              <Button 
                onClick={handleRevisit} 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
              >
                REVISIT THE JOURNEY
              </Button>
            </StaggerItem>
          </StaggerContainer>

          {/* Optional footer-style statement */}
          <Reveal delay={0.4}>
            <div className="mt-24 flex flex-col items-center opacity-70 lg:mt-32">
              <div className="mb-6 h-[1px] w-12 bg-line-strong" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg-subtle">
                A SELF-DIRECTED ENGINEERING EXPLORATION PROJECT
              </p>
            </div>
          </Reveal>

        </div>
      </PageContainer>
    </Section>
  )
}