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
import { useRevealState } from '../../hooks/useRevealState'

function PowerVisual() {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once: true, amount: 0.5 })
  const isVisible = state === 'visible'

  return (
    <svg ref={ref} viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* Shafts */}
      <path d="M 30 80 L 120 80 M 180 80 L 270 80" stroke="currentColor" strokeWidth="4" className="text-fg-subtle" fill="none" />
      {/* Center Gearbox / Coupling */}
      <rect x="120" y="55" width="20" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
      <rect x="160" y="55" width="20" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
      <path d="M 140 70 L 160 70 M 140 90 L 160 90" stroke="currentColor" strokeWidth="1.5" className="text-line-strong" />
      
      {/* Input Rotation Indicator */}
      <m.g 
        initial={{ rotate: 0 }}
        animate={{ rotate: reduced || !isVisible ? 0 : 180 }} 
        transition={{ duration: 2, ease: 'easeOut' }} 
        style={{ originX: '50%', originY: '50%' }}
      >
        {/* Invisible bounding circle forces perfect centering */}
        <circle cx="75" cy="80" r="30" fill="transparent" />
        <path d="M 75 50 A 30 30 0 0 1 105 80" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <polygon points="105,82 101,74 109,74" fill="currentColor" className="text-accent" />
      </m.g>

      {/* Output Rotation Indicator */}
      <m.g 
        initial={{ rotate: 0 }}
        animate={{ rotate: reduced || !isVisible ? 0 : 180 }} 
        transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }} 
        style={{ originX: '50%', originY: '50%' }}
      >
        {/* Invisible bounding circle forces perfect centering */}
        <circle cx="225" cy="80" r="30" fill="transparent" />
        <path d="M 225 50 A 30 30 0 0 1 255 80" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <polygon points="255,82 251,74 259,74" fill="currentColor" className="text-accent" />
      </m.g>
    </svg>
  )
}

function GearsVisual() {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once: true, amount: 0.5 })
  const isVisible = state === 'visible'

  return (
    <svg ref={ref} viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* Left Gear (Driver) */}
      <m.g 
        initial={{ rotate: 0 }}
        animate={{ rotate: reduced || !isVisible ? 0 : 180 }} 
        transition={{ duration: 2.5, ease: 'easeOut' }} 
        style={{ originX: '50%', originY: '50%' }}
      >
        <circle cx="110" cy="80" r="32" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="6 4" className="text-accent" />
        <circle cx="110" cy="80" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
        <circle cx="110" cy="80" r="6" fill="currentColor" className="text-fg-subtle" />
        {/* Alignment spoke for visual rotation tracking */}
        <path d="M 110 80 L 110 52" stroke="currentColor" strokeWidth="1.5" className="text-fg-subtle" />
      </m.g>

      {/* Right Gear (Driven - smaller, rotates proportionally faster in opposite direction) */}
      <m.g 
        initial={{ rotate: 0 }}
        animate={{ rotate: reduced || !isVisible ? 0 : -261.8 }} 
        transition={{ duration: 2.5, ease: 'easeOut' }} 
        style={{ originX: '50%', originY: '50%' }}
      >
        <circle cx="172" cy="80" r="22" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="6 4.6" className="text-fg-subtle" />
        <circle cx="172" cy="80" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg" />
        <circle cx="172" cy="80" r="4" fill="currentColor" className="text-fg-subtle" />
        {/* Alignment spoke */}
        <path d="M 172 80 L 172 62" stroke="currentColor" strokeWidth="1.5" className="text-line-strong" />
      </m.g>
    </svg>
  )
}

function BrakesVisual() {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once: true, amount: 0.5 })
  const isVisible = state === 'visible'

  return (
    <svg ref={ref} viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* Brake Disc */}
      <m.g 
        initial={{ rotate: 0 }}
        animate={{ rotate: reduced || !isVisible ? 0 : 720 }} 
        transition={{ duration: 3.5, ease: 'circOut' }} 
        style={{ originX: '50%', originY: '50%' }}
      >
        <circle cx="150" cy="80" r="45" fill="none" stroke="currentColor" strokeWidth="14" className="text-fg-subtle" />
        <circle cx="150" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-line-strong" />
        {/* Ventilation slots */}
        <path d="M 150 40 L 150 50 M 150 110 L 150 120 M 110 80 L 120 80 M 180 80 L 190 80" stroke="var(--color-canvas)" strokeWidth="2.5" />
      </m.g>

      {/* Brake Caliper (Static) */}
      <path d="M 115 32 L 185 32 L 185 52 Q 150 40 115 52 Z" fill="currentColor" className="text-fg" />
      
      {/* Friction/Force Indicators (Fade in as brakes apply) */}
      <m.g
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced || !isVisible ? 0 : 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <path d="M 125 50 L 175 50" stroke="currentColor" strokeWidth="2" className="text-accent" />
        <path d="M 135 25 L 135 32 M 165 25 L 165 32" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <polygon points="135,32 132,27 138,27" fill="currentColor" className="text-accent" />
        <polygon points="165,32 162,27 168,27" fill="currentColor" className="text-accent" />
      </m.g>
    </svg>
  )
}

