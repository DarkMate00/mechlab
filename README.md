# MECHLAB

MECHLAB is an interactive Mechanical Engineering lab that runs entirely in the browser. It is a personal project that will grow to include:

- **Engineering Fundamentals**: mechanics, thermodynamics, fluid mechanics, materials
- **Interactive Lab**: engineering calculators
- **Engineering in Real Life**: how the fundamentals appear in real mechanical systems
- **Design Projects**
- **About the Project**: why Mechanical Engineering

## Project status

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Project foundation: architecture, routing, GitHub Pages deployment | Complete |
| 2 | Design system, custom cursor, animation foundation | **Complete** |
| 3 | Homepage | Not started |

The routed pages (Home, Fundamentals, Interactive Lab, Real Life, Projects, About) are still minimal placeholders. Phase 2 delivered the visual and interaction foundation they will be built with. See the internal playground at `#/design-system` (below) for every piece of it in one place.

## Technology stack

| Purpose | Tool |
| --- | --- |
| UI | React 19 + TypeScript (strict) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`), tokens defined in `src/index.css` |
| Animation | Motion (`motion` package), loaded through `LazyMotion` to keep the bundle small |
| Fonts | Geist and Geist Mono, self-hosted via `@fontsource-variable` (no external font requests) |
| Routing | React Router, **hash routing** (see below) |
| Linting | ESLint + typescript-eslint |
| Hosting | GitHub Pages, deployed by GitHub Actions |

There is no backend, database, API or runtime server. The production build is plain static files.

Not installed, on purpose: Lucide React and Three.js. Each will be added in the phase that actually needs it.

## Getting started

Requires Node.js `^20.19.0` or `>=22.12.0` (`.nvmrc` pins 22).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run lint       # run ESLint
npm run typecheck  # run the TypeScript compiler without emitting files
npm run build      # type-check, then build static files into ./dist
npm run preview    # serve ./dist locally, using the same base path as GitHub Pages
```

After `npm run dev`, open <http://localhost:5173/#/design-system> to see the design-system playground.

## Deployment to GitHub Pages

Deployment is automated by `.github/workflows/deploy.yml`. On every push to `main` it installs dependencies, lints, builds, uploads `dist/` as a Pages artifact and deploys it.

One-time setup on GitHub:

1. Create a repository (the default assumed name is `mechlab`) and push this project to its `main` branch.
2. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The site appears at `https://<your-username>.github.io/<repository-name>/`.

### Repository name and base path

A project site is served from `/<repository-name>/`, so Vite needs that as its `base`. `vite.config.ts` handles this:

- **In GitHub Actions** the repository name is passed in automatically (`VITE_REPO_NAME`). Renaming the repository needs no code change.
- **Locally** it falls back to `DEFAULT_REPO_NAME` (`mechlab`) at the top of `vite.config.ts`. Change that one constant if you want local builds to match a different name.
- A repository named `<username>.github.io`, or a custom domain, is served from `/`. The first case is detected automatically; for a custom domain set `VITE_BASE_PATH=/`.

Use `import.meta.env.BASE_URL` (or import the asset) for any static asset path in code, never a hard-coded `/`.

### Why hash routing

GitHub Pages only serves real files. With normal history routing, opening or refreshing `/mechlab/lab` returns a 404 because no such file exists. With hash routing the URL is `/mechlab/#/lab`: the server always receives `/mechlab/`, serves `index.html`, and the router reads the part after `#`. Deep links and refreshes work with no server configuration.

Consequence: never use `href="#some-id"` for in-page anchors, because the router would read it as a route. Use `element.scrollIntoView()` or move focus in code instead.

## Design system (Phase 2)

Everything visual is defined once, in `src/index.css`. The default Tailwind palette and radius/shadow scales are removed on purpose, so a class like `bg-slate-900` simply does nothing: only system tokens exist.

### Colour

Near-black surfaces, cool-gray text, **one** accent. `warn` and `danger` exist only to communicate status and are always paired with a text label.

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#070809` | Page background |
| `surface` / `surface-raised` / `surface-hover` | `#0b0d10` / `#101216` / `#15181d` | Cards, panels, hover |
| `fg` / `fg-muted` / `fg-subtle` | `#eceff3` / `#9aa4b0` / `#7a838f` | Primary, secondary, metadata text |
| `line` / `line-strong` | white at 8% / 16% | Hairline borders |
| `accent` / `accent-strong` | `#52b4f0` / `#7cc8f7` | Interactive state, progress, data highlights |

Use them as normal Tailwind classes: `bg-surface`, `text-fg-muted`, `border-line`, `text-accent`.

### Typography

Geist for reading; Geist Mono for measurements, formulas, identifiers and labels.

