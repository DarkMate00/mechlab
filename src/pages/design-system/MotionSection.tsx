import { useState } from 'react'
import { CountUp } from '../../components/animations/CountUp'
import { Parallax } from '../../components/animations/Parallax'
import { Reveal } from '../../components/animations/Reveal'
import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { TechnicalLabel } from '../../components/ui/TechnicalLabel'
import { Crosshair } from '../../components/visuals/Crosshair'
import { DataReadout } from '../../components/visuals/DataReadout'
import { TechnicalGrid } from '../../components/visuals/TechnicalGrid'
import { DemoSection } from './DemoSection'

const STAGGER_ITEMS = ['01', '02', '03', '04'] as const

export function MotionSection() {
  // Changing the key remounts the demos, so the scroll-in animations can be replayed.
  const [replay, setReplay] = useState(0)

  return (
    <DemoSection
      index={8}
      title="Motion"
      description="Reveals combine opacity, a 30px rise and a blur that clears. Stagger spaces siblings 80ms apart. With reduced motion, everything becomes a short fade."
    >
      <div className="space-y-14">
        <div>
          <Button variant="secondary" onClick={() => setReplay((count) => count + 1)}>
            Replay animations
          </Button>
        </div>

        <div key={replay} className="space-y-14">
          <div>
            <TechnicalLabel>Reveal / delay 0, 100, 200 ms</TechnicalLabel>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              {[0, 0.1, 0.2].map((delay) => (
                <Reveal key={delay} delay={delay}>
                  <Card>
                    <p className="text-fg-muted">Delay {delay * 1000} ms</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <TechnicalLabel>Stagger / list of four</TechnicalLabel>
            <StaggerContainer as="ul" className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STAGGER_ITEMS.map((item) => (
                <StaggerItem key={item} as="li">
                  <Card>
                    <TechnicalLabel tone="accent">ITEM / {item}</TechnicalLabel>
                    <p className="mt-6 text-fg-muted">Appears after the previous one.</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <TechnicalLabel>Parallax / scroll slowly past this box</TechnicalLabel>
            <div className="surface relative mt-4 h-[26rem] overflow-hidden rounded-md">
              {/* Reference layer: moves exactly with the page. */}
              <TechnicalGrid className="absolute inset-0" fade="center" />
              {/* Far layer: lags the page (runs behind it). */}
              <Parallax
                distance={-60}
                className="absolute inset-0"
                innerClassName="grid size-full place-items-center"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 200"
                  className="size-64 text-line-strong"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="100" cy="100" r="96" />
                  <circle cx="100" cy="100" r="64" />
                  <circle cx="100" cy="100" r="4" fill="currentColor" />
                </svg>
              </Parallax>
              {/* Near layer: leads the page (runs ahead of it). */}
              <Parallax distance={110} className="absolute inset-0">
                <Crosshair size={28} className="absolute left-[16%] top-[42%] text-accent" />
                <Crosshair size={28} className="absolute right-[16%] top-[52%] text-accent" />
                <span className="absolute left-[16%] top-[42%] ml-9 font-mono text-label uppercase tracking-label text-accent">
                  Near layer
                </span>
              </Parallax>
              <span className="absolute bottom-4 left-4 font-mono text-label uppercase tracking-label text-fg-subtle">
                Grid: moves with the page
              </span>
            </div>
            <p className="mt-3 max-w-reading text-caption text-fg-subtle">
              While you scroll past, the rings lag behind the page, the crosshairs run ahead of it,
              and the grid moves with it. Parallax is off on screens under 768px and with reduced
              motion.
            </p>
          </div>

          <div>
            <TechnicalLabel>Count up / starts when visible</TechnicalLabel>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <DataReadout
                label="Sample input"
                value={<CountUp to={1284.6} decimals={1} />}
                unit="units"
              />
              <DataReadout label="Integer" value={<CountUp to={4200} />} unit="units" />
              <DataReadout
                label="Two decimals"
                value={<CountUp to={3.14} decimals={2} duration={2} />}
              />
            </div>
            <p className="mt-4 text-caption text-fg-subtle">
              Sample inputs for the animation only. They are not measurements.
            </p>
          </div>
        </div>
      </div>
    </DemoSection>
  )
}
