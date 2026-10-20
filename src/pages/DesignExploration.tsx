// src/pages/DesignExploration.tsx
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'

// Corrected import paths to point to the components directory
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/animations/Reveal'
import { StaggerContainer, StaggerItem } from '../components/animations/Stagger'
import { DrawLine } from '../components/animations/DrawLine'

function TorqueVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <path d="M 60 120 L 80 120 L 70 100 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <circle cx="70" cy="100" r="2.5" fill="currentColor" className="text-accent" />
      <text x="70" y="140" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">PIVOT</text>
      <DrawLine d="M 70 100 L 220 100" strokeWidth="2" className="text-fg" duration={1.5} />
      <text x="145" y="90" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">ARM (r)</text>
      <DrawLine d="M 220 100 L 220 145" strokeWidth="1.5" className="text-accent" delay={0.3} />
      <path d="M 216 140 L 220 145 L 224 140" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="235" y="125" textAnchor="start" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">FORCE (F)</text>
      <path d="M 100 100 A 30 30 0 0 0 70 70" fill="none" stroke="currentColor" strokeWidth="1" className="text-line-strong" strokeDasharray="3 3" />
      <path d="M 66 74 L 70 70 L 74 74" fill="none" stroke="currentColor" className="text-line-strong" strokeWidth="1" />
    </svg>
  )
}

function BeamVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <path d="M 50 100 Q 150 135 250 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-line-strong" strokeDasharray="4 4" />
      <text x="150" y="130" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">DEFLECTION</text>
      <DrawLine d="M 50 100 L 250 100" strokeWidth="3" className="text-fg" duration={1.5} />
      <path d="M 50 100 L 40 120 L 60 120 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <path d="M 250 100 L 240 115 L 260 115 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <circle cx="245" cy="118" r="3" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1" />
      <circle cx="255" cy="118" r="3" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1" />
      <DrawLine d="M 150 40 L 150 95" strokeWidth="1.5" className="text-accent" delay={0.3} />
      <path d="M 146 90 L 150 95 L 154 90" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="150" y="30" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">LOAD</text>
    </svg>
  )
}

function GearVisual() {
  const reduced = useReducedMotion() ?? false
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <m.g 
        animate={reduced ? {} : { rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} 
        style={{ originX: '110px', originY: '80px' }}
      >
        <circle cx="110" cy="80" r="32" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="6 4" className="text-accent" />
        <circle cx="110" cy="80" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
        <circle cx="110" cy="80" r="6" fill="currentColor" className="text-fg-subtle" />
        <path d="M 110 80 L 110 52" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      </m.g>

      <m.g 
        animate={reduced ? {} : { rotate: -360 }} 
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} 
        style={{ originX: '172px', originY: '80px' }}
      >
        <circle cx="172" cy="80" r="22" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="6 4.6" className="text-fg-subtle" />
        <circle cx="172" cy="80" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
        <circle cx="172" cy="80" r="4" fill="currentColor" className="text-fg-subtle" />
        <path d="M 172 80 L 172 62" stroke="currentColor" strokeWidth="1.5" className="text-line-strong" />
      </m.g>
    </svg>
  )
}

function ThermalVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <rect x="110" y="55" width="80" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-line-strong" />
      <text x="150" y="83" textAnchor="middle" fill="currentColor" className="text-fg font-mono text-[0.55rem] uppercase tracking-widest">BOUNDARY</text>
      
      <DrawLine d="M 150 20 L 150 50" strokeWidth="2" className="text-warn" duration={1} />
      <polygon points="150,55 146,47 154,47" fill="currentColor" className="text-warn" />
      <text x="150" y="15" textAnchor="middle" fill="currentColor" className="text-warn font-mono text-[0.55rem] uppercase tracking-widest">HEAT IN</text>
      
      <DrawLine d="M 195 80 L 235 80" strokeWidth="2" className="text-accent" delay={0.4} duration={1} />
      <polygon points="240,80 232,76 232,84" fill="currentColor" className="text-accent" />
      <text x="250" y="98" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">OUTPUT</text>
    </svg>
  )
}

const CARDS = [
  {
    id: 'torque-analysis',
    index: '01',
    title: 'TORQUE ANALYSIS',
    category: 'FORCE / ROTATION',
    description: 'Explore how applied force and distance from a pivot influence rotational effect.',
    visual: <TorqueVisual />
  },
  {
    id: 'beam-behaviour',
    index: '02',
    title: 'BEAM BEHAVIOUR',
    category: 'LOAD / STRUCTURAL RESPONSE',
    description: 'Investigate how loading affects a beam and how support conditions influence its behaviour.',
    visual: <BeamVisual />
  },
  {
    id: 'gear-system-study',
    index: '03',
    title: 'GEAR SYSTEM STUDY',
    category: 'ROTATION / TRANSMISSION',
    description: 'Explore how connected gears influence rotational speed and torque.',
    visual: <GearVisual />
  },
  {
    id: 'thermal-systems',
    index: '04',
    title: 'THERMAL SYSTEMS',
    category: 'HEAT / ENERGY TRANSFER',
    description: 'Understand how heat moves through a system and how energy conversion affects efficiency.',
    visual: <ThermalVisual />
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
              title="DESIGN & EXPLORATION"
              description="Engineering principles become more meaningful when they are used to investigate real problems, test ideas, and understand how systems behave."
            />
          </div>
        </Reveal>

        {/* 4-Card Grid Layout */}
        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
                  <div className="flex flex-1 flex-col p-6 sm:p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-accent">
                        {card.index}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                        {card.category}
                      </span>
                    </div>
                    <h3 className="m-0 mb-3 text-h3 text-fg">{card.title}</h3>
                    <p className="text-body text-fg-muted">
                      {card.description}
                    </p>
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