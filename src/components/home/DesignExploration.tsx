// src/components/home/DesignExploration.tsx
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

function ForceVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* Reference Axis */}
      <path d="M 150 20 L 150 140 M 60 80 L 240 80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-line-strong" fill="none" />
      <text x="245" y="83" fill="currentColor" className="text-line-strong font-mono text-[0.55rem]">x</text>
      <text x="145" y="20" fill="currentColor" className="text-line-strong font-mono text-[0.55rem]">y</text>

      {/* Central Object */}
      <rect x="125" y="55" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
      <circle cx="150" cy="80" r="2" fill="currentColor" className="text-accent" />

      {/* Force Vectors */}
      {/* Normal Force (Up) */}
      <DrawLine d="M 150 55 L 150 25" strokeWidth="1.5" className="text-accent" delay={0.2} duration={1} />
      <path d="M 147 30 L 150 25 L 153 30" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="156" y="32" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase">Fn</text>

      {/* Gravity (Down) */}
      <DrawLine d="M 150 105 L 150 135" strokeWidth="1.5" className="text-accent" delay={0.3} duration={1} />
      <path d="M 147 130 L 150 135 L 153 130" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="156" y="132" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase">Fg</text>

      {/* Applied Force (Right) */}
      <DrawLine d="M 175 80 L 225 80" strokeWidth="1.5" className="text-accent" delay={0.4} duration={1} />
      <path d="M 220 77 L 225 80 L 220 83" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="210" y="73" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase">Fa</text>

      {/* Friction (Left) */}
      <DrawLine d="M 125 105 L 85 105" strokeWidth="1.5" className="text-fg-subtle" delay={0.5} duration={1} />
      <path d="M 90 102 L 85 105 L 90 108" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <text x="95" y="98" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase">Ff</text>
    </svg>
  )
}

function StructureVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* Deflection Curve */}
      <path d="M 50 90 Q 150 120 250 90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-line-strong" />
      
      {/* Beam */}
      <DrawLine d="M 50 90 L 250 90" strokeWidth="3" className="text-fg" duration={1.5} />
      
      {/* Left Support (Pin) */}
      <path d="M 50 90 L 40 110 L 60 110 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <path d="M 35 110 L 65 110" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      
      {/* Right Support (Roller) */}
      <path d="M 250 90 L 240 105 L 260 105 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <circle cx="245" cy="108" r="3" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1" />
      <circle cx="255" cy="108" r="3" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1" />
      <path d="M 235 111 L 265 111" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />

      {/* Applied Load */}
      <DrawLine d="M 150 40 L 150 85" strokeWidth="1.5" className="text-accent" delay={0.4} />
      <path d="M 146 80 L 150 85 L 154 80" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="150" y="32" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase">LOAD</text>

      {/* Reaction Forces */}
      <DrawLine d="M 50 135 L 50 115" strokeWidth="1.5" className="text-fg-subtle" delay={0.6} />
      <path d="M 47 120 L 50 115 L 53 120" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      
      <DrawLine d="M 250 135 L 250 115" strokeWidth="1.5" className="text-fg-subtle" delay={0.6} />
      <path d="M 247 120 L 250 115 L 253 120" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
    </svg>
  )
}

function SystemVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* Grid Background */}
      <path d="M 0 40 L 300 40 M 0 80 L 300 80 M 0 120 L 300 120" stroke="currentColor" strokeWidth="1" className="text-line opacity-30" fill="none" />
      <path d="M 100 0 L 100 160 M 200 0 L 200 160" stroke="currentColor" strokeWidth="1" className="text-line opacity-30" fill="none" />

      {/* Input Node */}
      <rect x="30" y="65" width="40" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      <text x="50" y="83" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase">IN</text>

      {/* Central System Node */}
      <rect x="110" y="50" width="80" height="60" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
      <path d="M 120 60 L 180 60 M 120 70 L 180 70 M 120 80 L 160 80" stroke="currentColor" strokeWidth="1" className="text-line-strong" />
      <text x="150" y="100" textAnchor="middle" fill="currentColor" className="text-fg font-mono text-[0.55rem] uppercase">PROCESS</text>

      {/* Output Node */}
      <rect x="230" y="65" width="40" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      <text x="250" y="83" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase">OUT</text>

      {/* Connection 1 */}
      <DrawLine d="M 70 80 L 105 80" strokeWidth="1.5" className="text-accent" delay={0.2} duration={0.8} />
      <path d="M 100 77 L 105 80 L 100 83" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />

      {/* Connection 2 */}
      <DrawLine d="M 190 80 L 225 80" strokeWidth="1.5" className="text-accent" delay={0.6} duration={0.8} />
      <path d="M 220 77 L 225 80 L 220 83" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />

      {/* Feedback Loop */}
      <DrawLine d="M 250 95 L 250 130 L 150 130 L 150 110" strokeWidth="1.5" strokeDasharray="4 4" className="text-warn" delay={1.0} duration={1.5} />
      <path d="M 147 115 L 150 110 L 153 115" fill="none" stroke="currentColor" className="text-warn" strokeWidth="1.5" />
    </svg>
  )
}

const CARDS = [
  {
    id: 'force-motion',
    title: 'Force & Motion Analysis',
    label: 'MECHANICS / FORCE / MOTION',
    description: 'Explore how forces, motion, and equilibrium influence the behaviour of physical systems through simplified diagrams and calculations.',
    visual: <ForceVisual />
  },
  {
    id: 'structural-behaviour',
    title: 'Understanding Structural Behaviour',
    label: 'STRUCTURES / LOAD / MATERIALS',
    description: 'Investigate how loads, material properties, and geometry influence the response of a simplified structural element.',
    visual: <StructureVisual />
  },
  {
    id: 'systems-design',
    title: 'From System to Solution',
    label: 'SYSTEMS / ANALYSIS / DESIGN',
    description: 'Break a complex system into smaller parts, understand how they interact, and explore how systematic analysis can inform better design decisions.',
    visual: <SystemVisual />
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

export function DesignExploration() {
  return (
    <Section labelledBy="design-exploration-heading" className="relative z-10 scroll-mt-24">
      <PageContainer>
        {/* Header Block */}
        <Reveal>
          <div className="mb-16 md:mb-20 lg:mb-24">
            <SectionHeading
              id="design-exploration-heading"
              label="06 / DESIGN & EXPLORATION"
              title="FROM CONCEPT TO UNDERSTANDING"
              description="Engineering begins with questions. Explore how technical diagrams, calculations, simplified models, and systematic analysis can help turn complex ideas into understandable engineering problems."
            />
          </div>
        </Reveal>

        {/* 3-Column Layout */}
        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CARDS.map((card) => (
            <StaggerItem key={card.id} className="flex flex-col">
              <TiltCard>
                <Card 
                  data-cursor="card" 
                  className="group flex h-full flex-col overflow-hidden p-0 transition-colors duration-300 hover:border-line-strong hover:bg-surface-hover"
                >
                  {/* Visual Graphic Area (Top) */}
                  <div className="relative flex aspect-[2/1] w-full items-center justify-center border-b border-line bg-canvas/30 transition-colors group-hover:bg-canvas/60">
                    {card.visual}
                  </div>

                  {/* Content Area (Bottom) */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="mb-3">
                      <span className="font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">
                        {card.label}
                      </span>
                    </div>
                    <h3 className="m-0 mb-4 text-h3 text-fg">{card.title}</h3>
                    <p className="text-body text-fg-muted">
                      {card.description}
                    </p>
                  </div>
                </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Closing Statement */}
        <Reveal>
          <div className="mt-16 flex flex-col items-center justify-center md:mt-20 lg:mt-24">
            <div className="mb-6 h-[2px] w-12 bg-line-strong" />
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              GOOD ENGINEERING STARTS WITH UNDERSTANDING THE PROBLEM.
            </p>
          </div>
        </Reveal>
      </PageContainer>
    </Section>
  )
}