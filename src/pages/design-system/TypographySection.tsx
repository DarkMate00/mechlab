import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { DemoSection } from './DemoSection'

const SAMPLES = [
  { token: 'text-display', className: 'text-display', text: 'Precision by design' },
  { token: 'text-h1', className: 'text-h1', text: 'Heading one' },
  { token: 'text-h2', className: 'text-h2', text: 'Heading two' },
  { token: 'text-h3', className: 'text-h3', text: 'Heading three' },
] as const

export function TypographySection() {
  return (
    <DemoSection
      index={3}
      title="Typography"
      description="Geist for reading, Geist Mono for measurements, formulas, identifiers and labels. Headings carry tight tracking; body text stays under 80 characters per line."
    >
      <StaggerContainer className="space-y-8">
        {SAMPLES.map((sample) => (
          <StaggerItem key={sample.token} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="font-mono text-label uppercase tracking-label text-fg-subtle md:pt-2">
              {sample.token}
            </p>
            <p className={sample.className}>{sample.text}</p>
          </StaggerItem>
        ))}

        <StaggerItem className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
          <p className="font-mono text-label uppercase tracking-label text-fg-subtle">
            text-body-lg / body
          </p>
          <div className="max-w-reading space-y-4">
            <p className="text-body-lg text-fg-muted">
              Large body text introduces a section. It is set in the muted text colour with a
              generous line height.
            </p>
            <p className="text-fg-muted">
              Regular body text carries explanations. Keep paragraphs short and let whitespace do
              the structuring.
            </p>
            <p className="text-caption text-fg-subtle">
              Caption text is for supporting detail such as sources and footnotes.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
          <p className="font-mono text-label uppercase tracking-label text-fg-subtle">
            font-mono / text-data
          </p>
          <div className="space-y-3 font-mono">
            <p className="text-data tabular-nums">0123456789 N·m</p>
            <p className="text-caption text-fg-muted">
              σ = F / A &nbsp;&nbsp; τ = F · r &nbsp;&nbsp; η = 1 − Tc / Th
            </p>
            <p className="text-label uppercase tracking-label text-fg-subtle">
              MODULE / 01 &nbsp; label style
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </DemoSection>
  )
}
