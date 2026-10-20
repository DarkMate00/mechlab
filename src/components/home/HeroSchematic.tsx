import { useRef, type PointerEvent } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { DrawLine } from '../animations/DrawLine'
import { Parallax } from '../animations/Parallax'
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'

const SIZE = 520
const CENTER = SIZE / 2
const HEX_RADIUS = 54
const ORBIT_RADIUS = 190
const OUTER_RING_RADIUS = ORBIT_RADIUS + 66
const NODE_RADIUS = 5
/** Gap, in viewBox units, left between a connecting line and the shape at each of its ends. */
const LINE_GAP = 10
const MAX_TILT_DEG = 6
const CORNER_INSET = 16
const CORNER_ARM = 16

interface SchematicNode {
  id: string
  label: string
  /** Degrees, 0 = right, 90 = down (SVG coordinates). */
  angle: number
}

/** The four satellites around the central "system" node. */
const NODES: readonly SchematicNode[] = [
  { id: 'force', label: 'FORCE', angle: 315 },
  { id: 'motion', label: 'MOTION', angle: 45 },
  { id: 'energy', label: 'ENERGY', angle: 225 },
  { id: 'design', label: 'DESIGN', angle: 135 },
]

function pointAt(angleDeg: number, radius: number) {
  const radians = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(radians), y: CENTER + radius * Math.sin(radians) }
}

const HEX_POINTS = Array.from({ length: 6 }, (_, i) => pointAt(-90 + i * 60, HEX_RADIUS))
  .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
  .join(' ')

/** Each node's position, its label position, and its connecting line, trimmed so the line floats between the central hexagon and the node's own ring rather than overlapping either. */
const NODE_GEOMETRY = NODES.map((node, index) => {
  const point = pointAt(node.angle, ORBIT_RADIUS)
  const dx = point.x - CENTER
  const dy = point.y - CENTER
  const length = Math.hypot(dx, dy)
  const ux = dx / length
  const uy = dy / length
  const lineStart = {
    x: CENTER + ux * (HEX_RADIUS + LINE_GAP),
    y: CENTER + uy * (HEX_RADIUS + LINE_GAP),
  }
  const lineEnd = {
    x: point.x - ux * (NODE_RADIUS + LINE_GAP),
    y: point.y - uy * (NODE_RADIUS + LINE_GAP),
  }
  const labelPoint = pointAt(node.angle, ORBIT_RADIUS + 26)
  return {
    ...node,
    point,
    labelPoint,
    path: `M ${lineStart.x.toFixed(1)} ${lineStart.y.toFixed(1)} L ${lineEnd.x.toFixed(1)} ${lineEnd.y.toFixed(1)}`,
    delay: 0.3 + index * 0.15,
  }
})

/** Drawing-frame corner marks: an L at each corner of the schematic, apex inward. */
const CORNERS = [
  { x: CORNER_INSET, y: CORNER_INSET, dx: 1, dy: 1 },
  { x: SIZE - CORNER_INSET, y: CORNER_INSET, dx: -1, dy: 1 },
  { x: CORNER_INSET, y: SIZE - CORNER_INSET, dx: 1, dy: -1 },
  { x: SIZE - CORNER_INSET, y: SIZE - CORNER_INSET, dx: -1, dy: -1 },
].map(({ x, y, dx, dy }) => `M ${x + dx * CORNER_ARM} ${y} L ${x} ${y} L ${x} ${y + dy * CORNER_ARM}`)

/**
 * The hero's engineering schematic: a central "system" node connected to four satellites
 * (force, motion, energy, design) on a faint orbit, inside a static drawing-frame. The
 * connecting lines draw themselves in on mount (see DrawLine); the whole group tilts very
 * slightly toward the pointer on a fine-pointer device, and the outer ring drifts with
 * scroll for a little extra depth. Purely decorative — the heading and supporting paragraph
 * already carry the real content, so this is hidden from assistive technology.
 */
export function HeroSchematic() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY)
  const tiltEnabled = hasFinePointer && !reduced

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20, mass: 0.5 })
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20, mass: 0.5 })

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!tiltEnabled || event.pointerType === 'touch' || !wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(relativeX * MAX_TILT_DEG * 2)
    rotateX.set(relativeY * -MAX_TILT_DEG * 2)
  }

  function resetTilt() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={wrapperRef}
      // Switches the custom cursor to its crosshair "simulation" state while hovering.
      data-cursor="simulation"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative mx-auto w-full max-w-md [perspective:900px] lg:max-w-none"
    >
      <m.div
        aria-hidden="true"
        style={{ rotateX: springX, rotateY: springY }}
        className="surface relative aspect-square overflow-hidden rounded-md"
      >
        {/* Far layer: a larger reference ring that drifts slightly with scroll, bleeding past the frame. */}
        <Parallax
          distance={-22}
          className="absolute inset-0"
          innerClassName="grid size-full place-items-center"
        >
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="size-[140%] text-line-strong"
            fill="none"
          >
            <circle cx={CENTER} cy={CENTER} r={OUTER_RING_RADIUS} stroke="currentColor" strokeWidth={1} opacity={0.5} />
          </svg>
        </Parallax>

        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" fill="none">
          {/* Faint orbit the satellite nodes sit on. */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="2 7"
            className="text-line-strong"
          />

          {CORNERS.map((d) => (
            <path key={d} d={d} stroke="currentColor" strokeWidth={1} className="text-line-strong" />
          ))}

          {NODE_GEOMETRY.map((node) => (
            <DrawLine
              key={node.id}
              d={node.path}
              delay={node.delay}
              duration={0.9}
              className="text-accent/70"
            />
          ))}

          {NODE_GEOMETRY.map((node) => (
            <g key={node.id}>
              <circle cx={node.point.x} cy={node.point.y} r={NODE_RADIUS} fill="currentColor" className="text-accent" />
              <circle
                cx={node.point.x}
                cy={node.point.y}
                r={NODE_RADIUS + 6}
                stroke="currentColor"
                strokeWidth={1}
                className="text-accent/40"
              />
              <text
                x={node.labelPoint.x}
                y={node.labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                className="text-fg-subtle"
                fontFamily="var(--font-mono)"
                fontSize={13}
                letterSpacing="1.5"
              >
                {node.label}
              </text>
            </g>
          ))}

          <polygon points={HEX_POINTS} stroke="currentColor" strokeWidth={1.5} className="text-accent" />
          <circle cx={CENTER} cy={CENTER} r={3} fill="currentColor" className="text-accent" />
          <text
            x={CENTER}
            y={CENTER + HEX_RADIUS + 22}
            textAnchor="middle"
            fill="currentColor"
            className="text-fg"
            fontFamily="var(--font-mono)"
            fontSize={14}
            letterSpacing="2"
          >
            SYSTEM
          </text>
        </svg>
      </m.div>
    </div>
  )
}
