/** How far along a piece of content is. Used across modules, calculators, systems and projects. */
export type ContentStatus = 'planned' | 'in-progress' | 'published'

export type ModuleSlug = 'mechanics' | 'thermodynamics' | 'fluid-mechanics' | 'materials'

export interface EngineeringConcept {
  slug: string
  title: string
  summary: string
}

/** A subject area in the Engineering Fundamentals section. */
export interface EngineeringModule {
  slug: ModuleSlug
  title: string
  status: ContentStatus
  concepts: readonly EngineeringConcept[]
}

/** Metadata about an interactive calculator. The calculation itself lives in `src/lib/calculations`. */
export interface CalculatorMeta {
  slug: string
  title: string
  status: ContentStatus
  module: ModuleSlug
}

/** A mechanical system explained in the "Engineering in Real Life" section. */
export interface RealLifeSystem {
  slug: string
  title: string
  status: ContentStatus
  modules: readonly ModuleSlug[]
}

export interface Project {
  slug: string
  title: string
  description: string
  status: ContentStatus
  /** Engineering concepts the project applies. */
  concepts: readonly string[]
  /** Software, hardware or manufacturing tools used. */
  tools: readonly string[]
  /** Optional path/URL of a cover image. */
  image?: string
  /** True for entries that exist only to exercise the data model. Never show these publicly. */
  isPlaceholder?: boolean
}
