import { useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useRevealState } from '../../hooks/useRevealState'
import { EASE_PRECISE } from '../../lib/motion'
import { CountUp } from '../animations/CountUp'

interface CircularGaugeProps {
  value: number
  min?: number
  max?: number
  label: string
  unit?: string
  decimals?: number
  /** Width and height in px. */
  size?: number
}

const CENTER = 50
const RADIUS = 40
/** The dial spans 270 degrees, opening at the bottom. */
const START_ANGLE = 135
const SWEEP = 270
const TICK_COUNT = 28

function pointAt(angleDegrees: number, radius: number) {
  const radians = (angleDegrees * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(radians), y: CENTER + radius * Math.sin(radians) }
}

const start = pointAt(START_ANGLE, RADIUS)
const end = pointAt(START_ANGLE + SWEEP, RADIUS)
const ARC_PATH = `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 1 1 ${end.x} ${end.y}`

const TICKS = Array.from({ length: TICK_COUNT }, (_, index) => {
  const angle = START_ANGLE + (SWEEP * index) / (TICK_COUNT - 1)
  const isMajor = index % 9 === 0 || index === TICK_COUNT - 1
  const outer = pointAt(angle, RADIUS + 5)
  const inner = pointAt(angle, RADIUS + (isMajor ? 0 : 2.5))
  return { key: index, path: `M ${outer.x} ${outer.y} L ${inner.x} ${inner.y}` }
})

/** A 270-degree dial gauge. The arc draws on scroll-in and the centre value counts up with it. */
export function CircularGauge({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  decimals = 0,
  size = 176,
}: CircularGaugeProps) {
  const arcRef = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion() ?? false
  const state = useRevealState(arcRef, { amount: 0.5 })
  const fraction = Math.min(Math.max((value - min) / (max - min), 0), 1)

  return (
    <figure className="inline-flex flex-col items-center gap-3" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full" fill="none">
          <g stroke="currentColor" strokeWidth="0.6" className="text-fg-subtle">
            {TICKS.map((tick) => (
              <path key={tick.key} d={tick.path} />
            ))}
          </g>
          <path d={ARC_PATH} stroke="currentColor" strokeWidth="1.5" className="text-line-strong" />
          <m.path
            ref={arcRef}
            d={ARC_PATH}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
            initial={{ pathLength: reduced ? fraction : 0 }}
            animate={{ pathLength: reduced || state === 'visible' ? fraction : 0 }}
            transition={{ duration: reduced ? 0 : 1.4, ease: EASE_PRECISE }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
          <span className="text-data tabular-nums text-fg">
            <CountUp to={value} from={min} decimals={decimals} duration={1.4} />
          </span>
          {unit ? <span className="text-caption text-fg-muted">{unit}</span> : null}
        </div>
      </div>
      <figcaption className="font-mono text-label uppercase tracking-label text-fg-subtle">
        {label}
      </figcaption>
    </figure>
  )
}
