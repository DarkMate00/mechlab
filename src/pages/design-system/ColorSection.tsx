import { useState } from 'react'
import { Reveal } from '../../components/animations/Reveal'
import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { DemoSection } from './DemoSection'

interface Swatch {
  name: string
  role: string
  /** Full class name so Tailwind can see it. */
  swatchClass: string
}

const SURFACES: readonly Swatch[] = [
  { name: 'canvas', role: 'Page background', swatchClass: 'bg-canvas' },
  { name: 'surface', role: 'Cards, panels', swatchClass: 'bg-surface' },
  { name: 'surface-raised', role: 'Hover, inset areas', swatchClass: 'bg-surface-raised' },
  { name: 'surface-hover', role: 'Hover on raised', swatchClass: 'bg-surface-hover' },
]

const TEXT_AND_LINES: readonly Swatch[] = [
  { name: 'fg', role: 'Primary text', swatchClass: 'bg-fg' },
  { name: 'fg-muted', role: 'Secondary text', swatchClass: 'bg-fg-muted' },
  { name: 'fg-subtle', role: 'Labels, metadata', swatchClass: 'bg-fg-subtle' },
  { name: 'line', role: 'Hairline borders', swatchClass: 'bg-line' },
  { name: 'line-strong', role: 'Emphasised borders', swatchClass: 'bg-line-strong' },
]

const ACCENT: readonly Swatch[] = [
  { name: 'accent', role: 'The one accent', swatchClass: 'bg-accent' },
  { name: 'accent-strong', role: 'Accent hover', swatchClass: 'bg-accent-strong' },
  { name: 'warn', role: 'Status: warning only', swatchClass: 'bg-warn' },
  { name: 'danger', role: 'Status: error only', swatchClass: 'bg-danger' },
]

const GROUPS = [
  { title: 'Surfaces', swatches: SURFACES },
  { title: 'Text and lines', swatches: TEXT_AND_LINES },
  { title: 'Accent and status', swatches: ACCENT },
] as const

/** Reads the real token values from CSS, so this page can never disagree with index.css. */
function readTokenValues(): Record<string, string> {
  const styles = getComputedStyle(document.documentElement)
  const values: Record<string, string> = {}
  for (const group of GROUPS) {
    for (const swatch of group.swatches) {
      values[swatch.name] = styles.getPropertyValue(`--color-${swatch.name}`).trim()
    }
  }
  return values
}

export function ColorSection() {
  const [values] = useState(readTokenValues)

  return (
    <DemoSection
      index={2}
      title="Colour"
      description="Near-black surfaces, cool-gray text and a single accent. Warn and danger exist only to communicate status."
    >
      <div className="space-y-10">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <Reveal>
              <h3 className="mb-4 text-h3">{group.title}</h3>
            </Reveal>
            <StaggerContainer as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {group.swatches.map((swatch) => (
                <StaggerItem as="li" key={swatch.name}>
                  <div
                    className={`h-20 rounded-sm border border-line-strong ${swatch.swatchClass}`}
                  />
                  <p className="mt-3 font-mono text-caption text-fg">{swatch.name}</p>
                  <p className="font-mono text-label uppercase tracking-label text-fg-subtle">
                    {values[swatch.name]}
                  </p>
                  <p className="mt-1 text-caption text-fg-muted">{swatch.role}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ))}
      </div>
    </DemoSection>
  )
}
