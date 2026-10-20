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

function TorqueVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <path d="M 40 120 L 60 120 L 50 100 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <circle cx="50" cy="100" r="2.5" fill="currentColor" className="text-accent" />
      <text x="50" y="140" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">PIVOT</text>
      <DrawLine d="M 50 100 L 220 100" strokeWidth="2" className="text-fg" duration={1.5} />
      <text x="135" y="90" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">ARM (r)</text>
      <DrawLine d="M 220 100 L 220 145" strokeWidth="1.5" className="text-accent" delay={0.3} />
      <path d="M 216 140 L 220 145 L 224 140" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="235" y="125" textAnchor="start" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">FORCE (F)</text>
      <path d="M 90 100 A 40 40 0 0 0 50 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-line-strong" strokeDasharray="3 3" />
      <path d="M 46 65 L 50 60 L 54 65" fill="none" stroke="currentColor" className="text-line-strong" strokeWidth="1" />
    </svg>
  )
}

function StressVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <DrawLine d="M 70 65 L 230 65 L 230 115 L 70 115 Z" strokeWidth="1.5" className="text-fg" duration={1.5} />
      <path d="M 140 65 L 160 65 L 160 115 L 140 115 Z" fill="currentColor" stroke="none" className="text-accent opacity-10" />
      <path d="M 140 65 L 160 65 L 160 115 L 140 115 Z" fill="none" stroke="currentColor" strokeDasharray="2 2" className="text-accent opacity-50" strokeWidth="1" />
      <text x="150" y="50" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">AREA</text>
      <DrawLine d="M 70 90 L 30 90" strokeWidth="1.5" className="text-accent" delay={0.3} />
      <path d="M 35 86 L 30 90 L 35 94" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="45" y="80" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">LOAD</text>
      <DrawLine d="M 230 90 L 270 90" strokeWidth="1.5" className="text-accent" delay={0.3} />
      <path d="M 265 86 L 270 90 L 265 94" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="255" y="80" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">LOAD</text>
      <path d="M 145 90 L 155 90 M 145 75 L 155 75 M 145 105 L 155 105" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <text x="150" y="135" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">STRESS (σ)</text>
    </svg>
  )
}

function ThermalVisual() {
  return (
    <svg viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      <DrawLine d="M 100 20 L 200 20 L 200 50 L 100 50 Z" strokeWidth="1.5" className="text-warn" duration={1} />
      <text x="150" y="38" textAnchor="middle" fill="currentColor" className="text-warn font-mono text-[0.55rem] uppercase tracking-widest">HEAT IN</text>
      <DrawLine d="M 100 130 L 200 130 L 200 160 L 100 160 Z" strokeWidth="1.5" className="text-accent" duration={1} />
      <text x="150" y="148" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">HEAT OUT</text>
      <circle cx="150" cy="90" r="18" fill="none" stroke="currentColor" className="text-fg" strokeWidth="1.5" />
      <text x="150" y="93" textAnchor="middle" fill="currentColor" className="text-fg font-mono text-[0.6rem] uppercase tracking-widest">W</text>
      <DrawLine d="M 150 50 L 150 72" strokeWidth="1.5" className="text-warn" delay={0.4} />
      <path d="M 147 67 L 150 72 L 153 67" fill="none" stroke="currentColor" className="text-warn" strokeWidth="1.5" />
      <DrawLine d="M 150 108 L 150 130" strokeWidth="1.5" className="text-accent" delay={0.6} />
      <path d="M 147 125 L 150 130 L 153 125" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <DrawLine d="M 168 90 L 230 90" strokeWidth="1.5" className="text-fg" delay={0.8} />
      <path d="M 225 87 L 230 90 L 225 93" fill="none" stroke="currentColor" className="text-fg" strokeWidth="1.5" />
      <text x="210" y="82" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">WORK</text>
      <text x="115" y="93" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">ENERGY</text>
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
      <text x="50" y="135" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">SUPPORT</text>
      <path d="M 250 100 L 240 115 L 260 115 Z" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1.5" />
      <circle cx="245" cy="118" r="3" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1" />
      <circle cx="255" cy="118" r="3" fill="none" stroke="currentColor" className="text-fg-subtle" strokeWidth="1" />
      <text x="250" y="135" textAnchor="middle" fill="currentColor" className="text-fg-subtle font-mono text-[0.55rem] uppercase tracking-widest">SUPPORT</text>
      <DrawLine d="M 150 40 L 150 95" strokeWidth="1.5" className="text-accent" delay={0.3} />
      <path d="M 146 90 L 150 95 L 154 90" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
      <text x="150" y="30" textAnchor="middle" fill="currentColor" className="text-accent font-mono text-[0.55rem] uppercase tracking-widest">LOAD</text>
    </svg>
  )
}

const TOOLS = [
  {
    id: 'torque',
    title: 'Torque Analysis',
    category: 'FORCE / ROTATION',
    description: 'Explore how an applied force and its perpendicular distance from a pivot influence rotational effect.',
    formula: 'τ = r × F',
    visual: <TorqueVisual />
  },
  {
    id: 'stress',
    title: 'Stress Calculator',
    category: 'MATERIALS / LOAD',
    description: 'Investigate how applied force and cross-sectional area relate to average normal stress in a simplified member.',
    formula: 'σ = F / A',
    visual: <StressVisual />
  },
  {
    id: 'thermal',
    title: 'Thermal Systems',
    category: 'HEAT / ENERGY',
    description: 'Explore how heat transfer and energy conversion influence the behaviour and performance of engineering systems.',
    visual: <ThermalVisual />
  },
  {
    id: 'beam',
    title: 'Beam Analysis',
    category: 'STRUCTURES / DEFLECTION',
    description: 'Examine how loads and support conditions influence the behaviour and deflection of a simplified beam.',
    visual: <BeamVisual />
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

export function InteractiveLab() {
  return (
    <Section labelledBy="lab-heading" className="relative z-10 scroll-mt-24">
      <PageContainer>
        <Reveal>
          <div className="mb-16 md:mb-20 lg:mb-24">
            <SectionHeading
              id="lab-heading"
              label="EXPERIMENT / INTERACTIVE ENGINEERING"
              title="INTERACTIVE LAB"
              description="Explore engineering principles through calculations, visual experiments, and simplified models that connect scientific theory with practical problem-solving."
            />
          </div>
        </Reveal>

        <div className="mb-8 flex items-center opacity-80">
          <div className="h-px flex-1 bg-line-strong" />
          <span className="px-4 font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">
            04 TOOLS / ONE SYSTEMATIC APPROACH
          </span>
          <div className="h-px flex-1 bg-line-strong" />
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.id} className="flex flex-col">
              <TiltCard>
                <Card 
                  data-cursor="card" 
                  className="group flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-line-strong hover:bg-surface-hover"
                >
                  <div className="flex flex-col p-6 pb-0 sm:p-8 sm:pb-0">
                    <div className="mb-2">
                      <span className="font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">{tool.category}</span>
                    </div>
                    <h3 className="m-0 text-h3 text-fg">{tool.title}</h3>
                  </div>

                  <div className="relative my-6 flex aspect-[2/1] w-full items-center justify-center border-y border-line bg-canvas/30 transition-colors group-hover:bg-canvas/60">
                    {tool.visual}
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
                    {tool.formula && (
                      <div className="mb-3 font-mono text-sm font-medium text-accent">{tool.formula}</div>
                    )}
                    <p className="text-body text-fg-muted">{tool.description}</p>
                    
                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle transition-colors group-hover:text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-line-strong transition-colors group-hover:bg-accent" />
                        TOOL PREVIEW
                      </span>
                    </div>
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