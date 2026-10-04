import { useEffect, useState } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { resolveCursorVariant, type CursorVariant } from '../../lib/cursor'
import { classNames } from '../../lib/utilities/classNames'

/** Ring scale per state. The ring is drawn once at 32px and only ever scaled (GPU transform). */
const RING_SCALE: Record<CursorVariant, number> = {
  default: 1,
  link: 1.35,
  button: 1.6,
  card: 1.9,
  simulation: 1.7,
  native: 1,
}

/** Ring colours per state, using design tokens. Cross-fades via a CSS transition. */
const RING_CLASSES: Record<CursorVariant, string> = {
  default: 'border-fg/45 bg-transparent',
  link: 'border-fg/80 bg-transparent',
  button: 'border-accent bg-accent/15',
  card: 'border-accent/70 bg-accent/[0.07]',
  simulation: 'border-accent/80 bg-transparent',
  native: 'border-transparent bg-transparent',
}

const RING_SPRING = { stiffness: 320, damping: 30, mass: 0.6 } as const
const STATE_SPRING = { type: 'spring', stiffness: 320, damping: 26 } as const
const PRESSED_SCALE = 0.85

/**
 * The MECHLAB cursor: a dot that tracks the pointer exactly and a thin ring that trails it
 * with a spring. The ring changes state over links, buttons, cards and simulations
 * (see lib/cursor.ts for the priority rules). Renders nothing unless the primary pointer is a fine, hover-capable one.
 */
export function CustomCursor() {
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY)
  return hasFinePointer ? <CursorLayer /> : null
}

function CursorLayer() {
  const reduced = useReducedMotion() ?? false
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Pointer position lives in motion values, so moving the mouse never re-renders React.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, RING_SPRING)
  const springY = useSpring(y, RING_SPRING)
  // Reduced motion: the ring follows the pointer directly, with no trailing.
  const ringX = reduced ? x : springX
  const ringY = reduced ? y : springY

  useEffect(() => {
    const root = document.documentElement
    let hasMoved = false
    let lastX = 0
    let lastY = 0
    let refreshFrame = 0
    const timers: number[] = []

    function handleMove(event: PointerEvent) {
      if (event.pointerType === 'touch') return
      lastX = event.clientX
      lastY = event.clientY
      x.set(lastX)
      y.set(lastY)
      if (!hasMoved) {
        hasMoved = true
        // Start the ring under the pointer instead of flying in from the corner.
        springX.jump(lastX)
        springY.jump(lastY)
        // Only now hide the native pointer, so it is never hidden without a replacement showing.
        root.dataset.customCursor = 'on'
        setVisible(true)
      }
    }
    function handleOver(event: PointerEvent) {
      if (event.pointerType !== 'touch') setVariant(resolveCursorVariant(event.target))
    }

    // pointerover only fires when the pointer moves onto a new element. When the page moves
    // under a stationary pointer (scrolling, a route change) the state is re-read from what
    // is actually under the pointer, so it can never stay stuck on an element that is gone.
    function refreshVariant() {
      refreshFrame = 0
      if (hasMoved) setVariant(resolveCursorVariant(document.elementFromPoint(lastX, lastY)))
    }
    function scheduleRefresh() {
      if (!refreshFrame) refreshFrame = requestAnimationFrame(refreshVariant)
    }
    function handleClick() {
      // After a click the page often changes (navigation, menus); re-check once it has settled.
      timers.push(window.setTimeout(scheduleRefresh, 150), window.setTimeout(scheduleRefresh, 500))
    }

    function handleDown(event: PointerEvent) {
      if (event.pointerType !== 'touch') setPressed(true)
    }
    const handleUp = () => setPressed(false)
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(hasMoved)

    document.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver, { passive: true })
    document.addEventListener('pointerdown', handleDown, { passive: true })
    document.addEventListener('pointerup', handleUp, { passive: true })
    document.addEventListener('pointercancel', handleUp, { passive: true })
    document.addEventListener('scroll', scheduleRefresh, { passive: true, capture: true })
    document.addEventListener('click', handleClick)
    root.addEventListener('mouseleave', handleLeave)
    root.addEventListener('mouseenter', handleEnter)

    return () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerdown', handleDown)
      document.removeEventListener('pointerup', handleUp)
      document.removeEventListener('pointercancel', handleUp)
      document.removeEventListener('scroll', scheduleRefresh, { capture: true })
      document.removeEventListener('click', handleClick)
      root.removeEventListener('mouseleave', handleLeave)
      root.removeEventListener('mouseenter', handleEnter)
      cancelAnimationFrame(refreshFrame)
      timers.forEach((timer) => window.clearTimeout(timer))
      delete root.dataset.customCursor
    }
  }, [x, y, springX, springY])

  const shown = visible && variant !== 'native'
  const transition = reduced ? { duration: 0 } : STATE_SPRING

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      data-variant={variant}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-0 w-0 mix-blend-difference"
    >
      <m.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <m.div
          animate={{
            scale: RING_SCALE[variant] * (pressed ? PRESSED_SCALE : 1),
            opacity: shown ? 1 : 0,
          }}
          transition={transition}
          className={classNames(
            '-ml-4 -mt-4 size-8 rounded-full border transition-[border-color,background-color] duration-200',
            RING_CLASSES[variant],
          )}
        >
          {/* Crosshair inside the ring: the "interactive simulation" state. */}
          <span
            className={classNames(
              'absolute inset-0 transition-opacity duration-200',
              variant === 'simulation' ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-accent/70" />
            <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-accent/70" />
          </span>
        </m.div>
      </m.div>

      <m.div style={{ x, y }} className="absolute left-0 top-0">
        <m.div
          animate={{
            scale: variant === 'button' || variant === 'card' ? 0.5 : 1,
            opacity: shown ? 1 : 0,
          }}
          transition={transition}
          className="-ml-[3px] -mt-[3px] size-1.5 rounded-full bg-fg"
        />
      </m.div>
    </div>
  )
}