function ThermalVisual() {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(ref, { once: true, amount: 0.5 })
  const isVisible = state === 'visible'

  return (
    <svg ref={ref} viewBox="0 0 300 160" aria-hidden="true" className="pointer-events-none h-full w-full">
      {/* System Boundary */}
      <rect x="110" y="60" width="80" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-line-strong" />
      <text x="150" y="88" textAnchor="middle" fill="currentColor" className="text-fg font-mono text-[0.6rem] uppercase tracking-widest">SYSTEM</text>
      
      {/* Heat In */}
      <DrawLine d="M 150 20 L 150 55" strokeWidth="2" className="text-warn" duration={1} />
      <m.polygon initial={{ opacity: 0 }} animate={{ opacity: reduced || !isVisible ? 0 : 1 }} transition={{ delay: 0.9 }} points="150,60 146,52 154,52" fill="currentColor" className="text-warn" />
      
      {/* Useful Work Out */}
      <DrawLine d="M 195 85 L 235 85" strokeWidth="2" className="text-accent" delay={0.6} duration={1} />
      <m.polygon initial={{ opacity: 0 }} animate={{ opacity: reduced || !isVisible ? 0 : 1 }} transition={{ delay: 1.5 }} points="240,85 232,81 232,89" fill="currentColor" className="text-accent" />
      
      {/* Heat Loss */}
      <DrawLine d="M 150 115 L 150 140" strokeWidth="1.5" className="text-fg-subtle" delay={1.2} duration={1} />
      <m.polygon initial={{ opacity: 0 }} animate={{ opacity: reduced || !isVisible ? 0 : 1 }} transition={{ delay: 2.1 }} points="150,145 146,137 154,137" fill="currentColor" className="text-fg-subtle" />
    </svg>
  )
}

const SYSTEMS = [
  {
    id: 'power-motion',
    title: 'POWER & MOTION',
    label: 'ENERGY / MOTION / TRANSFER',
    description: 'Explore how energy is transferred and converted into motion, and how forces influence the movement of physical systems.',
    visual: <PowerVisual />
  },
  {
    id: 'gear-systems',
    title: 'GEAR SYSTEMS',
    label: 'ROTATION / TORQUE / SPEED',
    description: 'Discover how connected gears transmit rotation and trade speed for torque, depending on their relative sizes and arrangement.',
    visual: <GearsVisual />
  },
  {
    id: 'braking-systems',
    title: 'BRAKING SYSTEMS',
    label: 'FORCE / FRICTION / CONTROL',
    description: 'Understand how braking systems use applied force and friction to reduce motion and control the movement of a system.',
    visual: <BrakesVisual />
  },
  {
    id: 'thermal-systems',
    title: 'THERMAL SYSTEMS',
    label: 'HEAT / ENERGY / EFFICIENCY',
    description: 'Explore how heat flows through systems, how energy is converted, and why thermal efficiency matters in practical engineering.',
    visual: <ThermalVisual />
  }
]

// Reusable tilt wrapper
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

export function RealLife() {
  return (
    <Section labelledBy="real-life-heading" className="relative z-10 scroll-mt-24">
      <PageContainer>
        {/* Header Block */}
        <Reveal>
          <div className="mb-16 md:mb-20 lg:mb-24">
            <SectionHeading
              id="real-life-heading"
              label="FROM PRINCIPLES TO PRACTICAL SYSTEMS"
              title="ENGINEERING IN REAL LIFE"
              description="Engineering principles become easier to understand when we see how forces, energy, motion, and materials interact in real systems. Explore the ideas behind the machines and technologies we encounter every day."
            />
          </div>
        </Reveal>

        {/* 2x2 Grid Layout */}
        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {SYSTEMS.map((system) => (
            <StaggerItem key={system.id} className="flex flex-col">
              <TiltCard>
                <Card 
                  data-cursor="card" 
                  className="group flex h-full flex-col overflow-hidden p-0 transition-colors duration-300 hover:border-line-strong hover:bg-surface-hover"
                >
                  {/* Visual Graphic Area (Top) */}
                  <div className="relative flex aspect-[2/1] w-full items-center justify-center border-b border-line bg-canvas/30 transition-colors group-hover:bg-canvas/60">
                    {system.visual}
                  </div>

                  {/* Content Area (Bottom) */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="mb-2">
                      <span className="font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">
                        {system.label}
                      </span>
                    </div>
                    <h3 className="m-0 mb-4 text-h3 text-fg">{system.title}</h3>
                    <p className="text-body text-fg-muted">
                      {system.description}
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