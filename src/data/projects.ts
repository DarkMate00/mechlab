import type { Project } from '../types/content'

/**
 * PLACEHOLDER DATA: this entry exists only to exercise the data model.
 * Replace it with real projects and never render entries with `isPlaceholder: true` publicly.
 */
export const projects: readonly Project[] = [
  {
    slug: 'placeholder-project',
    title: 'Placeholder project',
    description: 'Placeholder entry used to validate the project data model. Not a real project.',
    status: 'planned',
    concepts: [],
    tools: [],
    isPlaceholder: true,
  },
]
