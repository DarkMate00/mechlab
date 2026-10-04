import { useReducedMotion } from 'motion/react'
import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { StatusIndicator } from '../../components/visuals/StatusIndicator'
import { DataReadout } from '../../components/visuals/DataReadout'
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { DemoSection } from './DemoSection'

/** Live readout of the settings that change how the design system behaves. */
export function EnvironmentSection() {
  const reduced = useReducedMotion() ?? false
  const finePointer = useMediaQuery(FINE_POINTER_QUERY)
  const wide = useMediaQuery('(min-width: 768px)')

  return (
    <DemoSection
      index={1}
      title="Environment"
      description="These values are read live from your browser. Change your OS motion setting or resize the window to watch them update."
    >
      <StaggerContainer className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        <StaggerItem>
          <DataReadout label="Reduced motion" value={reduced ? 'ON' : 'OFF'} />
        </StaggerItem>
        <StaggerItem>
          <DataReadout label="Pointer" value={finePointer ? 'FINE' : 'COARSE'} />
        </StaggerItem>
        <StaggerItem>
          <DataReadout label="Custom cursor" value={finePointer ? 'ACTIVE' : 'OFF'} />
        </StaggerItem>
        <StaggerItem>
          <DataReadout label="Parallax" value={wide && !reduced ? 'ON' : 'OFF'} />
        </StaggerItem>
      </StaggerContainer>
      <p className="mt-8">
        <StatusIndicator status={reduced ? 'warning' : 'online'}>
          {reduced ? 'Animation reduced' : 'Animation full'}
        </StatusIndicator>
      </p>
      {reduced ? (
        <p
          role="status"
          className="surface mt-6 max-w-reading rounded-sm p-4 text-caption text-fg-muted"
        >
          Your browser or operating system is asking for reduced motion, so animations on this page
          are intentionally simplified to short fades. To see the full animations, turn off
          &ldquo;reduce motion&rdquo; (macOS), &ldquo;show animations&rdquo; off (Windows) or the
          DevTools rendering emulation, then reload.
        </p>
      ) : null}
    </DemoSection>
  )
}
