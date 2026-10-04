import { DrawLine } from '../../components/animations/DrawLine'
import { Reveal } from '../../components/animations/Reveal'
import { TechnicalLabel } from '../../components/ui/TechnicalLabel'
import { Axis } from '../../components/visuals/Axis'
import { CircularGauge } from '../../components/visuals/CircularGauge'
import { ConnectorLine } from '../../components/visuals/ConnectorLine'
import { Crosshair } from '../../components/visuals/Crosshair'
import { MeasurementTick } from '../../components/visuals/MeasurementTick'
import { TechnicalGrid } from '../../components/visuals/TechnicalGrid'
import { DemoSection } from './DemoSection'

/** Generic beam schematic used only to test line drawing. It is not a final diagram. */
const SCHEMATIC_PATHS = [
  { d: 'M40 80 H440 V100 H40 Z', delay: 0 },
  { d: 'M80 100 L60 140 H100 Z', delay: 0.5 },
  { d: 'M400 100 L380 140 H420 Z', delay: 0.6 },
  { d: 'M240 16 V74 M232 64 L240 76 L248 64', delay: 1.0 },
  { d: 'M40 172 H440 M40 164 V180 M440 164 V180', delay: 1.4 },
] as const

export function VisualsSection() {
  return (
    <DemoSection
      index={9}
      title="Engineering visuals"
      description="A small vocabulary of drawing elements: grid, rulers, registration marks, axes, leader lines, a dial and self-drawing SVG."
    >
      <div className="space-y-14">
        <Reveal>
          <TechnicalLabel>Technical grid / rulers / slow drift</TechnicalLabel>
          <div className="surface relative mt-4 h-64 overflow-hidden rounded-md">
            <TechnicalGrid className="absolute inset-0" fade="center" rulers drift />
            <Crosshair className="absolute left-6 top-6 text-accent md:left-10 md:top-10" />
            <Crosshair className="absolute bottom-6 right-6 text-accent" />
            <Axis className="absolute bottom-4 left-6 text-fg-muted md:left-10" />
          </div>
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
          <Reveal>
            <CircularGauge value={64} label="Sample value" unit="%" />
          </Reveal>
          <Reveal delay={0.15} className="space-y-8">
            <div className="max-w-xs">
              <TechnicalLabel>Measurement tick</TechnicalLabel>
              <MeasurementTick length="100%" className="mt-3 text-fg-muted" />
            </div>
            <div className="flex items-center gap-3 text-fg-muted">
              <ConnectorLine length={56} />
              <TechnicalLabel>Connector line</TechnicalLabel>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <TechnicalLabel>Line draw / test schematic</TechnicalLabel>
          <div className="surface mt-4 rounded-md p-4 md:p-8">
            <svg
              role="img"
              aria-label="Test schematic of a simply supported beam with a downward force, drawn line by line"
              viewBox="0 0 480 200"
              className="mx-auto h-auto w-full max-w-2xl text-accent"
            >
              {SCHEMATIC_PATHS.map((path) => (
                <DrawLine key={path.d} d={path.d} delay={path.delay} />
              ))}
              <text
                x="240"
                y="196"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--color-fg-muted)"
              >
                L
              </text>
            </svg>
          </div>
        </Reveal>
      </div>
    </DemoSection>
  )
}
