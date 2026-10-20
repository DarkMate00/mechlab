import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { Section } from '../layout/Section'
import { PageContainer } from '../layout/PageContainer'
import { SectionHeading } from '../layout/SectionHeading'
import { Card } from '../ui/Card'
import { TechnicalLabel } from '../ui/TechnicalLabel'
import { ArrowIcon } from '../ui/ArrowIcon'
import { Crosshair } from '../visuals/Crosshair'
import { Reveal } from '../animations/Reveal'
import { StaggerContainer, StaggerItem } from '../animations/Stagger'
import { DrawLine } from '../animations/DrawLine'

const STEPS = [
  {
    num: '01',
    title: 'UNDERSTAND',
    labels: 'PHYSICS / PRINCIPLES / SYSTEMS',
    desc: 'Discover the principles behind how systems behave, from forces and motion to energy and materials.',
  },
  {
    num: '02',
    title: 'EXPERIMENT',
    labels: 'CALCULATE / SIMULATE / ANALYSE',
    desc: 'Explore ideas through calculations, simulations, and comparisons to see how changing one variable can affect the whole system.',
  },
  {
    num: '03',
    title: 'BUILD',
    labels: 'DESIGN / SOLVE / IMPROVE',
    desc: 'Use what you learn to analyse practical problems and develop informed ideas for better solutions.',
  },
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

export function WhyEngineering() {
  return (
    <Section labelledBy="why-engineering-heading" className="relative z-10 scroll-mt-24">
      <PageContainer>
        <Reveal>
          <div>
            <div className="mb-4">
              <TechnicalLabel>WHY IT MATTERS / THE ENGINEERING MINDSET</TechnicalLabel>
            </div>
            <div className="mb-6">
              <SectionHeading id="why-engineering-heading" title="WHY ENGINEERING?" />
            </div>
            <p className="mb-16 max-w-3xl text-body-lg text-fg-muted md:mb-20 lg:mb-24">
              Engineering brings scientific principles into the real world. By understanding forces, motion, energy, materials, and the behaviour of systems, we can investigate how things work, analyse problems, and explore ways to make them better.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[16.66%] right-[16.66%] top-[46px] -z-10 hidden h-[2px] md:block">
            <svg width="100%" height="100%" viewBox="0 0 100 2" preserveAspectRatio="none" className="pointer-events-none text-line-strong">
              <DrawLine d="M 0 1 L 100 1" strokeWidth="1.5" />
            </svg>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-12">
            {STEPS.map((step, index) => (
              <StaggerItem key={step.num} className="relative flex flex-col">
                <TiltCard>
                  <Card 
                    data-cursor="card" 
                    className="group relative flex h-full flex-col p-6 transition-colors hover:border-line-strong hover:bg-surface-hover sm:p-8"
                  >
                    <Crosshair className="pointer-events-none absolute right-4 top-4 text-line-strong transition-colors group-hover:text-accent/50" />
                    <div className="mb-6 flex items-center gap-3">
                      <span className="font-mono text-lg font-medium text-accent">{step.num}</span>
                      <h3 className="m-0 text-h3 text-fg">{step.title}</h3>
                    </div>
                    <div className="mb-5">
                      <span className="font-mono text-[0.65rem] uppercase tracking-label text-fg-subtle">{step.labels}</span>
                    </div>
                    <p className="text-body text-fg-muted">{step.desc}</p>
                  </Card>
                </TiltCard>

                {index < STEPS.length - 1 && (
                  <>
                    <div className="pointer-events-none absolute left-full top-[46px] z-10 ml-3 hidden -translate-x-1/2 -translate-y-1/2 text-fg-subtle md:block lg:ml-6">
                      <ArrowIcon className="h-5 w-5 -rotate-90" />
                    </div>
                    <div className="pointer-events-none absolute left-6 top-full z-10 mt-4 block -translate-y-1/2 text-fg-subtle sm:left-8 md:hidden">
                      <ArrowIcon className="h-5 w-5" />
                    </div>
                  </>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Reveal>
          <div className="mt-16 text-center md:mt-20 lg:mt-24">
            <p className="font-mono text-sm tracking-wide text-fg-subtle">
              Every complex system becomes easier to understand when you start with the principles behind it.
            </p>
          </div>
        </Reveal>
      </PageContainer>
    </Section>
  )
}