| Class | Use |
| --- | --- |
| `text-display` | Hero headlines (fluid, 44 to 92px) |
| `text-h1` / `text-h2` / `text-h3` | Headings |
| `text-body-lg` / `text-body` / `text-caption` | Text |
| `text-label` + `font-mono uppercase tracking-label` | Technical labels |
| `text-data` + `font-mono tabular-nums` | Instrument values |

### Layout and shape

- `PageContainer` sets the max width (`max-w-content`, 72rem) and gutters. `Section` applies the vertical rhythm (`py-section`, fluid 64 to 128px).
- Radii are small on purpose: `rounded-xs` (2px) for buttons and inputs, `rounded-sm` (4px), `rounded-md` (8px) for cards.
- No shadows. Depth comes from borders and surface contrast.

### Utilities (in `index.css`)

`surface`, `surface-raised` (bordered surfaces) · `bg-technical-grid` (blueprint grid) · `mask-fade-top`, `mask-fade-center` · `corner-marks` (drawing-frame corners shown on hover/focus).

### Components

| Folder | Contents |
| --- | --- |
| `components/ui/` | `Button`, `ButtonLink` (primary, secondary, ghost; optional arrow and magnetic pull), `Card` (`interactive` prop), `TechnicalLabel`, `LoadingScreen`, `PagePlaceholder` |
| `components/visuals/` | `TechnicalGrid`, `Crosshair`, `MeasurementTick`, `Axis`, `ConnectorLine`, `CircularGauge`, `DataReadout`, `StatusIndicator`, `EngineeringBadge` |
| `components/layout/` | `RootLayout`, `PageContainer`, `Section`, `SectionHeading`, `Footer` |
| `components/navigation/` | `Navbar` (horizontal bar from 768px, disclosure menu below) |

**Interaction language.** All hover/focus effects share `INTERACTIVE_TRANSITION` and `HOVER_LIFT` from `src/lib/utilities/interaction.ts`: 200ms, one easing curve, a 2px lift at most. Only cards that lead somewhere are `interactive`. Use `magnetic` on at most one call to action per view.

## Animation system (Phase 2)

All animation lives in `src/components/animations/` and uses Motion through `LazyMotion`. Use the `m.*` components (`import * as m from 'motion/react-m'`), never `motion.*`; `strict` mode will throw if you mix them up.

| Component | Purpose |
| --- | --- |
| `Reveal` | Fade in with a 30px rise and a blur that clears when scrolled into view. Props: `delay`, `y`, `blur`, `once`, `amount`, `as`. Use `blur={0}` on very large blocks |
| `StaggerContainer` + `StaggerItem` | Children reveal one after another (80ms apart). Render as `ul`/`li` for list semantics. **Do not pass `delay` to a `StaggerItem`**: a child's own delay overrides the parent's stagger |
| `Parallax` | Depth movement for decorative layers. `distance` is extra travel in px: **positive runs ahead of the page** (near layer), **negative lags behind it** (far layer). `className` sizes the static wrapper, `innerClassName` the moving layer (fills it by default, so absolutely positioned children resolve correctly). Off below 768px and with reduced motion |
| `DrawLine` | An SVG `<path>` that draws itself (1.6s) once it is in the trigger area. Use increasing `delay`s to draw a diagram in sequence |
| `CountUp` | Animates a number to a target. Configurable `from`, `to`, `duration`, `decimals`, `trigger` (`inView` or `mount`). Screen readers get the final value once |
| `ScrollProgress` | 2px accent line showing scroll position. Hidden on pages that cannot scroll |
| `PageTransition` | Fade and 16px rise (450ms) on route change. Enter-only, so navigation never waits |
| `Magnetic` | Nudges a child a few px toward the pointer |
| `MotionProvider` | `LazyMotion` + `MotionConfig reducedMotion="user"`, mounted once in `App.tsx` |

**When scroll animations start.** `Reveal`, `StaggerContainer` and `DrawLine` share one trigger (`useRevealState`): the trigger area is the viewport minus the bottom 12% (`REVEAL.margin`), so animations start where people are looking, not at the very edge of the screen. Anything already on screen when it mounts (including inside that bottom band) reveals immediately, so content on a page that cannot scroll is never left hidden.

**Applying them.** Wrap the small units, not whole page regions: a heading block, each card, each list item. Reveal transforms live on a wrapper, so they never fight a child's own hover transform (see `CardsSection`). Routed pages use `StaggerContainer` for their entrance (see `PagePlaceholder`).

Timing tokens are in `src/lib/motion.ts` (JavaScript) and `index.css` (`--ease-precise`). Keep the two in sync.

## Custom cursor (Phase 2)

`CustomCursor` (mounted in `RootLayout`) draws a dot that tracks the pointer exactly and a thin ring that trails it on a spring. Position lives in Motion values, so moving the mouse never re-renders React, and only `transform` and `opacity` animate.

