import { StaggerContainer, StaggerItem } from '../../components/animations/Stagger'
import { EngineeringBadge } from '../../components/visuals/EngineeringBadge'
import { DataReadout } from '../../components/visuals/DataReadout'
import { StatusIndicator, type Status } from '../../components/visuals/StatusIndicator'
import { TechnicalLabel } from '../../components/ui/TechnicalLabel'
import { DemoSection } from './DemoSection'

const STATUSES: readonly { status: Status; text: string }[] = [
  { status: 'online', text: 'Online' },
  { status: 'ready', text: 'Ready' },
  { status: 'idle', text: 'Idle' },
  { status: 'warning', text: 'Warning' },
  { status: 'error', text: 'Error' },
]

export function LabelsSection() {
  return (
    <DemoSection
      index={6}
      title="Technical labels and readouts"
      description="Monospaced capitals for identifiers and metadata. Status colour is always paired with a text label."
    >
      <StaggerContainer className="space-y-10">
        <StaggerItem className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <TechnicalLabel>MODULE / 01</TechnicalLabel>
          <TechnicalLabel tone="accent" marker>
            ENGINEERING FUNDAMENTALS
          </TechnicalLabel>
          <TechnicalLabel marker>INTERACTIVE LAB</TechnicalLabel>
        </StaggerItem>

        <StaggerItem className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <DataReadout
            label="System status"
            value={<StatusIndicator status="online">Online</StatusIndicator>}
          />
          <DataReadout
            label="Simulation"
            value={<StatusIndicator status="ready">Ready</StatusIndicator>}
          />
          <DataReadout
            label="Model"
            value={<EngineeringBadge tone="accent">Educational</EngineeringBadge>}
          />
          <DataReadout
            label="Calculation"
            value={<StatusIndicator status="online">Live</StatusIndicator>}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {STATUSES.map((item) => (
            <StatusIndicator key={item.status} status={item.status}>
              {item.text}
            </StatusIndicator>
          ))}
        </StaggerItem>

        <StaggerItem className="flex flex-wrap items-center gap-3">
          <EngineeringBadge>SI units</EngineeringBadge>
          <EngineeringBadge tone="accent">Educational model</EngineeringBadge>
        </StaggerItem>
      </StaggerContainer>
    </DemoSection>
  )
}
