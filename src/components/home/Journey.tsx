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

const STAGES = [
  {
    num: '01',
    title: 'CURIOSITY',
    tag: 'ASK',
    description: 'Start with questions about how forces, motion, energy, materials, and everyday systems behave.',
  },
  {
    num: '02',
    title: 'LEARNING',
    tag: 'UNDERSTAND',
    description: 'Build a foundation by studying mathematical and scientific principles and connecting them to practical examples.',
  },
  {
    num: '03',
    title: 'EXPERIMENTATION',
    tag: 'EXPLORE',
    description: 'Use calculations, simplified models, and interactive tools to investigate how changing variables affects a system.',
  },
  {
    num: '04',
    title: 'DESIGN',
    tag: 'APPLY',
    description: 'Use what has been learned to analyse problems, compare possibilities, and explore potential solutions.',
  },
  {
    num: '05',
    title: 'ENGINEERING STUDY',
    tag: 'NEXT STEP',
    description: 'Continue developing technical knowledge, analytical thinking, and problem-solving skills through undergraduate engineering education.',
  },
]

// Reusable tilt wrapper (matches exact math from Stage 06)
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

export function Journey() {
  return (
    <Section labelledBy="journey-heading" className="relative z-10 scroll-mt-24">
      <PageContainer>
        {/* Header Block */}
        <Reveal>
          <div className="mb-16 md:mb-20 lg:mb-24">
            <SectionHeading
              id="journey-heading"
              label="07 / THE JOURNEY"
              title="FROM CURIOSITY TO ENGINEERING"
              description="MECHLAB is a self-directed project built around a simple idea: understand the principles, explore how they work, and use that knowledge to investigate real-world systems. It represents an ongoing journey of learning, experimentation, and preparation for further engineering study."
            />
          </div>
        </Reveal>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Background Connecting Line (Desktop: Horizontal) */}
          {/* Placed vertically in the middle of the nodes (top 24px) spanning from the 1st node's center to the 5th node's center */}
          <div className="absolute left-[10%] right-[10%] top-[23px] -z-10 hidden h-[2px] lg:block">
            <svg width="100%" height="100%" viewBox="0 0 100 2" preserveAspectRatio="none" className="pointer-events-none text-line-strong">
              <DrawLine d="M 0 1 L 100 1" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Background Connecting Line (Mobile/Tablet: Vertical) */}
          {/* Centered mathematically with the 48px nodes on the left side */}
          <div className="absolute bottom-[24px] left-[23px] top-[24px] -z-10 block w-[2px] lg:hidden">
            <svg width="100%" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none" className="pointer-events-none text-line-strong">
              <DrawLine d="M 1 0 L 1 100" strokeWidth="1.5" />
            </svg>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-6">
            {STAGES.map((stage) => (
              <StaggerItem key={stage.num} className="relative flex flex-row items-start lg:flex-col lg:items-center">
                
                {/* Timeline Node */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas transition-colors duration-300 lg:mb-6">
                  <span className="font-mono text-sm font-medium text-accent">
                    {stage.num}
                  </span>
                </div>

                {/* Card Content */}
                <div className="ml-6 flex flex-1 flex-col lg:ml-0 lg:w-full">
                  <TiltCard>
                    <Card 
                      data-cursor="card" 
                      className="group flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-line-strong hover:bg-surface-hover lg:px-5 lg:py-6"
                    >
                      <div className="mb-4">
                        <span className="font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">
                          {stage.tag}
                        </span>
                      </div>
                      
                      {/* Using text-base instead of text-h3 to prevent awkward wrapping in the narrow 5-column desktop layout */}
                      <h3 className="m-0 mb-3 text-base font-semibold text-fg">
                        {stage.title}
                      </h3>
                      
                      <p className="text-sm text-fg-muted">
                        {stage.description}
                      </p>
                    </Card>
                  </TiltCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </PageContainer>
    </Section>
  )
}