**States.** Elements opt in with `data-cursor="link | button | card | simulation"`; links and buttons are detected automatically. Priority, first match wins:

1. Text fields (`input`, `textarea`, `select`, editable content): the custom cursor hides and the native caret is used.
2. Disabled controls: default.
3. The nearest `data-cursor` ancestor. So an interactive `Card` (`data-cursor="card"`) wins over a stretched link inside it, and a `ButtonLink` inside a card wins over the card.
4. Links, then buttons, then default.

The state is re-read from what is actually under the pointer after scrolling and after clicks, so it cannot stay stuck when the page moves under a stationary pointer.

**When it is active.** Only for a fine, hover-capable pointer (`(pointer: fine) and (hover: hover)`) and not in forced-colors mode. On touch devices and in Windows High Contrast nothing is rendered and the native pointer is untouched. The native pointer is hidden (`html[data-custom-cursor]`) only after the first real mouse movement, so it is never hidden without a replacement showing.

## Reduced motion (Phase 2)

Honoured through `prefers-reduced-motion: reduce`, in CSS and in JavaScript. The playground's first section shows the live setting and, when it is on, explains why animations look simplified. (If animations seem missing, check that readout first: Windows "Show animations", macOS "Reduce motion" and remote-desktop sessions all switch it on.)

| Feature | Reduced-motion behaviour |
| --- | --- |
| Reveal, Stagger | Plain quick fade: no rise, no blur; stagger shrinks to 30ms |
| Page transition | Fade only, no offset |
| Parallax | Off |
| DrawLine, CircularGauge arc, CountUp | Shown complete immediately |
| Scroll progress | Follows the scroll position directly, no spring smoothing |
| Cursor | Ring follows the pointer with no trailing; state changes are instant |
| Magnetic button | Off |
| Grid drift, status pulse, all CSS transitions | Off (global rule in `index.css`) |

## Design-system playground

`src/pages/DesignSystemPage.tsx` (with sections in `src/pages/design-system/`) is a temporary internal page, routed at `#/design-system`. It shows the colour tokens, type scale, buttons, cards, labels, cursor targets, reveal, stagger, parallax (far and near layers against a static grid), count-up, grid, primitives and a line-draw schematic, plus a live readout of reduced-motion and pointer settings. Every section animates as you scroll it.

- It is **not** in the navigation (`INTERNAL_ROUTES` in `src/data/navigation.ts`, not `SECTIONS`).
- It is still reachable by URL in production builds. Remove the route in `App.tsx` (or gate it behind `import.meta.env.DEV`) before the final launch if you do not want it public.
- Values shown as numbers on it are labelled sample inputs, not measurements.

## Repository structure

```
.github/workflows/deploy.yml   GitHub Pages deployment
public/                        Files copied as-is to the site root (favicon)
src/
  main.tsx                     Entry point (font imports)
  App.tsx                      MotionProvider, router and route table
  index.css                    Design tokens, base styles, utilities
  components/
    layout/                    RootLayout, PageContainer, Section, SectionHeading, Footer
    navigation/                Navbar
    ui/                        Button, ButtonLink, Card, TechnicalLabel, LoadingScreen, PagePlaceholder
    visuals/                   Engineering visual primitives (grid, gauge, axis, badges, readouts)
    animations/                Reveal, Stagger, Parallax, DrawLine, CountUp, ScrollProgress, PageTransition, CustomCursor, Magnetic, MotionProvider
    engineering/               EngineeringCard, ProjectCard
    calculators/               CalculatorPanel (layout shell only)
    simulations/               SimulationContainer (layout shell only)
  pages/                       One component per route (lazy-loaded except the home page)
    design-system/             Sections of the internal playground
  data/                        Site content and metadata as typed data
  lib/
    calculations/              Pure engineering functions, no React (see its index.ts for conventions)
    utilities/                 classNames, interaction constants
    motion.ts                  Reveal variants and timing tokens
    cursor.ts                  Cursor state resolver
  hooks/                       useMediaQuery, useRevealState, useDocumentTitle, useNavigationReset
  types/                       Shared TypeScript types
  assets/                      Imported images and other assets
```

### Architecture rules

- **Calculations are separate from UI.** Formulas live in `src/lib/calculations` as pure functions returning a `CalculationResult`. Components only call them and display the result.
- **Content is data.** Titles, statuses and project entries live in `src/data`, typed by `src/types`, not inside components.
- **Top-level areas are routes; subsections are not (yet).** Routes are defined once in `src/data/navigation.ts` and reused by the router and the navbar.
- **Placeholder data is labelled.** `src/data/projects.ts` contains one entry marked `isPlaceholder: true`. Replace it with real projects and never display placeholders publicly.
- **Use the system.** New UI uses design tokens, the shared components and the animation utilities above rather than one-off colours, transitions or animation code.
