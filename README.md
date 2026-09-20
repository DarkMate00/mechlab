# MECHLAB

MECHLAB is an interactive Mechanical Engineering lab that runs entirely in the browser. It is a personal project that will grow to include:

- **Engineering Fundamentals**: mechanics, thermodynamics, fluid mechanics, materials
- **Interactive Lab**: engineering calculators
- **Engineering in Real Life**: how the fundamentals appear in real mechanical systems
- **Design Projects**
- **About the Project**: why Mechanical Engineering

> **Status: Phase 1, project foundation.** The site currently contains the architecture, routing, deployment setup and a minimal home page. Content, visual design, calculators and simulations come in later phases.

## Technology stack

| Purpose | Tool |
| --- | --- |
| UI | React 19 + TypeScript (strict) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Routing | React Router, **hash routing** (see below) |
| Linting | ESLint + typescript-eslint |
| Hosting | GitHub Pages, deployed by GitHub Actions |

There is no backend, database, API or runtime server. The production build is plain static files.

Not installed yet, on purpose: Motion/Framer Motion, Lucide React and Three.js. Each will be added in the phase that actually uses it.

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

## Repository structure

```
.github/workflows/deploy.yml   GitHub Pages deployment
public/                        Files copied as-is to the site root (favicon)
src/
  main.tsx                     Entry point
  App.tsx                      Router and route table
  index.css                    Tailwind import + base styles
  components/
    layout/                    Page frame: RootLayout, PageContainer, Section, SectionHeading, Footer
    navigation/                Navbar
    ui/                        Generic building blocks: Button, Card, TechnicalLabel, LoadingScreen
    engineering/               Domain cards: EngineeringCard, ProjectCard
    calculators/               CalculatorPanel (layout shell only; future calculator UIs go here)
    simulations/               SimulationContainer (layout shell only; future simulation UIs go here)
    animations/                Reserved for Phase 2 (scroll progress, custom cursor, motion helpers)
  pages/                       One component per route (lazy-loaded except the home page)
  data/                        Site content and metadata as typed data (navigation, modules, calculators, systems, projects)
  lib/
    calculations/              Pure engineering functions, no React (see its index.ts for conventions)
    utilities/                 Small general helpers
  hooks/                       Reusable React hooks
  types/                       Shared TypeScript types
  assets/                      Imported images and other assets
```

### Architecture rules

- **Calculations are separate from UI.** Formulas live in `src/lib/calculations` as pure functions returning a `CalculationResult`. Components only call them and display the result.
- **Content is data.** Titles, statuses and project entries live in `src/data`, typed by `src/types`, not inside components.
- **Top-level areas are routes; subsections are not (yet).** Routes are defined once in `src/data/navigation.ts` and reused by the router and the navbar.
- **Placeholder data is labelled.** `src/data/projects.ts` contains one entry marked `isPlaceholder: true`. Replace it with real projects and never display placeholders publicly.
