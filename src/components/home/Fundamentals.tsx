import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { Section } from '../layout/Section'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../layout/SectionHeading'
import { Card } from '../ui/Card'
import { Reveal } from '../animations/Reveal'
import { StaggerContainer, StaggerItem } from '../animations/Stagger'
import { DrawLine } from '../animations/DrawLine'

function MechanicsVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <path d="M 30 120 L 270 120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-line-strong" fill="none" />
      <DrawLine d="M 110 60 L 190 60 L 190 120 L 110 120 Z" duration={1.5} className="text-fg" strokeWidth="1.5" />
      <DrawLine d="M 150 60 L 150 20 M 145 27 L 150 20 L 155 27" delay={0.3} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 150 120 L 150 150 M 145 143 L 150 150 L 155 143" delay={0.4} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 190 90 L 240 90 M 233 85 L 240 90 L 233 95" delay={0.5} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 110 120 L 60 120 M 67 115 L 60 120 L 67 125" delay={0.6} className="text-fg-subtle" strokeWidth="1.5" />
      <circle cx="150" cy="90" r="2" fill="currentColor" className="text-accent" />
    </svg>
  )
}

function ThermoVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <path d="M 100 20 L 200 20 L 200 40 L 100 40 Z" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" fill="none" />
      <path d="M 100 120 L 200 120 L 200 140 L 100 140 Z" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" fill="none" />
      <circle cx="150" cy="80" r="18" stroke="currentColor" strokeWidth="1.5" className="text-fg" fill="none" />
      <DrawLine d="M 150 40 L 150 62 M 145 55 L 150 62 L 155 55" delay={0.3} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 150 98 L 150 120 M 145 113 L 150 120 L 155 113" delay={0.5} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 168 80 L 230 80 M 223 75 L 230 80 L 223 85" delay={0.4} className="text-accent" strokeWidth="1.5" />
    </svg>
  )
}

function FluidsVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <DrawLine d="M 20 40 L 100 40 L 130 65 L 170 65 L 200 40 L 280 40" duration={1.5} className="text-fg-subtle" strokeWidth="1.5" />
      <DrawLine d="M 20 120 L 100 120 L 130 95 L 170 95 L 200 120 L 280 120" duration={1.5} className="text-fg-subtle" strokeWidth="1.5" />
      <DrawLine d="M 20 60 L 100 60 L 130 72 L 170 72 L 200 60 L 280 60 M 273 55 L 280 60 L 273 65" delay={0.3} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 20 80 L 100 80 L 130 80 L 170 80 L 200 80 L 280 80 M 273 75 L 280 80 L 273 85" delay={0.4} className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 20 100 L 100 100 L 130 88 L 170 88 L 200 100 L 280 100 M 273 95 L 280 100 L 273 105" delay={0.5} className="text-accent" strokeWidth="1.5" />
      <path d="M 60 40 L 60 30 M 150 65 L 150 55 M 240 40 L 240 30" stroke="currentColor" strokeWidth="1" className="text-line-strong" fill="none" />
    </svg>
  )
}

function MaterialsVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <path d="M 60 110 L 50 130 L 70 130 Z M 40 130 L 80 130" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      <path d="M 240 110 L 230 130 L 250 130 Z M 220 130 L 260 130" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      <DrawLine d="M 40 90 L 260 90 L 260 110 L 40 110 Z" duration={1.5} className="text-fg" strokeWidth="1.5" />
      <path d="M 40 110 Q 150 135 260 110" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-line-strong" />
      <DrawLine d="M 150 30 L 150 80 M 145 73 L 150 80 L 155 73" delay={0.3} className="text-accent" strokeWidth="1.5" />
    </svg>
  )
}

const DOMAINS = [
  {
    id: '01',
    title: 'MECHANICS',
    label: 'FORCE / MOTION / EQUILIBRIUM',
    description: 'Understand how forces, motion, equilibrium, and energy determine the behaviour of physical systems.',
    visual: <MechanicsVisual />
  },
  {
    id: '02',
    title: 'THERMODYNAMICS',
    label: 'HEAT / WORK / ENERGY',
    description: 'Explore heat transfer, work, energy conversion, and the principles behind system efficiency.',
    visual: <ThermoVisual />
  },
  {
    id: '03',
    title: 'FLUID SYSTEMS',
    label: 'PRESSURE / FLOW / BEHAVIOUR',
    description: 'Investigate how fluids move and how pressure, flow, and system conditions influence their behaviour.',
    visual: <FluidsVisual />
  },
  {
    id: '04',
    title: 'MATERIALS & STRUCTURES',
    label: 'STRESS / STRENGTH / DEFORMATION',
    description: 'Examine how material properties and structural loads influence strength, deformation, and performance.',
    visual: <MaterialsVisual />
  }
]

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30, mass: 0.5 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30, mass: 0.5 })

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType === 'touch' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(relX * 10)
    rotateX.set(relY * -10)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="h-full w-full"
    >
      {children}
    </m.div>
  )
}

export function Fundamentals() {
  return (
    <Section labelledBy="fundamentals-heading" className="relative z-10 scroll-mt-24">
      <PageContainer>
        <Reveal>
          <div className="mb-16 md:mb-20 lg:mb-24">
            <SectionHeading
              id="fundamentals-heading"
              label="THE PRINCIPLES BEHIND THE SYSTEMS"
              title="ENGINEERING FUNDAMENTALS"
              description="Explore the principles that explain how forces act, energy changes form, fluids behave, and materials respond to real-world demands."
            />
          </div>
        </Reveal>

        <div className="mb-8 flex items-center opacity-80">
          <div className="h-px flex-1 bg-line-strong" />
          <span className="px-4 font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">
            01—04 / CORE KNOWLEDGE DOMAINS
          </span>
          <div className="h-px flex-1 bg-line-strong" />
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {DOMAINS.map((domain) => (
            <StaggerItem key={domain.id} className="flex flex-col">
              <TiltCard>
                <Card 
                  data-cursor="card" 
                  className="group flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-line-strong hover:bg-surface-hover"
                >
                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="mb-2 flex items-baseline gap-3">
                      <span className="font-mono text-base font-medium text-accent">{domain.id}</span>
                      <h3 className="m-0 text-h3 text-fg">{domain.title}</h3>
                    </div>
                    <div className="mb-5">
                      <span className="font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">{domain.label}</span>
                    </div>
                    <p className="max-w-md text-body text-fg-muted">{domain.description}</p>
                  </div>
                  
                  <div className="relative mt-auto flex aspect-[2/1] w-full items-center justify-center border-t border-line bg-canvas/30 transition-colors group-hover:bg-canvas/60">
                    {domain.visual}
                  </div>
                </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageContainer>
    </Section>
  )
}